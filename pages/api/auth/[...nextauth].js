import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import qs from "qs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials, req) {
        const signinConfig = {
          method: "post",
          url: `${process.env.KMUTT_AUTH_ENDPOINT}${credentials.username}`,
          headers: {
            "ldap-staff-key": process.env.KMUTT_LDAP_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${process.env.KMUTT_AUTH_TOKEN}`,
          },
          data: qs.stringify({
            password: credentials.password,
          }),
          timeout: 1000 * 5,
        };

        const _signinResponse = await axios(signinConfig);
        const signinResponse = JSON.stringify(_signinResponse.data);
        if (signinResponse && signinResponse.operation) {
          //TODO: get user data from devbakendAPI
          return {
            user: {
              id: signinResponse.id,
              username: signinResponse.username,
              role: signinResponse.role,
            },
          };
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

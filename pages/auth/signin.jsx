import { getCsrfToken } from "next-auth/react";

const SignIn = ({ csrfToken }) => {
  return (
    <center>
      <form
        style={{ paddingTop: "50px" }}
        method="post"
        action="/api/auth/callback/credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username :
          <input name="username" type="text" />
        </label>
        <br />
        <label>
          Password :
          <input name="password" type="password" />
        </label>
        <br />
        <label>
          Role :
          <select name="role" id="role">
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
        </label>
        <br />
        <button type="submit">Sign in</button>
      </form>
    </center>
  );
};
export default SignIn;

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

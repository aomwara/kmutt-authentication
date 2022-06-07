import { getSession } from "next-auth/react";
const endpoint = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    return res.send({ content: "You are logged in" });
  } else {
    return res.send({ error: "You are not logged in" });
  }
};

export default endpoint;

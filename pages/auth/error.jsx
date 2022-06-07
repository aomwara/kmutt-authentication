import { useRouter } from "next/router";
import Link from "next/link";
const Error = () => {
  const router = useRouter();
  const { error } = router.query;
  return (
    <>
      <center>
        <h1>! Error</h1>
        <p>{error}</p>
        <Link href="/">Back to sign-in</Link>
      </center>
    </>
  );
};
export default Error;

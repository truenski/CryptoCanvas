import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Connect from "../components/Connection";

function Login() {
  return <Connect />;
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies["@benft:auth.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

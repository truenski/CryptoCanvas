import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Dashboard } from "../components/adminDashboard/Dashboard";

function dashboard() {
  return <Dashboard />;
}

export default dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (!cookies["@benft:auth.token"]) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

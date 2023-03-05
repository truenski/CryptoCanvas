import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { DashboardEdit } from "../components/UploadDashboard/Upload";

function dashboardEdit() {
  return <DashboardEdit />;
}

export default dashboardEdit;

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

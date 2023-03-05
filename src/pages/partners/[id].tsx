import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import EditPartner from "@/components/Partners/Edit";

function edit() {
  return <EditPartner />;
}

export default edit;

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

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import CreatePartners from "@/components/Partners/Create";


function create() {
  return <CreatePartners />;
}

export default create;

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

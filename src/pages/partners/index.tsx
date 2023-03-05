import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import ListPartners from "@/components/Partners/List";

function list() {
  return <ListPartners />;
}

export default list;

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

import { EditProfile } from "@/components/EditProfile";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

function edit() {
  return <EditProfile />;
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

import { useRouter } from "next/router";

import ColectionDetail from "@/components/ColectionDetail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function explore() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Header />
      {id && <ColectionDetail id={String(id)} />}
      <Footer />
    </div>
  );
}

export default explore;

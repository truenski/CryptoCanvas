import { SEO } from "@/components";
import Colections from "@/components/Colections";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Roadmap from "@/components/Roadmap";
// import Team from "@/components/Team";

export default function Home() {
  return (
    <>
      <SEO title="Home" />
      <Header />
      <Main />
      <Colections />
      <Roadmap />
      {/* <Team /> */}
      <Discover />
      <Footer />
    </>
  );
}

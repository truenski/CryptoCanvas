import About from "@/components/About";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ParnersList from "@/components/About/Partners";
import Team from "@/components/Team";

function about() {
  return (
    <div>
      <Header />
      <About />
      {/* <Discover /> */}
      <Team />
      <ParnersList />
      <Footer />
    </div>
  );
}

export default about;

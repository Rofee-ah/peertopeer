import CampusPicks from "@/component/CampusPicks";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import HeroSection from "@/component/HeroSection";
import ScrollIndicator from "@/component/ScrollIndicator";
import Trade from "@/component/Trade";


export default function Home() {
  return (
   <>
  <Header/>
  <HeroSection/>
  <ScrollIndicator/>
  <CampusPicks/>
  <Trade/>
  <Footer/>

  
   </>
  );
}

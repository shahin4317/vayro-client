import EditorialIntro from "@/components/EditorialIntro";
import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <div>
     <Navbar></Navbar>
     <HeroSlider></HeroSlider>
     <EditorialIntro></EditorialIntro>
    </div>
  );
}

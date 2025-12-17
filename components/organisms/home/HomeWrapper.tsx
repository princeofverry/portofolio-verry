import HomeAward from "./HomeAward";
import HomeExperience from "./HomeExperience";
import HomeLandingpage from "./HomeLandingpage";
import HomeMarquee from "./HomeMarquee";
import HomeProject from "./HomeProject";
import HomePublication from "./HomePublication";
import HomeYolo from "./HomeYolo";

export default function HomeWrapper() {
  return (
    <>
      <section className="overflow-hidden bg-black">
        <HomeLandingpage />
        <HomeMarquee />
        <HomeExperience />
        <HomePublication />
        <HomeAward />
        <HomeProject />
        <HomeYolo />
      </section>
    </>
  );
}

import HomeAward from "./HomeAward";
import HomeContact from "./HomeContact";
import HomeExperience from "./HomeExperience";
import HomeLandingpage from "./HomeLandingpage";
import HomeMarquee from "./HomeMarquee";
import HomeProject from "./HomeProject";
import HomePublication from "./HomePublication";
// import HomeStatistics from "./HomeStatistics";
// import HomeYolo from "./HomeYolo";

export default function HomeWrapper() {
  return (
    <>
      <section className="overflow-hidden bg-black">
        <HomeLandingpage />
        <HomeMarquee />
        {/* <HomeStatistics /> */}
        <HomeExperience />
        <HomePublication />
        <HomeAward />
        <HomeProject />
        {/* <HomeYolo /> */}
        <HomeContact />
      </section>
    </>
  );
}

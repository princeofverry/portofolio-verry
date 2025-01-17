import HomeAward from "./HomeAward";
import HomeExperience from "./HomeExperience";
import HomeLandingpage from "./HomeLandingpage";
import HomeMarquee from "./HomeMarquee";
import HomeProject from "./HomeProject";

export default function HomeWrapper() {
  return (
    <>
      <section className="overflow-hidden bg-black">
        <HomeLandingpage />
        <HomeMarquee />
        <HomeAward />
        <HomeExperience />
        <HomeProject />
      </section>
    </>
  );
}

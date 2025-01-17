export default function HomeAward() {
  return (
    <>
      <section className="text-white pad-x pt-24">
        <div className="space-y-4">
          <h1 className="font-semibold text-2xl">Awards</h1>
          <p className="pb-4 text-justify">
            Awards represent significant milestones in my career that I take
            pride in. These achievements highlight my dedication, skills, and
            the impact I have made in various projects over time. Each award
            showcases my commitment to excellence and my continuous growth in my
            professional journey, serving as a testament to the hard work and
            passion I bring to my field.
          </p>
        </div>
        <ul className="space-y-4">
          <li className="flex justify-between text-sm">
            <h1>
              3rd UI/UX Competition: Developed Nourish+, a health app tackling
              maternal and child mortality and stunting.
            </h1>
            <p>2023</p>
          </li>
          <hr />
          <li className="flex justify-between text-sm">
            <h1>Top 5 Web Design Techomfest with Sinau Web App</h1>
            <p>2024</p>
          </li>
          <hr />
          <li className="flex justify-between text-sm">
            <h1>
              Top 16 Indonesian Ship Contest (KKI), where I developed a
              comprehensive monitoring system for the ship and created a
              specialized dataset to support our mission goals.{" "}
            </h1>
            <p>2024</p>
          </li>
          <hr />
        </ul>
      </section>
    </>
  );
}

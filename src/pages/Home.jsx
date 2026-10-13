import Hero from "../components/Hero.jsx";
import OurStory from "../components/OurStory.jsx";
import PopularFood from "../components/Popularfood.jsx";
import PopularPicks from "../components/Popularpicks.jsx";
import Testimonials from "../components/Testimonials.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import BookingCta from "../components/BookingCta.jsx";

const pageCss = `
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap");

.home-page {
  font-family: "Roboto", sans-serif;
  color: #0b1320;
}

.home-page h1,
.home-page h2,
.home-page h3,
.home-page .section-title,
.home-page .cta h2 {
  font-family: "Poppins", sans-serif;
  letter-spacing: -0.2px;
}

.home-page h3 {
  font-weight: 600;
}

.home-page p,
.home-page .section-sub,
.home-page .feature p,
.home-page .cta p {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

.home-page .btn,
.home-page .btn-outline-dark {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.home-page .section-sub {
  font-size: 16px;
}

.home-page .feature h3 {
  font-size: 20px;
}
`;

export default function Home() {
  return (
    <div className="home-page">
      <style>{pageCss}</style>

      <Hero />
      <PopularFood />
      <PopularPicks />
      <OurStory />
      <WhyChooseUs />
      <Testimonials />
      <BookingCta />
    </div>
  );
}
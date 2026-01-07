import AboutBanner from "../components/AboutBanner";
import Navigation from "../components/Navigation";
import OurPartners from "../components/AboutPartners";
import CompanyOverview from "../components/CompanyOverview";
import FeaturedBarTitle from "../components/FeaturedBarTitle";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
const About = () => {
  return (
    <>
      <Navigation />
      <AboutBanner />
      <OurPartners />
      <CompanyOverview />
      <FeaturedBarTitle title="Top Testimonials" alignment="left" />
      <Testimonials />
      <Footer />
    </>
  );
};

export default About;

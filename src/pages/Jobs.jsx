import Navigation from "../components/Navigation";
import FeaturedBarTitle from "../components/FeaturedBarTitle";
import JobOpportunities from "../components/TopJobOpportunities";
import Footer from "../components/Footer";
import Perks from "../components/Perks";
import Banner from "../components/JobsBanner";
import JoinUs from "../components/JoinUs";
const Jobs = () => {
  return (
    <>
      <Navigation />
      <Banner />
      <JoinUs />
      <Perks />
      <FeaturedBarTitle title="Our all open positions " alignment="right" />
      <JobOpportunities />
      <Footer />
    </>
  );
};

export default Jobs;

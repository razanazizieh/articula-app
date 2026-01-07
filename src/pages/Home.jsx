import Navigation from "../components/Navigation";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import JobOpportunities from "../components/JobOpportunities";
import FeaturedBarTitle from "../components/FeaturedBarTitle";
import OurPartners from "../components/OurPartners";
import ArticleCategories from "../components/ArticleCategories";
import LatestArticles from "../components/LatestArticles";
import TopWriters from "../components/TopWriters";
const Home = () => {
  return (
    <>
      <Navigation />
      <Banner />
      <ArticleCategories />
      <FeaturedBarTitle title="Latest Articles" alignment="left" />
      <LatestArticles />
      <TopWriters />
      <FeaturedBarTitle title="Our Job Opportunities" alignment="right" />
      <JobOpportunities />
      <OurPartners />
      <Footer />
    </>
  );
};

export default Home;

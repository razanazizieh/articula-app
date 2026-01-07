import "./css/FeaturedBarTitle.css";

const FeaturedBarTitle = ({ title, alignment = "right" }) => {
  return (
    <div className={`featured-bar-title-col align-${alignment}`}>
      <div className="featured-bar-title-box">
        <h2 className="featured-bar-title-text text-white mb-0">{title}</h2>
      </div>
    </div>
  );
};

export default FeaturedBarTitle;

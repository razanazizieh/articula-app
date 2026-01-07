import "./css/Branches.css";

const BranchCard = ({ city, description, image, id }) => {
  return (
    <div className="branch-card d-flex">
       <img src={image} alt={city} className="branch-image" /> 
      <div className="city-name px-3">{city}</div> 
      <div className="branch-info">
        <p className="address-details px-3">{description}</p>
      </div>
      <div className="branch-info-overlay"></div>
    </div>
  );
};

export default BranchCard;

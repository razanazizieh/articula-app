import Card from "react-bootstrap/Card";
import "./css/TopWriters.css";

const Star = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6548 28.3119L27.1413 33.055C28.0982 33.6613 29.2864 32.7596 29.0024 31.6425L26.8394 23.1337C26.7785 22.8967 26.7857 22.6474 26.8602 22.4143C26.9347 22.1812 27.0735 21.9739 27.2606 21.8162L33.974 16.2285C34.8561 15.4943 34.4008 14.0303 33.2675 13.9568L24.5002 13.3878C24.2641 13.3709 24.0376 13.2873 23.8471 13.1467C23.6566 13.0061 23.51 12.8143 23.4244 12.5936L20.1545 4.35928C20.0656 4.12502 19.9076 3.92335 19.7014 3.78103C19.4952 3.63872 19.2506 3.5625 19 3.5625C18.7495 3.5625 18.5048 3.63872 18.2986 3.78103C18.0924 3.92335 17.9344 4.12502 17.8455 4.35928L14.5757 12.5936C14.49 12.8143 14.3434 13.0061 14.1529 13.1467C13.9624 13.2873 13.7359 13.3709 13.4998 13.3878L4.73249 13.9568C3.59916 14.0303 3.14386 15.4943 4.02598 16.2285L10.7394 21.8162C10.9265 21.9739 11.0653 22.1812 11.1398 22.4143C11.2143 22.6474 11.2215 22.8967 11.1606 23.1337L9.15465 31.0247C8.81389 32.3652 10.2397 33.4472 11.388 32.7197L18.3452 28.3119C18.5409 28.1873 18.7681 28.1211 19 28.1211C19.232 28.1211 19.4591 28.1873 19.6548 28.3119Z"
        fill="#FD8E1F"
      />
    </svg>
  );
};
const Feather = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48.4364 49.5828C48.4364 49.5828 27.6382 37.4343 15.4384 15.1475"
        stroke="#8C866D"
        strokeWidth="1.64583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.6462 45.6456C20.2264 51.0262 18.5044 33.7129 18.5044 33.7129"
        stroke="#8C866D"
        strokeWidth="1.64583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.3642 33.944C32.7891 26.545 35.5401 22.9622 35.5401 22.9622C44.6261 32.8905 43.3917 42.988 42.6462 45.6468M29.7499 39.0225C24.6249 37.7734 19.903 35.2385 16.0299 31.6573C7.72791 24.0273 7.73374 12.8973 7.56457 8.43833C7.55501 8.1445 7.61175 7.85228 7.73058 7.58338C7.84941 7.31447 8.02728 7.07578 8.25099 6.88503C8.47469 6.69427 8.73849 6.55635 9.02279 6.4815C9.30709 6.40665 9.60461 6.3968 9.89324 6.45267C27.3641 9.899 33.2849 27.8785 33.2849 27.8785"
        stroke="#8C866D"
        strokeWidth="1.64583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const WriterCard = ({ writer }) => {
  if (!writer) return null;
  return (
    <Card className="writer-custom-card">
      <Card.Img
        variant="top"
        src={writer.avatar}
        alt={`Avatar of ${writer.name}`}
        className="card-img-top-writer mb-3"
      />
      <Card.Body className="p-0">
        <div className="writer-name-overlay p-2 ">
          <span className="writer-name-text">
            <Feather />
            {writer.name}
          </span>
        </div>
        <Card.Text className="card-title-text px-3">
          {writer.title}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className="d-flex justify-content-between align-items-center writer-custom-cardfooter
        py-3 px-3"
      >
        <div className="rate-info d-flex align-items-center">
          <span className="star-icon">
            <Star />
          </span>
          <small className="text-rate ms-2">{writer.rate}</small>
        </div>

        <div className="articles-info  d-flex align-items-center">
          <small className="text-rate">
            {writer.articlesCount}
            <span className="text-Articles ms-2">Articles</span>
          </small>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default WriterCard;

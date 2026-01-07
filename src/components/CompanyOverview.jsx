import { Col, Container, Row } from "react-bootstrap";
import img1 from "/im1.jpg";
import img2 from "/im2.jpg";
import img3 from "/im3.jpg";
import img4 from "/im4.jpg";
import "./css/CompanyOverview.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NoteBook = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M12.5 33.75H7.5C7.16848 33.75 6.85054 33.6183 6.61612 33.3839C6.3817 33.1495 6.25 32.8315 6.25 32.5V7.5C6.25 7.16848 6.3817 6.85054 6.61612 6.61612C6.85054 6.3817 7.16848 6.25 7.5 6.25H12.5V33.75Z"
        fill="#564FFD"
      />
      <path
        d="M17.5 17.5H27.5"
        stroke="#564FFD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 22.5H27.5"
        stroke="#564FFD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.5 6.25H7.5C6.80964 6.25 6.25 6.80964 6.25 7.5V32.5C6.25 33.1904 6.80964 33.75 7.5 33.75H32.5C33.1904 33.75 33.75 33.1904 33.75 32.5V7.5C33.75 6.80964 33.1904 6.25 32.5 6.25Z"
        stroke="#564FFD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 6.25V33.75"
        stroke="#564FFD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const CircleWavyCheck = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M8.50951 31.4905C7.07139 30.0524 8.02524 27.0331 7.29325 25.2639C6.53443 23.43 3.75 21.9539 3.75 19.9999C3.75 18.046 6.53445 16.57 7.29325 14.7361C8.02525 12.9669 7.07139 9.94764 8.50951 8.50951C9.94764 7.07139 12.9669 8.02524 14.7361 7.29325C16.5701 6.53443 18.0461 3.75 20.0001 3.75C21.954 3.75 23.43 6.53445 25.2639 7.29325C27.0331 8.02525 30.0524 7.07139 31.4905 8.50951C32.9286 9.94764 31.9748 12.9669 32.7068 14.7361C33.4656 16.5701 36.25 18.0461 36.25 20.0001C36.25 21.954 33.4656 23.43 32.7067 25.2639C31.9747 27.0331 32.9286 30.0524 31.4905 31.4905C30.0524 32.9286 27.0331 31.9748 25.2639 32.7068C23.43 33.4656 21.9539 36.25 19.9999 36.25C18.046 36.25 16.57 33.4656 14.7361 32.7067C12.9669 31.9747 9.94764 32.9286 8.50951 31.4905Z"
        fill="#23BD33"
      />
      <path
        d="M8.50951 31.4905C7.07139 30.0524 8.02524 27.0331 7.29325 25.2639C6.53443 23.43 3.75 21.9539 3.75 19.9999C3.75 18.046 6.53445 16.57 7.29325 14.7361C8.02525 12.9669 7.07139 9.94764 8.50951 8.50951C9.94764 7.07139 12.9669 8.02524 14.7361 7.29325C16.57 6.53443 18.0461 3.75 20.0001 3.75C21.954 3.75 23.43 6.53445 25.2639 7.29325C27.0331 8.02525 30.0524 7.07139 31.4905 8.50951C32.9286 9.94764 31.9748 12.9669 32.7068 14.7361C33.4656 16.57 36.25 18.0461 36.25 20.0001C36.25 21.954 33.4656 23.43 32.7067 25.2639C31.9747 27.0331 32.9286 30.0524 31.4905 31.4905C30.0524 32.9286 27.0331 31.9748 25.2639 32.7068C23.43 33.4656 21.9539 36.25 19.9999 36.25C18.046 36.25 16.57 33.4656 14.7361 32.7067C12.9669 31.9747 9.94764 32.9286 8.50951 31.4905Z"
        stroke="#23BD33"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.875 16.25L17.7083 25L13.125 20.625"
        stroke="#23BD33"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const Stack = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M5 12.5L20 21.25L35 12.5L20 3.75L5 12.5Z"
        fill="#FD8E1F"
      />
      <path
        d="M5 27.5L20 36.25L35 27.5"
        stroke="#FD8E1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 20L20 28.75L35 20"
        stroke="#FD8E1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12.5L20 21.25L35 12.5L20 3.75L5 12.5Z"
        stroke="#FD8E1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const Arrow = () => {
  return (
    <svg
      width="43"
      height="40"
      viewBox="0 0 53 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.885 13.8418L29.5245 11.8156L40.5661 15.2923C40.7437 15.3477 40.9086 15.4376 41.0513 15.5569C41.1941 15.6763 41.3118 15.8227 41.3977 15.9877C41.4837 16.1527 41.5362 16.333 41.5521 16.5184C41.5681 16.7038 41.5472 16.8904 41.4908 17.0677L38.0122 28.1119L35.9866 27.4737L39.2515 17.1079L28.885 13.8418Z"
        fill="#B4AD8D"
      />
      <path
        d="M19.595 18.6806L20.2344 16.6545L31.276 20.1312C31.4537 20.1866 31.6186 20.2765 31.7613 20.3958C31.904 20.5151 32.0218 20.6615 32.1077 20.8265C32.1937 20.9915 32.2461 21.1719 32.2621 21.3573C32.278 21.5426 32.2572 21.7293 32.2007 21.9066L28.7221 32.9508L26.6966 32.3126L29.9615 21.9468L19.595 18.6806Z"
        fill="#A1A1A1"
      />
      <path
        d="M10.7259 23.2998L11.3653 21.2736L22.4069 24.7503C22.5845 24.8057 22.7494 24.8956 22.8922 25.015C23.0349 25.1343 23.1526 25.2807 23.2386 25.4457C23.3245 25.6107 23.377 25.7911 23.3929 25.9764C23.4089 26.1618 23.388 26.3485 23.3316 26.5257L19.853 37.5699L17.8275 36.9317L21.0923 26.5659L10.7259 23.2998Z"
        fill="#EBEBEB"
      />
    </svg>
  );
};
const collageContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};
const imageChildVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const overlayVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1,
    },
  },
};
const hoverEffect = {
  filter: "brightness(1.1)",
  borderColor: "#564FFD",
  transition: { duration: 0.3 },
};
const CompanyOverview = () => {
  const navigate = useNavigate();
  const handleJoin = () => {
    navigate("/jobs");
  };
  return (
    <motion.section
      className="company-overview-section"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container>
        <Row
          className="d-flex flex-column-reverse flex-lg-row
           gy-5"
        >
          <Col lg={6} md={12} sm={12} className="visual-collage-col">
            <motion.div
              className="collage-wrapper"
              variants={collageContainerVariants}
            >
              <motion.div
                className="collage-overlay"
                variants={overlayVariants}
              >
                <h3 className="text-white txt-overlay">
                  We've been here almost 15 years            
                </h3>
                <button
                  className="btn btn-light btn-pill mt-3 "
                  onClick={handleJoin}
                >
                  Join Our Team                  
                  <span className="ms-5">
                    <Arrow />                 
                  </span>
                </button>
              </motion.div>
              <motion.img
                src={img1}
                alt="Office space"
                className="collage-img img-1"
                variants={imageChildVariants}
                whileHover={hoverEffect}
              />
              <motion.img
                src={img2}
                alt="Smiling team"
                className="collage-img img-2"
                variants={imageChildVariants}
                whileHover={hoverEffect}
              />
              <motion.img
                src={img3}
                alt="Meeting"
                className="collage-img img-3"
                variants={imageChildVariants}
                whileHover={hoverEffect}
              />
              <motion.img
                src={img4}
                alt="Desk setup"
                className="collage-img img-4"
                variants={imageChildVariants}
                whileHover={hoverEffect}
              />
            </motion.div>
          </Col>
          <Col lg={6} md={12} sm={12} className="text-stats-col">
            <div className="stats-content">
              <h2 className="overview-title">
                We’ve been here almost 15 years
              </h2>
              <p className="overview-txt">
                Fusce lobortis leo augue, sit amet tristique nisi commodo in.
                Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
                libero. Curabitur in urna ligula. torquent per conubia nostra.
              </p>

              <div className="d-flex justify-content-between gap-4">
                <div className="stat-item d-flex align-items-center gap-2">
                  <NoteBook />
                  <div className="text-center">
                    <div className="overview-num mt-2 mb-0">26k</div>
                    <div className="overview-text">Certified Instructor</div>
                  </div>
                </div>

                <div className="stat-item d-flex align-items-center gap-2">
                  <CircleWavyCheck />
                  <div className="text-center">
                    <div className="overview-num mt-2 mb-0">99.9%</div>
                    <div className="overview-text">Success Rate</div>
                  </div>
                </div>

                <div className="stat-item d-flex align-items-center gap-2">
                  <Stack />
                  <div className="text-center">
                    <div className="overview-num mt-2 mb-0">57</div>
                    <div className="overview-text">Trusted Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default CompanyOverview;

import { Link } from "react-router-dom";
import "./NotFoundPage.css"; // Import CSS file for additional styles

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="left">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <div className="right">
        <div className="content">
          <h1 className="title">404</h1>
          <p className="text">
            Oops! The page you are looking for could not be found.
          </p>
          <Link to="/" className="button">
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

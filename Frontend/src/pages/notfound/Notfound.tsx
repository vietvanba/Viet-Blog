import { Link } from "react-router-dom";
import "./notfound.scss";
const rootPath = window.location.origin;
export const Notfound = () => {
  return (
    <div className="notfound">
      <img
        src={`${rootPath}/404.svg`}
        alt="https://www.freepik.com/free-vector/404-error-with-landscape-concept-illustration_20602785.htm#fromView=search&page=1&position=1&uuid=ab59b5bf-fc0a-4a9a-a665-bde80f875ada"
        className="img-404"
      />
      <div className="error">
        <div className="title">Oops!</div>
        <div className="text">Something went wrong!</div>
      </div>
      <Link to="/" className="button">
        Go home
      </Link>
    </div>
  );
};

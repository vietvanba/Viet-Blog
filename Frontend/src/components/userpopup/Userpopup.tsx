import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userpopup.scss";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface PopupProps {
  handleLogout: () => void;
  handleClick: () => void;
}
export const Userpopup: React.FC<PopupProps> = ({
  handleLogout,
  handleClick,
}) => {
  const avatarUrl = localStorage.getItem("avatar");

  return (
    <div className="card">
      <div className="email">{localStorage.getItem("email")}</div>
      <img
        src={avatarUrl !== null ? avatarUrl : "default_avatar.jpg"}
        alt=""
        className="avatar_popup"
      />
      <div className="welcome">
        Hello {localStorage.getItem("first_name")} {` `}{" "}
        {localStorage.getItem("last_name")},
      </div>
      <Link to="/user_details" className="manager" onClick={handleClick}>
        Manage your account
      </Link>
      <button onClick={handleLogout} className="logout">
        Log out{` `}
        <FontAwesomeIcon icon={faSignOut} className="icon" />
      </button>
    </div>
  );
};

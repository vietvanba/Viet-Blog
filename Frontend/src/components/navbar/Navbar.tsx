import "./navbar.scss";
import menus from "./navbar.json";
import { Link, NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
const rootPath = window.location.origin;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState();
  const [isBXOpen, setIsBXOpen] = useState(false);
  const handleResize = () => {
    window.innerWidth < 1024 ? setIsBXOpen(false) : setIsBXOpen(true);
  };
  React.useEffect(() => {
    window.innerWidth < 1024 ? setIsBXOpen(false) : setIsBXOpen(true);
    window.addEventListener("resize", handleResize, false);
  }, []);
  const toggleMenu = () => {
    setIsBXOpen(!isBXOpen);
  };
  const handleMouseEnter = (title: any) => {
    setIsOpen(true);
    setTitle(title);
  };

  const handleMouseLeave = (title: any) => {
    setIsOpen(false);
    setTitle(title);
  };
  return (
    <div className="navbar">
      <Link to={"/"} className="homepage" onClick={handleResize}>
        <img src={`${rootPath}/logo.svg`} alt="" className="logo" />
        <div className="logo-text">VanBaViet</div>
      </Link>
      <div className="bx">
        <FontAwesomeIcon
          className="bx-icon"
          icon={faBars}
          color="antiquewhite"
          onClick={toggleMenu}
        />
        <ul
          className="items"
          style={isBXOpen ? { display: "flex" } : { display: "none" }}
        >
          {menus.map((menu, index) => (
            <li
              className="item"
              key={index}
              style={
                (menu.name === "Sign in" || menu.name === "Sign up") &&
                window.innerWidth > 1024
                  ? { display: "none", margin: 0 }
                  : { display: "flex" }
              }
            >
              <NavLink
                onMouseEnter={() => handleMouseEnter(menu.name)}
                onMouseLeave={() => handleMouseLeave(menu.name)}
                to={menu.url}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                onClick={handleResize}
              >
                {menu.name}
              </NavLink>
              {isOpen && title === menu.name && menu.items.length != 0 && (
                <div
                  className="sub"
                  onMouseEnter={() => handleMouseEnter(menu.name)}
                  onMouseLeave={() => handleMouseLeave(menu.name)}
                >
                  {menu.items.map((subItem, index) => (
                    <Link
                      className="subItem"
                      key={index}
                      to={subItem.url}
                      onClick={handleResize}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="login">
        <div className="item">
          <NavLink to="/signin">Sign in</NavLink>
        </div>
        <div className="item">
          <NavLink to="/signup">Sign up</NavLink>
        </div>
      </div>
    </div>
  );
};

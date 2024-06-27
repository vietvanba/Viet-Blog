import "./navbar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Userpopup } from "../userpopup/Userpopup";
import { get } from "../axios/API";
import toast from "react-hot-toast";
const rootPath = window.location.origin;

type SubCategory = {
  name: string;
  url: string;
  items: SubCategory[];
};
type Category = {
  id: string;
  name: string;
  status: string;
};
export const Navbar = () => {
  const [menus, setMenus] = useState<SubCategory[]>([
    { name: "Home", url: "/", items: [] },
    {
      name: "Blog",
      url: "/blog",
      items: [],
    },
    { name: "About", url: "/about", items: [] },
    {
      name: "Dictionary",
      url: "https://dictionary.vanbaviet.online",
      items: [],
    },
    { name: "Portfolio", url: "/portfolio", items: [] },
    { name: "Sign in", url: "/signin", items: [] },
    { name: "Sign up", url: "/signup", items: [] },
  ]);
  const avatarUrl = localStorage.getItem("avatar");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userpopup, setUserpopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState();
  const [isBXOpen, setIsBXOpen] = useState(false);
  const handleResize = () => {
    window.innerWidth < 1024 ? setIsBXOpen(false) : setIsBXOpen(true);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = () => {
    get("/api/category")
      .then((res) => {
        if (res.status === 200) {
          res.data.map((x: Category) => {
            const menu: SubCategory = {
              name: x.name,
              url: `blog?categoryId=${x.id}&categoryName=${x.name}`,
              items: [],
            };
            menus[1].items.push(menu);
          });
          setMenus(menus);
        }
      })
      .catch((e: any) => {
        if (e.response == null) toast.error(e.message);
        else {
          e.response.data.map((error: any) => {
            toast.error(error.error, { duration: 2000 });
          });
        }
      });
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

  const handleAvatarOpen = () => {
    setUserpopup(!userpopup);
  };
  const handleAvatarClose = () => {
    setUserpopup(false);
  };
  const handleMouseLeave = (title: any) => {
    setIsOpen(false);
    setTitle(title);
  };
  const handleLogOut = () => {
    localStorage.clear();
    setIsOpen(false);
    setUserpopup(false);
    navigate("/");
  };
  const handleClick = () => {
    setIsOpen(false);
    setUserpopup(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleAvatarClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleAvatarClose]);
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
      {localStorage.getItem("username") ? (
        <div className="user" ref={popupRef}>
          <img
            src={
              avatarUrl !== null ? avatarUrl : `${rootPath}/default_avatar.jpg`
            }
            alt=""
            className="avatar"
            onClick={handleAvatarOpen}
          />
          {userpopup && (
            <div className="popup">
              <Userpopup
                handleLogout={handleLogOut}
                handleClick={handleClick}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="login">
          <div className="item">
            <NavLink to="/signin">Sign in</NavLink>
          </div>
          <div className="item">
            <NavLink to="/signup">Sign up</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import "./Header.scss";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdHomeFilled } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BiSolidCameraMovie } from "react-icons/bi";

import userIcon from "../../assets/user.png";
import logo from "../../assets/logo.png";
import { showToast } from "../../components/ToastMessage";

const Header = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [input, SetInput] = useState("");
  const [page, setPage] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  const isPhoneScreen = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    setIsMobile(isPhoneScreen);
  }, [isPhoneScreen]);

  const handleNavbar = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      showToast("Can not search with an empty box...", "warn");
      return;
    }
    SetInput("");
  };

  useEffect(() => {
    const setActiveClass = () => {
      let currentPage = location.pathname;
      if (currentPage === "/") {
        setPage("home");
      }
      if (currentPage.includes("/tv")) {
        setPage("tv");
      }
      if (currentPage.includes("/movie")) {
        setPage("movie");
      }
    };
    setActiveClass();
  }, [location]);
  return (
    <header className="header">
      <Link to="/">
        {isMobile ? (
          <BiSolidCameraMovie size={35} className="logo" />
        ) : (
          <img className="logo" src={logo} alt="logo" width={120} />
        )}
      </Link>

      <form onSubmit={handleSubmit} className="searchForm">
        <input
          type="text"
          placeholder="Search here..."
          value={input}
          onChange={(e) => SetInput(e.target.value)}
          className="inputBox"
        />
        <button type="submit" className="searchIcon">
          <IoSearchOutline size={25} />
        </button>
      </form>

      <button
        type="button"
        className="navbar-toggler-btn"
        onClick={handleNavbar}
      >
        <HiOutlineMenuAlt3
          size={35}
          style={{
            color: `${toggleMenu ? "orange" : "#fff"}`,
          }}
        />
      </button>
      <nav
        onClick={handleNavbar}
        className={toggleMenu ? "navbar show-navbar-collapse" : "navbar"}
      >
        <ul className="navbar-nav">
          <Link
            to="/"
            className={`${page === "home" ? "active" : ""} nav-link`}
            style={{ "--i": 1 }}
          >
            <MdHomeFilled size={25} />
            Home
          </Link>

          <Link
            to="/tv"
            className={`${page === "tv" ? "active" : ""} nav-link`}
            style={{ "--i": 2 }}
          >
            <PiTelevisionFill size={25} />
            TV Shows
          </Link>

          <Link
            to="/movie"
            className={`${page === "movie" ? "active" : ""} nav-link`}
            style={{ "--i": 3 }}
          >
            <BiSolidMoviePlay size={25} />
            Movies
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

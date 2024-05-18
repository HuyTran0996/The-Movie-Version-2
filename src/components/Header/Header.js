import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import "./Header.scss";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdHomeFilled } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";

import userIcon from "../../assets/user.png";
import logo from "../../assets/logo.png";
import { showToast } from "../../components/ToastMessage";

const Header = () => {
  const location = useLocation();
  const [input, SetInput] = useState("");
  const [page, setPage] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

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
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" width={120} />
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search here..."
          value={input}
          onChange={(e) => SetInput(e.target.value)}
        />
        <button type="submit">
          <IoSearchOutline />
        </button>
      </form>

      <button
        type="button"
        className="navbar-toggle-btn"
        onClick={handleNavbar}
      >
        <HiOutlineMenuAlt3
          size={35}
          style={{
            color: `${toggleMenu ? "#010101" : "#fff"}`,
          }}
        />
      </button>
      <nav onClick={handleNavbar}>
        <ul>
          <Link to="/">
            <MdHomeFilled />
            Home
          </Link>
          <Link to="/tv">
            <PiTelevisionFill />
            TV Shows
          </Link>
          <Link to="/movie">
            <BiSolidMoviePlay />
            Movies
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

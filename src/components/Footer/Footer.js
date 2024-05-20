import React from "react";
import "./Footer.scss";

import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <ul className="listLi">
              <li>Terms of Use</li>
              <li>Privacy-Policy</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Watch List</li>
            </ul>
            <p>
              © 2024 STREAMIT. All Rights Reserved. All videos and shows on this
              platform are trademarks of, and all related images and content are
              the property of, Streamit Inc. Duplication and copy of this is
              strictly prohibited. All rights reserved.
            </p>
          </div>

          <div className="box">
            <h3>Follow Us</h3>
            <ImFacebook2 className="fab fa-facebook-f" />
            <FaSquareXTwitter className="fab fa-twitter" />
            <FaGithub className="fab fa-github" />
            <FaInstagramSquare className="fab fa-instagram" />
          </div>

          <div className="box">
            <h3>Streamit App</h3>
            <div className="img flexSB">
              <img src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png" />
              <span>App Store</span>
              <img src="https://img.icons8.com/fluency/48/000000/google-play.png" />
              <span>Google Play Store</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

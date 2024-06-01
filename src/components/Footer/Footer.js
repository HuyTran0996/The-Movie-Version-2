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
            </ul>
            <p>
              © 2024 STREAMIT. All Rights Reserved. All videos and shows on this
              platform are trademarks of, and all related images and content are
              the property of, Streamit Inc. Duplication and copy of this is
              strictly prohibited. All rights reserved.
            </p>
          </div>

          <div className="socialMedia">
            <h3>Follow Us</h3>
            <a
              href="https://www.facebook.com/themoviedb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImFacebook2 className="fab" />
            </a>

            <a
              href="https://x.com/themoviedb?lang=en&mx=2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter className="fab" />
            </a>

            <a
              href="https://github.com/adamayoung/TMDb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="fab" />
            </a>
          </div>

          <div className="box">
            <h3>Streamit App</h3>
            <div className="img">
              <a
                href="https://apps.apple.com/us/app/id1458224244"
                target="_blank"
                rel="noopener noreferrer"
                className="appStore"
              >
                <img src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png" />
                <span>App Store</span>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.anch.tmdb_anch_movies_database&hl=vi&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="appStore"
              >
                <img src="https://img.icons8.com/fluency/48/000000/google-play.png" />
                <span>Google Play Store</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

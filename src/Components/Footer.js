import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'; // Import social icons

export default function Footer() {
  return (
    <div className="bg-dark text-light py-3 ">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            {/* You can add a logo here if needed */}
          </Link>
          <span className="text-muted">© 2024 harshApp, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
          <li className="mx-3">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </li>
          <li className="mx-3">
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </li>
          <li className="mx-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
          </li>
        </ul>

        <div className="col-md-4 text-center">
          <span className="text-muted text-white">
            Delivering your favorite meals to your doorstep. Enjoy delicious food with harshApp!
          </span>
        </div>
      </footer>
    </div>
  );
}



import React from "react";
import NavLink from "./NavLink";

let pages = {
  "": "ATM Locations",
  "/about": "About",
  "/support": "Support",
  "/register": "Register",
};

const Navbar = () => {
  return (
    <nav>
      <div>
        <a href="/">
          <img className="logo" src="/logo.png" alt="Logo" />
        </a>
      </div>
      <div className="nav-list-container">
        <ul className="nav-list">
          {Object.entries(pages).map(([key, value], index) => {
            return <NavLink key={index} href={key} text={value} />;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

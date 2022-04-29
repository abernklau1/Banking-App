import React from "react";
import { Logo } from "../../components";

const Home = () => {
  return (
    <section className="home">
      <div class="content-container">
        <div className="logo-container">
          <Logo />
          <p className="home-par">
            Art party synth cloud bread cardigan, cronut retro coloring book
            gastropub next level umami af flexitarian meh health goth.
          </p>
          <div className="btn-container home-btn-container">
            <a href="/register">
              <button className="btn home-btn">Get Started</button>
            </a>
            <a href="/about">
              <button className="btn home-btn">Learn More</button>
            </a>
          </div>
        </div>
        <img className="home-img" src="home-img.svg" alt="Vault" />
      </div>
    </section>
  );
};

export default Home;

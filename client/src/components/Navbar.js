import NavLinks from "./NavLinks";
import { useAppContext } from "../context/appContext";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { toggleSidebar } = useAppContext();

  return (
    <nav>
      <div>
        <a href="/">
          <img className="logo" src="/logo.png" alt="Logo" />
        </a>
        <span className="routing">Routing: #00000000</span>
      </div>
      <NavLinks classes="nav-list-container" />
      <button className="bars" onClick={toggleSidebar}>
        <FaBars size="lg" />
      </button>
    </nav>
  );
};

export default Navbar;

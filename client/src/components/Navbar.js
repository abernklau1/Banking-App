import NavLink from "./NavLink";
import { useAppContext } from "../context/appContext";
import NavUser from "./NavUser";

const Navbar = () => {
  const { isSignedIn } = useAppContext();
  return (
    <nav>
      <div>
        <a href="/">
          <img className="logo" src="/logo.png" alt="Logo" />
        </a>
      </div>
      <div className="nav-list-container">
        <ul className="nav-list">
          <NavLink href="" text="ATM Locations" />
          <NavLink href="/about" text="About" />
          <NavLink href="/support" text="Support" />
          {isSignedIn ? <NavUser /> : <NavLink href="/register" text="Login" />}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { useAppContext } from "../context/appContext";
import { NavLink, NavUser } from "../components";

const NavLinks = ({ classes }) => {
  const { isSignedIn } = useAppContext();
  return (
    <div className={classes}>
      <ul className="nav-list">
        <NavLink href="" text="ATM Locations" />
        <NavLink href="/about" text="About" />
        <NavLink href="/support" text="Support" />
        {isSignedIn ? <NavUser /> : <NavLink href="/register" text="Login" />}
      </ul>
    </div>
  );
};

export default NavLinks;

import { useAppContext } from "../context/appContext";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

const NavUser = () => {
  const { user, logoutUser, toggleLogout, showLogout } = useAppContext();

  // const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="log-btn-container">
      <button type="button" className="btn log-btn" onClick={toggleLogout}>
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button className="dropdown-btn dash-link">
          <a href="/dashboard">Dashboard</a>
        </button>
        <button
          type="button"
          className="dropdown-btn"
          onClick={() => logoutUser()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavUser;

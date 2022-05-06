import { useAppContext } from "../context/appContext";
import { NavLinks } from "../components";

const SideBar = () => {
  const { showSidebar, showLogout } = useAppContext();
  return (
    <NavLinks
      classes={
        showSidebar
          ? showLogout
            ? "nav-list-container-bars visible user-active"
            : "nav-list-container-bars visible"
          : "nav-list-container-bars"
      }
    />
  );
};

export default SideBar;

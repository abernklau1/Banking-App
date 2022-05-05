import { useAppContext } from "../context/appContext";
import { NavLinks } from "../components";

const SideBar = () => {
  const { showSidebar } = useAppContext();
  return (
    <NavLinks
      classes={
        showSidebar
          ? "nav-list-container-bars visible"
          : "nav-list-container-bars"
      }
    />
  );
};

export default SideBar;

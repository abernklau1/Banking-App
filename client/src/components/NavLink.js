const NavLink = ({ href, text }) => {
  return (
    <li className="nav-list-item">
      <a className="nav-link" href={href}>
        {text}
      </a>
    </li>
  );
};

export default NavLink;

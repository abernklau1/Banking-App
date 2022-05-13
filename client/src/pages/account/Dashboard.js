import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const Dashboard = () => {
  const {
    user: { name, email, location, lastName, accNumber },
    routingNumber,
  } = useAppContext();

  return (
    <section>
      <header className="dash">
        <nav className="dash-nav">
          <ul className="dash-nav-list">
            <li className="dash-nav-items">
              <a href="/dashboard">Accounts</a>
            </li>
            <li className="dash-nav-items">
              <a href="/dashboard/transfer">Transfer</a>
            </li>
            <li className="dash-nav-items">
              <a href="/dashboard/make-account">Create New</a>
            </li>
          </ul>
        </nav>
        <ul className="dash-list">
          <li className="dash-items">
            Welcome:
            <span className="dash-vars">
              {name} {lastName}
            </span>
          </li>
          <li className="dash-items">
            Account #: <span className="dash-vars">{accNumber}</span>
          </li>
          <li className="dash-items">
            Routing: <span className="dash-vars">{routingNumber}</span>
          </li>
          <li className="dash-items">
            Email: <span className="dash-vars">{email}</span>
          </li>
          <li className="dash-items">
            Location:
            <span className="dash-vars">
              {location ? location : "UNSPECIFIED"}
            </span>
          </li>
        </ul>
      </header>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;

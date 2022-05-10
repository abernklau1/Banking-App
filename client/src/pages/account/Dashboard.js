import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const Dashboard = () => {
  const {
    user: { name, email, location, lastName },
    account: { accNumber },
    routingNumber,
  } = useAppContext();
  return (
    <section>
      <header className="dash">
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

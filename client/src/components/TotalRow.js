import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const TotalRow = ({ total, id }) => {
  const { setMakePayment } = useAppContext();
  return (
    <tr>
      {total ? (
        <>
          <td colSpan="2" style={{ textAlign: "right" }}>
            <strong>Total Insured</strong>
          </td>
          <td className="balance">${total}</td>
        </>
      ) : (
        <>
          <td colSpan="3" style={{ textAlign: "left" }}>
            <Link
              to="/make-account"
              className="btn pay-btn"
              onClick={() => {
                setMakePayment(id);
              }}
            >
              Make Payment
            </Link>
          </td>
        </>
      )}
    </tr>
  );
};

export default TotalRow;

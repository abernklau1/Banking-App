const TotalRow = ({ total }) => {
  return (
    <tr>
      <td colSpan="2" style={{ textAlign: "right" }}>
        Total
      </td>
      <td className="balance">${total}</td>
    </tr>
  );
};

export default TotalRow;

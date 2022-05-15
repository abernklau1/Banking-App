const TotalRow = ({ total }) => {
  return (
    <tr>
      <td colSpan="2" style={{ textAlign: "right" }}>
        <strong>Total Insured</strong>
      </td>
      <td className="balance">${total}</td>
    </tr>
  );
};

export default TotalRow;

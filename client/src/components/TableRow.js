const TableRow = ({ col1, col2, col3 }) => {
  return (
    <tr>
      <td>{col1}</td>
      <td className="account-type">
        <div>{col2}</div>
      </td>
      <td className="balance">${col3}</td>
    </tr>
  );
};

export default TableRow;

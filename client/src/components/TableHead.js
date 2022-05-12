const TableHead = ({ col1, col2, col3 }) => {
  return (
    <thead>
      <tr>
        <th>{col1}</th>
        <th className="account-type">
          <div>{col2}</div>
        </th>
        <th className="balance">{col3}</th>
      </tr>
    </thead>
  );
};

export default TableHead;

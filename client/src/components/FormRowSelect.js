import { useAppContext } from "../context/appContext";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  isTransfer,
}) => {
  const {
    user: { mainAccount },
  } = useAppContext();
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          if (isTransfer) {
            return (
              <option key={index} value={itemValue}>
                {itemValue + ` (Available: $${mainAccount[index].balance})`}
              </option>
            );
          }
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;

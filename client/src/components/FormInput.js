const FormInput = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
        {props.isStarred && <span className="starred">*</span>}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-input"
        {...props}
      />
    </div>
  );
};

export default FormInput;

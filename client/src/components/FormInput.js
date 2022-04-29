const FormInput = (props) => {
  return (
    <div class="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormInput;

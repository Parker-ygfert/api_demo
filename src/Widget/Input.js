const Input = (props) => {
  return (
    <div className={props.className}>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        required={props.required}
      />
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </div>
  );
}
 
export default Input;
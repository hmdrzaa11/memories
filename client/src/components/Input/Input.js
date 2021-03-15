import classes from "./Input.module.css";

let Input = ({ type, label, ...resetProps }) => {
  let renderInput = () => {
    switch (type) {
      case "password":
        return (
          <input type="password" {...resetProps} className={classes.input} />
        );
      case "email":
        return <input type="email" {...resetProps} className={classes.input} />;
      default:
        return <input type="text" {...resetProps} className={classes.input} />;
    }
  };
  return <div className={classes.inputWrapper}>{renderInput()}</div>;
};

export default Input;

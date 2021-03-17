import classes from "./Input.module.css";

let Input = ({ type, label, imageSrc, ...resetProps }) => {
  let renderInput = () => {
    switch (type) {
      case "password":
        return (
          <input type="password" {...resetProps} className={classes.input} />
        );
      case "email":
        return <input type="email" {...resetProps} className={classes.input} />;
      case "file":
        return (
          <div className={classes.fileWrapper}>
            <input
              type="file"
              {...resetProps}
              className={classes.fileInput}
              id="file"
            />
            <label className={classes.fileLabel} htmlFor="file">
              Select an image
            </label>
            <div>
              {imageSrc ? (
                <img
                  src={`/images/memories/${imageSrc}`}
                  alt="img"
                  className={classes.fileImage}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        );
      default:
        return <input type="text" {...resetProps} className={classes.input} />;
    }
  };
  return <div className={classes.inputWrapper}>{renderInput()}</div>;
};

export default Input;

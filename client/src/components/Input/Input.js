import classes from "./Input.module.css";

let Input = ({ type, label, imageSrc, ...resetProps }) => {
  let renderInput = () => {
    switch (type) {
      case "password":
        return (
          <input
            type="password"
            {...resetProps}
            className={classes.input}
            required
          />
        );
      case "email":
        return (
          <input
            type="email"
            {...resetProps}
            className={classes.input}
            required
          />
        );
      case "file":
        return (
          <div className={classes.fileWrapper}>
            <input
              type="file"
              {...resetProps}
              className={classes.fileInput}
              id="file"
              required={imageSrc ? false : true}
            />
            <label className={classes.fileLabel} htmlFor="file">
              Select an image
            </label>
            <p className={classes.fileErr}>Please Select an Image</p>

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
        return (
          <input
            type="text"
            {...resetProps}
            onChange={resetProps.onChange}
            className={classes.input}
            required
          />
        );
    }
  };
  return <div className={classes.inputWrapper}>{renderInput()}</div>;
};

export default Input;

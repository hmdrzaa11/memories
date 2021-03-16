import { useState } from "react";
import classes from "./Form.module.css";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";

let SignupForm = (props) => {
  let [formState, setFormState] = useState(() => {
    let state = {};
    props.fields.forEach((field) => {
      state[field.name] = "";
    });
    return state;
  });

  let handleOnChange = (e) => {
    setFormState((preState) => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      };
    });
  };

  let renderFields = () => {
    return props.fields.map((field) => (
      <Input
        key={field.name}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        onChange={handleOnChange}
        value={formState[field.name]}
      />
    ));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(formState);
    let emptyFields = {};
    props.fields.forEach((field) => {
      emptyFields[field.name] = ""; //here we set every field to empty field
    });
    setFormState(emptyFields);
  };

  return (
    <div className={classes.formWrapper}>
      <div className={classes.formContainer}>
        <h1 className={classes.formHeader}>{props.formHeader}</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          {renderFields()}
          <div className={classes.submitWrapper}>
            <button className="btn primary">
              {props.loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

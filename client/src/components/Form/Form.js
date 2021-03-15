import { useState } from "react";
import classes from "./Form.module.css";
import Input from "../Input/Input";

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
    <div className="form-wrapper">
      <div className="form-container">
        <h1 className="form-header">{props.formHeader}</h1>
        <form className="form" onSubmit={handleSubmit}>
          {renderFields()}
          <div className="submit-wrapper">
            <button className="btn primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

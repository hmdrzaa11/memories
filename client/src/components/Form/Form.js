import { useEffect, useState } from "react";
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
  let [image, setImage] = useState(null);

  let { memory } = props;

  useEffect(() => {
    if (!memory) return;
    let initialValue = {};
    for (let key in memory) {
      if (key in formState) {
        initialValue[key] = memory[key];
      }
    }
    setFormState(initialValue);
  }, [memory]);

  let handleOnChange = (e) => {
    setFormState((preState) => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      };
    });
  };

  let handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
  };
  //TODO create a function to call after update success and clear inputs
  let renderFields = () => {
    return props.fields.map((field) => {
      if (field.type === "file") {
        return (
          <Input
            key={field.name}
            type={field.type}
            name={field.name}
            onChange={handleFileInputChange}
            imageSrc={formState.image}
          />
        );
      } else {
        return (
          <Input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleOnChange}
            value={formState[field.name]}
          />
        );
      }
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    props.fields.forEach((field) => {
      if (field.name === "image" && image) {
        formData.append("image", image);
      } else {
        formData.append(field.name, formState[field.name]);
      }
    });
    props.onFormSubmit(formData);
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

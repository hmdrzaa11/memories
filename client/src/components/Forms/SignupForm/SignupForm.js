import { useState } from "react";
import Input from "../../Input/Input";
import ButtonLoading from "../../ButtonLoading/ButtonLoading";

export default function SignupForm(props) {
  let [formState, setFormState] = useState(() =>
    props.fields.reduce((initialState, currentField) => {
      initialState[currentField.name] = "";
      return initialState;
    }, {})
  );
  let onInputChange = (e) => {
    setFormState((preState) => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      };
    });
  };
  let renderInputs = props.fields.map((field) => (
    <Input
      key={field.name}
      type={field.type}
      placeholder={field.placeholder}
      onChange={onInputChange}
      name={field.name}
    />
  ));

  let handleFormSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(formState);
  };

  let renderButtonText = () => {
    if (props.isLoading) {
      return <ButtonLoading />;
    } else {
      return props.formHeader === "Sing in" ? "Sign In" : "Sign Up";
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">{props.formHeader}</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        {renderInputs}
        <div className="submit-wrapper">
          <button className="btn primary">{renderButtonText()}</button>
        </div>
      </form>
    </div>
  );
}

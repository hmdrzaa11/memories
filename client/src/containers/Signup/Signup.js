import Form from "../../components/Forms/SignupForm/SignupForm";
import { actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";

const FIELDS = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "Confirm Password",
  },
];

let Signup = (props) => {
  let dispatch = useDispatch();
  let onFormSubmit = (formData) => {
    dispatch(actionCreators.signupAction(formData, props.history));
  };
  //TODO Render a NOtification Component in here when you get errors
  let { error } = useSelector((state) => state.auth);
  let renderErrors = () => {
    if (error) {
      return <h2>{error}</h2>;
    }
  };
  return (
    <div>
      {renderErrors()}
      <Form formHeader="Sign up" onFormSubmit={onFormSubmit} fields={FIELDS} />
    </div>
  );
};

export default Signup;

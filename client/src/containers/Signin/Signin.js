import Form from "../../components/Forms/SignupForm/SignupForm";
import { actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";

const FIELDS = [
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
];

let Signin = (props) => {
  let dispatch = useDispatch();
  let { error } = useSelector((state) => state.auth);
  //TODO create a Notification for showing Errors
  let onFormSubmit = (formData) => {
    dispatch(actionCreators.signinAction(formData, props.history));
  };
  let renderErrors = () => {
    if (error) {
      return <h2>{error}</h2>;
    }
  };
  return (
    <div>
      {renderErrors()}
      <Form fields={FIELDS} formHeader="Sing in" onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default Signin;

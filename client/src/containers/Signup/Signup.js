import Form from "../../components/Forms/SignupForm/SignupForm";
import { actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification/Notification";

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
  let { error, loading } = useSelector((state) => state.auth);
  let onErrorClose = () => {
    dispatch(actionCreators.resetAllErrors());
  };
  let renderErrors = () => {
    if (error) {
      return <Notification message={error} onModalClose={onErrorClose} />;
    }
  };
  return (
    <div>
      {renderErrors()}
      <Form
        formHeader="Sign up"
        onFormSubmit={onFormSubmit}
        fields={FIELDS}
        isLoading={loading}
      />
    </div>
  );
};

export default Signup;

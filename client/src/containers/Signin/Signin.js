import Form from "../../components/Forms/SignupForm/SignupForm";
import { actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification/Notification";

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
  let { error, loading } = useSelector((state) => state.auth);
  let onFormSubmit = (formData) => {
    dispatch(actionCreators.signinAction(formData, props.history));
  };

  let onModalClose = () => {
    dispatch(actionCreators.resetAllErrors());
  };

  let renderErrors = () => {
    if (error) {
      return <Notification message={error} onModalClose={onModalClose} />;
    }
  };
  return (
    <div>
      {renderErrors()}
      <Form
        fields={FIELDS}
        formHeader="Sing in"
        onFormSubmit={onFormSubmit}
        isLoading={loading}
      />
    </div>
  );
};

export default Signin;

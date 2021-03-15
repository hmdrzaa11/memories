import Form from "../../components/Form/Form";

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

let Signup = () => {
  let onFormSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <Form fields={FIELDS} formHeader="Sign up" onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default Signup;

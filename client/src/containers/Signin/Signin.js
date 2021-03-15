import Form from "../../components/Form/Form";
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

let Signin = () => {
  let onFormSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <Form fields={FIELDS} formHeader="Sign in" onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default Signin;

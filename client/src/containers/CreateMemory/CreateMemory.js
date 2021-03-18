import Form from "../../components/Forms/CreateMemoryForm/CreateMemoryForm";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";

const FIELDS = [
  {
    name: "title",
    type: "text",
    placeholder: "Title",
  },
  {
    name: "description",
    type: "text",
    placeholder: "Description",
  },
  {
    name: "image",
    type: "file",
  },
];

export default function CreateMemory(props) {
  let dispatch = useDispatch();
  let handleFormSubmit = (formData) => {
    dispatch(actionCreators.createMemory(formData, props.history));
  };

  return (
    <div>
      <Form
        fields={FIELDS}
        formHeader="Create a Memory"
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

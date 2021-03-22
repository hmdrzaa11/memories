import Form from "../../components/Forms/CreateMemoryForm/CreateMemoryForm";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import Notification from "../../components/Notification/Notification";

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

  let { error, loading } = useSelector((state) => state.memories);

  let onModalClose = () => {
    dispatch(actionCreators.resetAllErrors());
  };

  let renderError = () => {
    if (error) {
      return <Notification message={error} onModalClose={onModalClose} />;
    }
  };

  return (
    <div>
      {renderError()}
      <Form
        fields={FIELDS}
        formHeader="Create a Memory"
        onFormSubmit={handleFormSubmit}
        isLoading={loading}
      />
    </div>
  );
}

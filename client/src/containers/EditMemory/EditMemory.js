import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import From from "../../components/Forms/CreateMemoryForm/CreateMemoryForm";
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

export default function EditMemory(props) {
  let dispatch = useDispatch();
  let { memId } = props.match.params;
  let { fetchSingleMemory } = actionCreators;
  let { memories, error } = useSelector((state) => state.memories);
  let memory = memories.find((mem) => mem._id === memId);

  useEffect(() => {
    dispatch(fetchSingleMemory(memId));
  }, [dispatch, fetchSingleMemory, memId]);

  let handleSubmit = (formData) => {
    dispatch(actionCreators.updateMemory(formData, memId, props.history));
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
      <From
        fields={FIELDS}
        formHeader="Update A Memory"
        memory={memory}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import From from "../../components/Form/Form";

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
  let { memories, loading, error } = useSelector((state) => state.memories);
  let memory = memories.find((mem) => mem._id === memId);

  useEffect(() => {
    dispatch(fetchSingleMemory(memId));
  }, [dispatch, fetchSingleMemory, memId]);

  let handleSubmit = (formData) => {
    dispatch(actionCreators.updateMemory(formData, memId, props.history));
  };

  return (
    <div>
      <From
        fields={FIELDS}
        formHeader="Update A Memory"
        memory={memory}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

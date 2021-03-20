import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewDescription from "../../components/ReviewDescription/ReviewDescription";
import ReviewHeader from "../../components/ReviewHeader/ReviewHeader";
import { actionCreators } from "../../state";

let Review = (props) => {
  let { memId } = props.match.params;
  let dispatch = useDispatch();
  let { memories } = useSelector((state) => state.memories);
  let { fetchSingleMemory } = actionCreators;

  useEffect(() => {
    dispatch(fetchSingleMemory(memId));
  }, [dispatch, fetchSingleMemory, memId]);

  let memory = memories.find((mem) => mem._id === memId);
  let renderReview = () => {
    if (memory) {
      return (
        <>
          <ReviewHeader image={memory.image} name={memory.title} />
          <ReviewDescription memory={memory} />
        </>
      );
    }
  };
  return <div>{renderReview()}</div>;
};

export default Review;

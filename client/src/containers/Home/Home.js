import { useEffect } from "react";
import Memories from "../../components/Memories/Memories";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Loading from "../../components/Loading/Loading";

let Home = () => {
  let dispatch = useDispatch();
  let { error, loading, memories } = useSelector((state) => state.memories);
  let { fetchAllMemories } = actionCreators;
  //************* fetch All Memories  **************** */
  console.log(error, loading, memories);
  useEffect(() => {
    dispatch(fetchAllMemories());
  }, [dispatch, fetchAllMemories]);

  //*************** render Memories ********************** */
  let renderMemories = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <div>{error}</div>;
    } else {
      return <Memories memories={memories} />;
    }
  };
  return <div>{renderMemories()}</div>;
};

export default Home;

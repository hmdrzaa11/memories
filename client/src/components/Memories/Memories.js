import Memory from "../Memory/Memory";
import classes from "./Memories.module.css";

export default function Memories({ memories }) {
  let renderMemories = memories.map((mem) => (
    <Memory memory={mem} key={mem._id} />
  ));
  return (
    <div className={`${classes.Memories} container`}>{renderMemories}</div>
  );
}

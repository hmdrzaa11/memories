import Memory from "../Memory/Memory";
import classes from "./Memories.module.css";

export default function Memories({ memories }) {
  let renderMemories = memories.map((mem) => (
    <Memory memory={mem} key={mem._id} />
  ));
  let renderContent = () => {
    if (memories && memories.length) {
      return (
        <div className={`${classes.Memories} container`}>{renderMemories}</div>
      );
    } else {
      return (
        <div className={`${classes.Memories} container`}>
          <h1 className={classes.header}>Login To Create Memories</h1>
        </div>
      );
    }
  };
  return renderContent();
}

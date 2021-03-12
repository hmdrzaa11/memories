import Memory from "../Memory/Memory";
import "./Memories.css";

export default function Memories({ memories }) {
  let renderMemories = memories.map((mem) => (
    <Memory memory={mem} key={mem._id} />
  ));
  return <div className="Memories container">{renderMemories}</div>;
}

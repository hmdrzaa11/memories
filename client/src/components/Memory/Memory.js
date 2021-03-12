import "./Memory.css";

let Memory = (props) => {
  let {
    _id,
    author,
    createdAt,
    description,
    image,
    ratingsAvg,
    title,
  } = props.memory;
  return (
    <div className="Memory">
      <h1>{title}</h1>
    </div>
  );
};

export default Memory;

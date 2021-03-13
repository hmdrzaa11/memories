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
      <div className="Memory-top">
        <div className="Memory-top__image-wrapper">
          <img
            src={`images/memories/${image}`}
            alt={title}
            className="Memory-top__image"
          />
          <div className="Memory-top__image-overlay"></div>
        </div>
        <h4 className="">{title}</h4>
      </div>
      <div className="Memory-bottom"></div>
    </div>
  );
};

export default Memory;

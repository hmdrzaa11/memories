import classes from "./ReviewHeader.module.css";

export default function ReviewHeader(props) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.imageWrapper}>
        <img
          src={`/images/memories/${props.image}`}
          alt={props.name}
          className={classes.image}
        />
        <div className={classes.overlay}></div>
      </div>
    </div>
  );
}

import classes from "./Memory.module.css";
import Button from "../Button/Button";

let Memory = (props) => {
  let {
    _id,
    author: { username },
    createdAt,
    description,
    image,
    ratingsAvg,
    title,
  } = props.memory;

  return (
    <div className={classes.Memory}>
      <div className={classes.top}>
        <div className={classes.imageWrapper}>
          <img
            src={`/images/memories/${image}`}
            alt={title}
            className={classes.image}
          />
          <div className={classes.imageOverlay}></div>
        </div>
        <div className={classes.detail}>
          <h3 className={classes.title}>{title}</h3>
          <h4 className={classes.username}>{username}</h4>
        </div>
        <div className={classes.updateBtn}>
          <i className={`${classes.white} fas fa-ellipsis-h`}></i>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.description}>{description}</div>
        <div className={classes.cta}>
          <Button>More</Button>
        </div>
      </div>
    </div>
  );
};

export default Memory;

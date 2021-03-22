import classes from "./Memory.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";

let Memory = (props) => {
  let {
    _id,
    author: { username, _id: owner },
    createdAt,
    description,
    image,
    ratingsAvg,
    title,
  } = props.memory;
  let { user } = useSelector((state) => state.auth);
  let isMyMemory = user && owner === user._id;
  let dispatch = useDispatch();

  let handleDelete = () => {
    dispatch(actionCreators.deleteMemory(_id));
  };

  let renderStars = () => {
    let fullStars = Math.floor(ratingsAvg);
    let stars = [];
    let offStars = 5 - fullStars;
    for (let i = 0; i < fullStars; i++) {
      stars.push(true);
    }
    for (let i = 0; i < offStars; i++) {
      stars.push(false);
    }
    let jsx = stars.map((st, i) => {
      if (st) {
        return <i key={i} className="fas fa-star gold"></i>;
      } else {
        return <i key={i} className="fas fa-star grey"></i>;
      }
    });
    return jsx;
  };
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
          <div className={classes.date}>{moment(createdAt).fromNow()}</div>
        </div>
        <Link to={`/edit/${_id}`} className={classes.updateBtn}>
          {isMyMemory ? (
            <i className={`${classes.white} fas fa-ellipsis-h`}></i>
          ) : (
            ""
          )}
        </Link>
      </div>
      <div className={classes.bottom}>
        <div className={classes.description}>{description}</div>
        <div className={classes.cta}>
          <Link to={`review/${_id}`} className="btn primary">
            More
          </Link>
          {isMyMemory ? (
            <button onClick={handleDelete} className="btn btn danger">
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={classes.stars}>{renderStars()}</div>
    </div>
  );
};

export default Memory;

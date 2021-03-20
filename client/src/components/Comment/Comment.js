import { useState } from "react";
import classes from "./Comment.module.css";

export default function Comment({ author, review, rating }) {
  let [isUpdateMode, setUpdateMode] = useState(false);

  let [formState, setFormState] = useState(() => {
    return {
      review,
      rating,
    };
  });
  //TODO add a dynamic scroll to bottom and also render buttons based on user auth
  let renderContent = () => {
    if (isUpdateMode) {
      return (
        <form>
          <div className={classes.inputWrapper}>
            <input
              className={classes.reviewInput}
              type="text"
              value={formState.review}
            />
            <input
              className={classes.ratingInput}
              type="number"
              value={formState.rating}
              min="4.8"
              max="5"
            />
          </div>
          <div className={classes.action}>
            <button className="btn primary">Update</button>
            <button
              className="btn danger"
              onClick={(e) => setUpdateMode((pre) => !pre)}
            >
              Cancel
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <div className={classes.action}>
          <p className={classes.review}>{review}</p>
          <span className={classes.rating}>{rating}</span>
        </div>
      );
    }
  };
  return (
    <div className={classes.wrapper}>
      <h4 className={classes.author}>{author}</h4>
      <div
        className={classes.details}
        style={{ marginBottom: isUpdateMode ? 0 : "2rem" }}
      >
        {renderContent()}
      </div>
      <div className={classes.action}>
        {!isUpdateMode ? (
          <>
            <button
              className="btn primary"
              onClick={(e) => setUpdateMode((preState) => !preState)}
            >
              update
            </button>
            <button className="btn danger">delete</button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

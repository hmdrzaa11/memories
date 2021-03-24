import { useState } from "react";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";
import classes from "./Comment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";

export default function Comment({
  author,
  review,
  rating,
  authorId,
  userId,
  memId,
  reviewId,
}) {
  let [isUpdateMode, setUpdateMode] = useState(false);
  let { updateReviewLoading, deleteReviewLoading } = useSelector(
    (state) => state.memories
  );
  let isMine = false;
  if (userId && userId === authorId) isMine = true;
  let dispatch = useDispatch();

  let handleCancel = (e) => {
    setUpdateMode((pre) => !pre);
  };

  let handleFormSubmit = (formData) => {
    if (isUpdateMode) {
      dispatch(
        actionCreators.updateReview(memId, reviewId, formData, handleCancel)
      );
    }
  };

  let handleDeleteReview = () => {
    dispatch(actionCreators.deleteReview(memId, reviewId));
  };

  let renderContent = () => {
    if (isUpdateMode) {
      return (
        <ReviewForm
          review={review}
          rating={rating}
          onCancelClick={handleCancel}
          handleFormSubmit={handleFormSubmit}
          isLoading={updateReviewLoading}
          isDeleting={deleteReviewLoading}
        />
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
        // style={{ marginBottom: isUpdateMode ? 0 : "2rem" }}
      >
        {renderContent()}
      </div>
      {isMine ? (
        <div>
          {!isUpdateMode ? (
            <div className={classes.action}>
              <i
                onClick={(e) => setUpdateMode((preState) => !preState)}
                className="fas fa-edit"
              ></i>
              <i onClick={handleDeleteReview} className="fas fa-times"></i>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

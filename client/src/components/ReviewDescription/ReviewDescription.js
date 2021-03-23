import { useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import classes from "./ReviewDescription.module.css";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { useEffect, useRef } from "react";

export default function ReviewDescription(props) {
  let { title, description, reviews, _id } = props.memory;
  let { user } = useSelector((state) => state.auth);
  let { loading } = useSelector((state) => state.memories);

  let scrollDiv = useRef(null);

  let dispatch = useDispatch();

  let handleFormSubmit = (formData) => {
    dispatch(actionCreators.createReview(_id, formData));
  };

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reviews]);

  let renderReviews = () => {
    if (reviews) {
      return reviews.map((review) => (
        <Comment
          author={review.reviewer.username}
          rating={review.rating}
          review={review.review}
          key={review._id}
          authorId={review.reviewer._id}
          userId={user ? user._id : ""}
          memId={_id}
          reviewId={review._id}
        />
      ));
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.detail}>
        <h2 className={classes.header}>{title}</h2>
        <h4 className={classes.descriptionHeader}>Description : </h4>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.formWrapper}>
        {user ? (
          <ReviewForm
            handleFormSubmit={handleFormSubmit}
            noCancel
            isLoading={loading}
          />
        ) : (
          ""
        )}
      </div>
      {reviews && reviews.length ? (
        <div className={classes.comments}>
          {renderReviews()}
          <div ref={scrollDiv}></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

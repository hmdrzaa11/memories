import { useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import classes from "./ReviewDescription.module.css";
export default function ReviewDescription(props) {
  let { title, description, reviews, _id } = props.memory;
  let { user } = useSelector((state) => state.auth);
  let renderReviews = () => {
    if (reviews && user) {
      return reviews.map((review) => (
        <Comment
          author={review.reviewer.username}
          rating={review.rating}
          review={review.review}
          key={review._id}
          authorId={review.reviewer._id}
          userId={user._id}
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
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes.comments}>{renderReviews()}</div>
    </div>
  );
}

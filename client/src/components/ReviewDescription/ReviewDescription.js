import Comment from "../Comment/Comment";
import classes from "./ReviewDescription.module.css";
export default function ReviewDescription(props) {
  let { title, description, reviews } = props.memory;
  let renderReviews = () => {
    if (reviews) {
      return reviews.map((review) => (
        <Comment
          author={review.reviewer.username}
          rating={review.rating}
          review={review.review}
          key={review._id}
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

import { useState } from "react";
import classes from "./ReviewForm.module.css";
export default function ReviewForm({
  review,
  rating,
  onCancelClick,
  handleFormSubmit,
  noCancel,
}) {
  let [formState, setFormState] = useState(() => {
    return {
      review: review || "",
      rating: rating || "",
    };
  });
  let handleInputChange = (e) => {
    setFormState((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  let handleFromSubmit = () => {
    handleFormSubmit(formState);
    setFormState({ rating: "", review: "" });
  };
  return (
    <form>
      <div className={classes.inputWrapper}>
        <input
          className={classes.reviewInput}
          type="text"
          value={formState.review}
          onChange={handleInputChange}
          name="review"
          placeholder="Your Review..."
        />
        <input
          className={classes.ratingInput}
          type="number"
          value={formState.rating}
          min={4}
          max={5}
          onChange={handleInputChange}
          name="rating"
          placeholder="Rating..."
          step="any"
        />
      </div>

      <div className={classes.action}>
        <i className="fas fa-edit" onClick={handleFromSubmit}></i>
        {!noCancel ? (
          <i onClick={onCancelClick} className="fas fa-times"></i>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

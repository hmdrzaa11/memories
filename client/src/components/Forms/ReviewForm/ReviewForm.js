import { useState } from "react";
import classes from "./ReviewForm.module.css";
export default function ReviewForm({
  review,
  rating,
  onCancelClick,
  handleFormSubmit,
}) {
  let [formState, setFormState] = useState(() => {
    return {
      review,
      rating,
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
        />
        <input
          className={classes.ratingInput}
          type="number"
          value={formState.rating}
          min={4}
          max={5}
          onChange={handleInputChange}
          name="rating"
        />
      </div>
      <div className={classes.action}>
        <i className="fas fa-edit" onClick={handleFromSubmit}></i>
        <i onClick={onCancelClick} className="fas fa-times"></i>
      </div>
    </form>
  );
}

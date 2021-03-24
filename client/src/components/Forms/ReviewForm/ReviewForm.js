import { useState } from "react";
import classes from "./ReviewForm.module.css";
import ButtonLoading from "../../ButtonLoading/ButtonLoading";
import { useSelector } from "react-redux";

export default function ReviewForm({
  review,
  rating,
  onCancelClick,
  handleFormSubmit,
  noCancel,
  isLoading,
  isDeleting,
}) {
  let { deleteReviewLoading } = useSelector((state) => state.memories);
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

  let onFormSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formState);
    setFormState({ rating: "", review: "" });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className={classes.inputWrapper}>
        <input
          className={classes.reviewInput}
          type="text"
          value={formState.review}
          onChange={handleInputChange}
          name="review"
          placeholder="Your Review..."
          required
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
          required
        />
      </div>

      <div className={classes.action}>
        <button>
          {isLoading ? <ButtonLoading /> : <i className="fas fa-edit"></i>}
        </button>
        {!noCancel ? (
          <button>
            {deleteReviewLoading ? (
              <ButtonLoading />
            ) : (
              <i onClick={onCancelClick} className="fas fa-times"></i>
            )}
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import Rating from "../Rating";

export default function LeaveRating() {
  const [rating, setRating] = useState(3);

  const parkingLot = useLoaderData();
  const currNumRating = parkingLot.NumRating;
  const origRating = parkingLot.Rating;
  //   console.log(origRating);

  function handleChange(event) {
    // console.log(event.target.value);
    return <></>;
  }

  return (
    <Form method="post">
      <Rating rating={rating}>
        {(isFilled, starNumber) => {
          const color = isFilled ? "#fcad03" : "#ddd";
          const size = "2x";
          // this is the actual button star
          return (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                setRating(starNumber);
              }}
            >
              <FontAwesomeIcon icon={faStar} color={color} size={size} />
            </button>
          );
        }}
      </Rating>
      <input
        type="text"
        value={rating}
        onChange={handleChange}
        name="rating"
        className="hidden"
      />
      <input
        type="text"
        value={currNumRating}
        onChange={handleChange}
        name="numrating"
        className="hidden"
      />
      <input
        type="text"
        value={origRating}
        onChange={handleChange}
        name="origrating"
        className="hidden"
      />

      <div className="form-floating mb-3" id="comment-input-wrap">
        <textarea className="form-control" id="comment-input" name="comment" />
        <label htmlFor="comment-input">Leave a comment here</label>
      </div>

      <button type="submit" className="btn btn-primary" id="comment-btn-submit">
        Submit
      </button>
    </Form>
  );
}

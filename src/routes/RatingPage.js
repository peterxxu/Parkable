import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import Rating from "../Rating";

export default function RatingPage() {
  const parkingLot = useLoaderData();

  const starRating = parseInt(parkingLot.Rating);
  const numericRating = parseFloat(parkingLot.Rating).toFixed(1);

  //   console.log(rating);

  return (
    <>
      <Rating rating={starRating}>
        {(isFilled) => {
          const color = isFilled ? "#fcad03" : "#ddd";
          const size = "2x";
          return (
            <FontAwesomeIcon
              icon={faStar}
              color={color}
              size={size}
              className="staricon"
            />
          );
        }}
      </Rating>
      <div className="ratingtext">{numericRating}</div>

      <div id="show-comment">
        <Link to={`/parkingLots/${parkingLot.id}/ratings/comments`}>
          Show Comments
        </Link>
      </div>

      <Outlet />
    </>
  );
}

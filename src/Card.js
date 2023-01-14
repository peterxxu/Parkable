import { Link } from "react-router-dom";

export default function Card(props) {
  const handleClick = () => {
    props.onClick();
  };

  let cardClass = "card mb-3";
  if (props.isActive) {
    cardClass = "card border-dark mb-3";
  }

  return (
    <div data-testid="card-style" className={cardClass} onClick={handleClick}>
      <h5 className="card-title" data-testid={"card-title"}>
        {props.title}
      </h5>
      <h6 className="card-subtitle mb-2 text-muted">{props.address}</h6>
      <p className="card-text">Spaces: {props.spaces}</p>
      <Link to={`/parkingLots/${props.id}`} className="card-link">
        Detail
      </Link>
      {/* Is Active: {String(props.isActive)} */}
    </div>
  );
}

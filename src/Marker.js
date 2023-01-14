export default function Marker(props) {
  const handleClick = () => {
    // console.log(`You clicked on ${props.tooltip}`);
    props.onClick();
  };

  let circleClass = "circle";
  if (props.isActive) {
    circleClass = "circle circle-selected";
  }

  return (
    <div
      data-testid="marker-circle"
      className={circleClass}
      onClick={handleClick}
    >
      <span data-testid="marker" className="circleText" title={props.tooltip}>
        {props.text}
      </span>
    </div>
  );
}

export default function Rating(props) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    // add attribute starNumber
    stars.push(
      <Star
        starNumber={i}
        rating={props.rating}
        key={i}
        // children refers to whatever is in between opening and closing tags of the component
        renderStar={props.children}
      />
    );
  }

  return <>{stars}</>;
}

function Star(props) {
  // if starNumber <= given rating, then return filledColor, return emptyColor otherwise
  const isFilled = props.starNumber <= props.rating;
  // starNumber is assigned in line 11
  return props.renderStar(isFilled, props.starNumber);
}

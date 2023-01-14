import { useEffect, useRef } from "react";

export default function Checkbox(props) {
  const parkingLots = props.parkingLots;
  const handleChange = props.handleChange;
  const isIndeterminate = props.isIndeterminate;
  const isSelectedAll = props.isSelectedAll;

  const checkboxRef = useRef();

  useEffect(() => {
    checkboxRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  return (
    <div className="container my-4">
      {/* <form className="form"> */}
      <h3 data-testid="select-test">Select Comments to Delete</h3>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="selectAll"
          ref={checkboxRef}
          checked={isSelectedAll}
          onChange={handleChange}
        />
        <label className="form-check-label ms-2">Select All</label>
      </div>
      {parkingLots.map((parkingLot) => (
        <div className="form-check" key={parkingLot.name}>
          <input
            type="checkbox"
            className="form-check-input"
            name={parkingLot.name}
            checked={parkingLot?.isChecked || false}
            onChange={handleChange}
          />
          <label className="form-check-label ms-2">{parkingLot.name}</label>
        </div>
      ))}
      {/* </form> */}
    </div>
  );
}

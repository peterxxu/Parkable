export default function TextAreaInput(props) {
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>

      <textarea
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      />
    </>
  );
}

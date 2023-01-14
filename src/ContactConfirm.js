import { Link } from "react-router-dom";

export default function ContactConfirm() {
  return (
    <div style={{ marginTop: "20px" }}>
      <h4>
        Thank you for reaching out. A member of our team will reach out to you
        soon.
      </h4>

      <Link to={"/"} data-testid="confirmation-page">
        Go back to homepage
      </Link>
    </div>
  );
}

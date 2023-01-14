import { useEffect, useState } from "react";
import ContactConfirm from "../ContactConfirm";
import Modal from "../Modal";
import TextAreaInput from "../TextAreaInput";
import TextInput from "../TextInput";

export default function Contact() {
  useEffect(() => {
    document.title = "Parkable: Contact";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [nameFeedbackDisplay, setNameFeedbackDisplay] = useState("hidden");
  const [emailFeedbackDisplay, setEmailFeedbackDisplay] = useState("hidden");
  const [messageFeedbackDisplay, setMessageFeedbackDisplay] =
    useState("hidden");

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (name === "") {
      setNameFeedbackDisplay("");
    } else {
      setNameFeedbackDisplay("hidden");
    }
    if (email === "") {
      setEmailFeedbackDisplay("");
    } else {
      setEmailFeedbackDisplay("hidden");
    }
    if (message === "") {
      setMessageFeedbackDisplay("");
    } else {
      setMessageFeedbackDisplay("hidden");
    }
    if (name !== "" && email !== "" && message !== "") {
      setIsSubmitted(true);
    }
  }

  function handleReset(event) {
    event.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
  }

  return isSubmitted ? (
    <ContactConfirm />
  ) : (
    <div>
      <button
        type="button"
        id="menu"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        Menu
      </button>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(!isModalOpen);
          }}
        ></Modal>
      )}

      <h1
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px" }}
      >
        Contact
      </h1>

      <form>
        <div className="my-3">
          <TextInput
            label="Name"
            id="name-input"
            value={name}
            onChange={(updatedName) => {
              setName(updatedName);
            }}
          />
          <div style={{ color: "red" }} className={nameFeedbackDisplay}>
            Please enter a username.
          </div>
        </div>

        <div className="my-3">
          <TextInput
            label="Email"
            id="email-input"
            value={email}
            onChange={(updatedEmail) => {
              setEmail(updatedEmail);
            }}
          />
          <div style={{ color: "red" }} className={emailFeedbackDisplay}>
            Please enter an email.
          </div>
        </div>

        <div className="my-3">
          <TextAreaInput
            label="Message"
            id="message-input"
            value={message}
            onChange={(updatedMessage) => {
              setMessage(updatedMessage);
            }}
          />
          <div style={{ color: "red" }} className={messageFeedbackDisplay}>
            Message cannot be empty.
          </div>
        </div>

        <button
          style={{ marginRight: "10px" }}
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}

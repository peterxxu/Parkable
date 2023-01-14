import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteComment } from "../api";
import Checkbox from "../Checkbox";
import Modal from "../Modal";

export default function Admin() {
  useEffect(() => {
    document.title = "Parkable: Admin";
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parkingLots, setParkingLots] = useState([]);
  //   const [displayDeleteBtn, setDisplayDeleteBtn] = useState("hidden");

  const isIndeterminate =
    parkingLots.some((parkingLot) => parkingLot?.isChecked !== true) &&
    parkingLots.some((parkingLot) => parkingLot?.isChecked === true);

  const isSelectedAll = !parkingLots.some(
    (parkingLot) => parkingLot?.isChecked !== true
  );

  let hideDeleteBtn = true;
  if (isSelectedAll || isIndeterminate) {
    hideDeleteBtn = false;
  }

  const datas = useLoaderData();
  const newdata = datas.map((data) => {
    return {
      name:
        "id:" +
        data.id +
        ", " +
        data.body +
        " (parking lot id " +
        data.parkingLotId +
        ")",
    };
  });

  useEffect(() => {
    setParkingLots(newdata);
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (name === "selectAll") {
      let tempParkingLot = parkingLots.map((parkingLot) => {
        return { ...parkingLot, isChecked: checked };
      });
      setParkingLots(tempParkingLot);
    } else {
      let tempParkingLot = parkingLots.map((parkingLot) =>
        parkingLot.name === name
          ? { ...parkingLot, isChecked: checked }
          : parkingLot
      );
      setParkingLots(tempParkingLot);
    }
  };

  const handleDelete = (event) => {
    // event.preventDefault();
    let count = 0;
    parkingLots.map((parkingLot) => {
      let startIndex = parkingLot.name.indexOf(":");
      let stopIndex = parkingLot.name.indexOf(",");
      let commentId = parkingLot.name.slice(startIndex + 1, stopIndex);
      if (parkingLot.isChecked) {
        count += 1;
        deleteComment(commentId);
      }
    });
    console.log(count);
    console.log(parkingLots.length);
    if (parkingLots.length - count === 0) {
      toast.success("All comments are deleted.");
      alert("You have deleted all the comments");
    }
  };

  return (
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

      <form onSubmit={handleDelete}>
        <Checkbox
          parkingLots={parkingLots}
          handleChange={handleChange}
          isIndeterminate={isIndeterminate}
          isSelectedAll={isSelectedAll}
        />
        <button
          type="submit"
          className="btn btn-sm btn-danger"
          hidden={hideDeleteBtn}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

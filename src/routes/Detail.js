import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import Modal from "../Modal";

export default function Detail() {
  const parkingLot = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = `Parkable: ${parkingLot.title}`;
  }, [parkingLot.title]);
  //   console.log(parkingLot);
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

      <div className="header">
        <h1>{parkingLot.title}</h1>
        <h4>{parkingLot.Address}</h4>
      </div>

      <div className="content">
        <br></br>
        <p>Spaces: {parkingLot.Spaces}</p>
        <p>Hourly Cost: {parkingLot.HourlyCost}</p>
        <p>Daily Cost: {parkingLot.DailyCost}</p>
        <p>Monthly Cost: {parkingLot.MonthlyCost}</p>
        <br></br>

        <h5>Ratings</h5>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <Link
              to={`/parkingLots/${parkingLot.id}/ratings`}
              className="nav-link"
            >
              User Average ({parkingLot.NumRating})
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/parkingLots/${parkingLot.id}/ratings/new`}
              className="nav-link"
            >
              Leave a Rating
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

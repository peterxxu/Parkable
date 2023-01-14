import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Map from "../Map";

export default function Index() {
  const points = useLoaderData();

  useEffect(() => {
    document.title = "Parkable: Home";
  }, []);

  return (
    <div className="index-page">
      <Map points={points} />
    </div>
  );
}

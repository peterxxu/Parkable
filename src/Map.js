import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Card from "./Card";

export default function Map(props) {
  const points = props.points;
  const [activePoint, setActivePoint] = useState();

  const defaultProps = {
    center: {
      lat: 34.052235,
      lng: -118.243683,
    },
    zoom: 11,
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "30%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {points.map((point) => {
          return (
            <Card
              key={point.id}
              id={point.id}
              title={point.title}
              address={point.Address}
              spaces={point.Spaces}
              onClick={() => {
                // console.log("BOOM", point);
                setActivePoint(point);
              }}
              isActive={point.id === activePoint?.id}
            />
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "70%",
          height: "100%",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD_uy502Rcw9ljm2QquhymBPjqHoA4LOM4" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {points.map((point) => {
            const { lat, lng, id, HourlyCost, title } = point;

            return (
              <Marker
                key={id}
                lat={lat}
                lng={lng}
                text={HourlyCost}
                tooltip={title}
                onClick={() => {
                  // console.log("BOOM", point);
                  setActivePoint(point);
                }}
                isActive={point.id === activePoint?.id}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
}

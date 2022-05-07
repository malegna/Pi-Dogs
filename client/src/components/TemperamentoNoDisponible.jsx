import React from "react";

export default function TemperDis(props) {
    const {temperament} = props
  return (
    <>
      {temperament.length ? (
        temperament
      ) : (
        <p style={{ margin: "6px 2px" }}>Temperamento no disponible</p>
      )}{" "}
    </>
  );
}
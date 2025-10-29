import { useEffect, useState } from "react";
import type { DataItem } from "./interfaces";

export function DataWrite(props: {
  data: DataItem;
  onAddressChnage: (id: number) => void;
  variant: "desktop" | "mobile";
}) {
  const [writeData, setWriteData] = useState<DataItem>({
    address: "",
    id: 0,
    intolerances: "",
    isThereSweets: true,
    name: "",
  });
  const spiderWebSrc = "spider-web.svg";

  useEffect(() => {
    let intolerance = props.data.intolerances;

    switch (intolerance.trim()) {
      case "":
        intolerance = "none";
        break;
      case "gluten":
        intolerance = "gluten-free.svg";
        break;
      case "lactose":
        intolerance = "lactose-free.svg";
        break;
      case "peanut":
        intolerance = "/peanut-free.svg";
        break;
      case "soy":
        intolerance = "/soy-free.svg";
        break;
      default:
        intolerance = "none";
    }

    const newWriteData: DataItem = {
      address: props.data.address,
      id: props.data.id,
      intolerances: intolerance,
      isThereSweets: props.data.isThereSweets,
      name: props.data.name,
    };
    setWriteData(newWriteData);
  }, [props.data]);

  const renderIntoleranceImage = () => {
    if (!writeData.intolerances || writeData.intolerances === "none") {
      return null;
    }
    return (
      <>
        Intolerances:{" "}
        <img
          src={writeData.intolerances}
          className="img-fluid"
          alt="Intolerance"
        />
        <br />
      </>
    );
  };

  const isMobile = props.variant === "mobile";
  const sweetsText = writeData.isThereSweets ? "yes" : "no";

  if (isMobile) {
    return (
      <li
        className={`list-group-item ${
          !writeData.isThereSweets ? "no-sweets" : ""
        }`}
      >
        <img src={spiderWebSrc} className="spiderweb-card" alt="Spiderweb" />
        <h6>Address: {writeData.address}</h6>
        <p className="card-text">
          Parent: {writeData.name} <br />
          {renderIntoleranceImage()}
          Is there sweets left: {sweetsText}
          <br />
          <button
            className="btn"
            onClick={() => props.onAddressChnage(writeData.id)}
            disabled={!writeData.isThereSweets}
          >
            Out of candy
          </button>
        </p>
      </li>
    );
  }

  return (
    <div
      className={`card col-md-2 mb-4 ms-2 ${
        !writeData.isThereSweets ? "no-sweets" : ""
      }`}
    >
      <img src={spiderWebSrc} className="spiderweb-card" alt="Spiderweb" />
      <div className="card-body">
        {isMobile ? null : (
          <h6 className="card-title">Address: {writeData.address}</h6>
        )}
        <p className="card-text">
          Parent: {writeData.name} <br />
          {renderIntoleranceImage()}
          Is there sweets left: {sweetsText}
          <br />
          <button
            className="btn"
            onClick={() => props.onAddressChnage(writeData.id)}
            disabled={!writeData.isThereSweets}
          >
            Out of candy
          </button>
        </p>
      </div>
    </div>
  );
}

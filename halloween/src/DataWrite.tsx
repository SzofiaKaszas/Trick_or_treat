import { useEffect, useState } from "react";
import type { DataItem, DataWriteItem } from "./interfaces";

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
  const spiderWebSrc =
    "https://wallpapers.com/images/hd/corner-spider-web-graphic-67wxs8wd96u33t8j.jpg";

  useEffect(() => {
    let intolerance = props.data.intolerances;

    switch (intolerance.trim()) {
      case "":
        intolerance = "none";
        break;
      case "gluten":
        intolerance = "https://www.svgrepo.com/show/443651/food-no-gluten.svg";
        break;
      case "lactose":
        intolerance = "https://www.svgrepo.com/show/509875/dairy-free.svg";
        break;
      case "peanut":
        intolerance =
          "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/peanuts-free-sign-outline-icon.png";
        break;
      case "soy":
        intolerance = "https://static.thenounproject.com/png/4652008-200.png";
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
        Intolerances: <img
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

  const Content = (
    <>
      <img src={spiderWebSrc} className="spiderweb-card" alt="Spiderweb" />
      {isMobile ? null : <h6 className="card-title">Address: {writeData.address}</h6>}
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
    </>
  );

  if (isMobile) {
    return (
      <li className={`list-group-item ${!writeData.isThereSweets ? "no-sweets" : ""}`}>
        {Content}
      </li>
    );
  }

  return (
    <div className={`card col-md-2 mb-4 ms-2 ${!writeData.isThereSweets ? "no-sweets" : ""}`}>
      <div className="card-body">{Content}</div>
    </div>
  );
}

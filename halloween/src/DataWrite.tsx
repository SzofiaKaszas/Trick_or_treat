import { useEffect, useState } from "react";
import type { DataItem, DataWriteItem } from "./interfaces";

export function DataWrite(props: {
  data: DataItem;
  onAddressChnage: (id: number) => void;
  variant: "desktop" | "mobile";
}) {
  const [writeData, setWriteData] = useState<DataWriteItem>({
    address: "",
    id: 0,
    intolerances: "",
    isThereSweets: "",
    name: "",
  });

  useEffect(() => {
    let intolerance = props.data.intolerances;
    if (intolerance.trim() === "") {
      intolerance = "none";
    }

    const newWriteData: DataWriteItem = {
      address: props.data.address,
      id: props.data.id,
      intolerances: intolerance,
      isThereSweets: props.data.isThereSweets ? "yes" : "no",
      name: props.data.name,
    };
    setWriteData(newWriteData);
  }, [props.data]);

  if (props.variant === "mobile") {
    return (
      <>
        {
          <li className="list-group-item">
            {writeData.address} - {writeData.name} - {writeData.intolerances} -{" "}
            {writeData.isThereSweets}
            <br />
            <button onClick={() => props.onAddressChnage(writeData.id)}>
              Out of candy
            </button>
          </li>
        }
      </>
    );
  }

  return (
    <>
      {
        <div className="card col-md-4 mb-4">
          <div className="card-body">
            <h5 className="card-title">{writeData.address}</h5>
            <p className="card-text">
              {writeData.name} - {writeData.intolerances} -{" "}
              {writeData.isThereSweets}
            </p>
            <button onClick={() => props.onAddressChnage(writeData.id)}>
              Out of candy
            </button>
          </div>
        </div>
      }
    </>
  );
}
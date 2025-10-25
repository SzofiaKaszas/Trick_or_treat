import { useEffect, useState } from "react";
import type { DataItem, DataWriteItem } from "./interfaces";

export function DataWrite(props: {
  data: DataItem;
  onAddressChnage: (id: number) => void;
}) {
  const [writeData, setWriteData] = useState<DataWriteItem>({
    address: "",
    id: 0,
    intolerances: "",
    isThereSweets: "",
    name: "",
  });

  useEffect(() => {
    const newWriteData: DataWriteItem = {
      address: props.data.address,
      id: props.data.id,
      intolerances: props.data.intolerances,
      isThereSweets: props.data.isThereSweets ? "yes" : "no",
      name: props.data.name,
    };
    setWriteData(newWriteData);
  }, [props.data]);

  return (
    <>
      {
        <div>
          <p>{writeData.name}</p>
          <p>{writeData.address}</p>
          <p>{writeData.intolerances}</p>
          <p>{writeData.isThereSweets}</p>
          <button onClick={() => props.onAddressChnage(writeData.id)}>Out of candy</button>
          <hr />
        </div>
      }
    </>
  );
}

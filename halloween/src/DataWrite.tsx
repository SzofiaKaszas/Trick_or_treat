import { useEffect, useState } from "react";
import type { DataItem, DataWriteItem } from "./interfaces";

export function DataWrite(props: { data: DataItem[] }) {
  const [writeData, setWriteData] = useState<DataWriteItem[]>([]);

  useEffect(() => {
    const newWriteData = props.data.map((element) => ({
      address: element.address,
      id: element.id,
      intolerances: element.intolerances,
      isThereSweets: element.isThereSweets ? "yes" : "no",
      name: element.name,
    }));
    setWriteData(newWriteData);
    },[props.data]);

  return (
    <>
      {writeData.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.address}</p>
          <p>{item.intolerances}</p>
          <p>{item.isThereSweets}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

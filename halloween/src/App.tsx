import { useEffect, useState } from "react";
import "./App.css";
import type { DataItem } from "./interfaces";
import { DataWrite } from "./DataWrite";
import { Summary } from "./Summary";
import { Footer } from "./Footer";

function App() {
  const [state, setState] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = "https://retoolapi.dev/uF2pCU/halloween";
    try {
      const response = await fetch(url);
      const result: DataItem[] = await response.json();
      setData(result);
      setState(true);
      console.log("data successfully fetched");
      console.log(result);
    } catch (error) {
      setState(false);
    }

    if (state) {
      console.log("data fetching failed");
    }
  }

  async function handleAddressChange(id: number) {
    try {
      await fetch(
        `https://retoolapi.dev/uF2pCU/halloween/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isThereSweets: false,
          }),
        }
      );
      
      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  return (
    <>
      {state ? (
        <>
          <Summary data={data}></Summary>
          {data.map((item) => (
            <DataWrite
              key={item.id}
              data={item}
              onAddressChnage={handleAddressChange}
            ></DataWrite>
          ))}
          <Footer></Footer>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}

export default App;

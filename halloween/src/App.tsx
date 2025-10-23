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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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

  return (
    <>
      {state ? (
        <>
          <Summary data={data}></Summary>
          <DataWrite data={data}></DataWrite>
          <Footer></Footer>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}

export default App;

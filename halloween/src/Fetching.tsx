import { useEffect, useState } from "react";
import type { DataItem } from "./interfaces";
import { DataWrite } from "./DataWrite";

export function Fetching() {
  const [state, setState] = useState("Loading...");
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
      const result : DataItem[] = await response.json();
      setData(result);
      setState("");
      console.log("data successfully fetched");
      console.log(result);
    } catch (error) {
      setState("Error fetching data");
    }
  }

  return <>{state}
  <DataWrite data={data}></DataWrite></>;
}

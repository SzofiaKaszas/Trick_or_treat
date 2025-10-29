import { useEffect, useState } from "react";
import type { DataItem } from "./interfaces";
import { DataWrite } from "./DataWrite";
import { Summary } from "./Summary";
import { Footer } from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [state, setState] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const handler = (e: any) => setIsDesktop(e.matches); // useeffect chatgpt-vel => https://chatgpt.com/share/690131bc-356c-8005-83b2-7b7cf998e6cd
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
      await fetch(`https://retoolapi.dev/uF2pCU/halloween/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isThereSweets: false,
        }),
      });

      await fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  return (
    <>
      {state ? (
        isDesktop ? (
          <>
          <Summary data={data}></Summary>
          <div className="container-fluid d-flex justify-content-around flex-wrap">
            <div className="row justify-content-center">
              {data.map((item) => (
                <DataWrite
                  key={item.id}
                  data={item}
                  onAddressChnage={handleAddressChange}
                  variant="desktop"
                ></DataWrite>
              ))}
            </div>
          </div>
          <Footer></Footer>
          </>
        ) : (
          <>
            <Summary data={data}></Summary>
            <ul className="list-group">
              {data.map((item) => (
                <DataWrite
                  key={item.id}
                  data={item}
                  onAddressChnage={handleAddressChange}
                  variant="mobile"
                ></DataWrite>
              ))}
            </ul>
            <Footer></Footer>
          </>
        )
      ) : (
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
}

export default App;

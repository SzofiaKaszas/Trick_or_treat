import type { DataItem } from "./interfaces";

export function Summary(props: { data: DataItem[] }) {
  let howManyWithSweets = 0;
  let howManyIntolerants = 0;

  props.data.forEach((address) => {
    if (address.isThereSweets) {
      howManyWithSweets++;
    }

    if (address.intolerances.trim() !== "" && address.isThereSweets) {
      howManyIntolerants++;
    }
  });
  return (
    <header>
      <div className="container-fluid">
        <div className="row text-center align-items-center">
          <div className="col nav-item">Houses: {props.data.length} </div>
          <div className="col nav-item">Has candy: {howManyWithSweets}</div>
          <div className="col nav-item">Can care for intolerants: {howManyIntolerants}</div>
        </div>
      </div>
    </header>
  );
}

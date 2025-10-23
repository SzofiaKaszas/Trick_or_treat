import type { DataItem } from "./interfaces";

export function Summary(props: { data: DataItem[] }) {
  let howManyWithSweets = 0;
  let howManyIntolerants = 0;

  props.data.forEach((address) => {
    if (address.isThereSweets) {
      howManyWithSweets++;
    }

    if (address.intolerances.trim() !== "") {
      howManyIntolerants++;
    }
  });
  return (
    <>
      There are this many houses: {props.data.length} <br />
      There's still candy: {howManyWithSweets}
      <br />
      There are this many places where food intolerances are taken care of:{" "}
      {howManyIntolerants}
    </>
  );
}

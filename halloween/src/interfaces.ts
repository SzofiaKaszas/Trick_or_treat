export interface DataItem {
  address: string;
  id: number;
  intolerances: string;
  isThereSweets: boolean;
  name: string;
}

export interface DataWriteItem {
  address: string;
  id: number;
  intolerances: string;
  isThereSweets: string;
  name: string;
}
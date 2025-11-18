// Interface for items
export interface Item {
  id: string;
  code: string;
  name: string;
  type: string;
}

// Dummy data for items
export const items: Item[] = [
  { id: "1", code: "001-024", name: "Waste Cart", type: "meal" },
  { id: "2", code: "001-025", name: "Ultra Light Single Cart", type: "meal" },
  { id: "3", code: "001-029", name: "Ultra Light Double Cart", type: "meal" },
  { id: "4", code: "001-030", name: "Standard Meal Cart", type: "meal" },
  { id: "5", code: "P-101", name: "Water Bottles (Case)", type: "provision" },
  { id: "6", code: "P-102", name: "Snack Box (24 ct)", type: "provision" },
  { id: "7", code: "P-103", name: "Soft Drinks (Assorted)", type: "provision" },
];

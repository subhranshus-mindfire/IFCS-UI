import { useState } from "react";

type PreparedBy = string;
type Item = {
  code: string;
  label: string;
  qty: number;
};

const preparedByList: PreparedBy[] = [
  "Commissary",
  "Kitchen",
  "Duty Free",
  "Meals",
];

const itemsList: Item[] = [
  { code: "CN031", label: "Purser Kit", qty: 2 },
  { code: "CN031", label: "Purser Kit", qty: 2 },
  { code: "CN031", label: "Purser Kit", qty: 2 },
  { code: "CN031", label: "Purser Kit", qty: 2 },
  { code: "CN031", label: "Purser Kit", qty: 2 },
  { code: "CN031", label: "Purser Kit", qty: 2 },
  { code: "CN031", label: "Purser Kit", qty: 2 },
];

const FlightGalleys = () => {
  const [selectedPrep, setSelectedPrep] = useState("Commissary");

  return (
    <div className="flex w-full gap-4 bg-bg-surface font-rubik">

      {/* LEFT SIDEBAR */}
      <div className="w-60 bg-[#FAF9FA] h-auto rounded-xl shadow-sm p-4 md:h-[60vh]">
        <h2 className="text-text-primary font-normal text-sm mb-3 border-b border-bg-secondary pb-3">
          Prepared by
        </h2>

        <div className="space-y-2">
          {preparedByList.map((prep, idx) => {
            const active = prep === selectedPrep;
            return (
              <button
                key={idx}
                onClick={() => setSelectedPrep(prep)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm 
                  ${active
                    ? "bg-bg-accent text-text-primary font-normal"
                    : "hover:bg-gray-100 text-text-muted"
                  }`}
              >
                {prep}
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 bg-white rounded-xl p-1 px-3">
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-700 font-normal text-sm">Items</h2>
          </div>
          <button className="underline text-text-secondary py-2 rounded-lg hover:bg-gray-300 text-sm">
            Show All
          </button>
        </div>

        <div className="border border-bg-secondary rounded-2xl overflow-hidden">
          <table className="w-full text-xs font-normal">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 border-b border-bg-secondary">
                <th className="py-3 px-4 text-left">Code</th>
                <th className="py-3 px-4 text-left">Label</th>
                <th className="py-3 px-4 text-left">Qty</th>
              </tr>
            </thead>

            <tbody>
              {itemsList.map((item, index) => (
                <tr key={index} className="border-b border-bg-secondary text-text-muted">
                  <td className="py-3 px-4">{item.code}</td>
                  <td className="py-3 px-4">{item.label}</td>
                  <td className="py-3 px-4 text-left">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlightGalleys;

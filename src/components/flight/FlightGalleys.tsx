import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 bg-bg-surface font-rubik">

      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-36 bg-bg-tertiary rounded-xl shadow-sm p-4">
        <h2 className="text-text-primary font-normal text-sm mb-3 border-b border-bg-secondary pb-3">
          Prepared by
        </h2>

        <div className="space-y-2">
          {isLoading ? (
            [...Array(4)].map((_, idx) => (
              <div key={idx} className="relative h-9 rounded-md bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            ))
          ) : (
            preparedByList.map((prep, idx) => {
              const active = prep === selectedPrep;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPrep(prep)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm border border-bg-secondary
                ${active
                      ? "bg-bg-accent text-text-primary font-normal border-bg-accent"
                      : "hover:bg-gray-100 text-text-muted"
                    }`}
                >
                  {prep}
                </button>
              );
            })
          )}
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
          <table className="w-full text-xs xl:text-sm font-normal">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 border-b border-bg-secondary">
                <th className="py-3 px-4 text-left">Code</th>
                <th className="py-3 px-4 text-left">Label</th>
                <th className="py-3 px-4 text-left">Qty</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(7)].map((_, idx) => (
                  <tr key={idx} className="border-b border-bg-secondary">
                    {[...Array(3)].map((_, cellIdx) => (
                      <td key={cellIdx} className="py-3 px-4">
                        <div className="relative h-4 w-full rounded bg-gray-200 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                itemsList.map((item, index) => (
                  <tr key={index} className="border-b border-bg-secondary text-text-muted">
                    <td className="py-3 px-4">{item.code}</td>
                    <td className="py-3 px-4">{item.label}</td>
                    <td className="py-3 px-4 text-left">{item.qty}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlightGalleys;

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesPacking } from "@fortawesome/free-solid-svg-icons";

type PreparedBy = string;
type Item = {
  code: string;
  label: string;
  qty: number;
};

const preparedByList: PreparedBy[] = [
  "Dry Stores",
  "Spare",
  "Bond Stores",
  "Tray Set Up",
];

const itemsList: Item[] = [
  { code: "CN007", label: "JC Headsets X12", qty: 2 },
  { code: "CN030", label: "Ice", qty: 2 },
  { code: "CT060", label: "B737 Holloware ISC-MEA", qty: 1 },
  { code: "CT059", label: "JC ISC - MEA NB Spare", qty: 1 },
  { code: "OV002", label: "JC Oven", qty: 1 },
  { code: "CN033", label: "JC Dry store NB", qty: 1 },
  { code: "CT107", label: "YC 2nd Service", qty: 1 },
  { code: "CT070", label: "WC 737 Bulk Food", qty: 1 },
  { code: "CT064", label: "JC 1st Service OB TSU", qty: 1 },
];

const FlightGalleys = () => {
  const [preparedBy] = useState(preparedByList);
  const [items] = useState(itemsList);

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-full bg-gray-200 gap-2 sm:gap-4 p-2 sm:p-4">
      <div className="w-full lg:w-72 rounded-xl bg-white shadow p-3 sm:p-4 order-2 lg:order-1">
        <h2 className="text-blue-400 font-semibold mb-3 text-sm sm:text-base">
          Prepared By:
        </h2>
        <div className="overflow-y-auto max-h-48 sm:max-h-64 lg:max-h-96 space-y-2">
          {preparedBy.map((prep, idx) => (
            <div
              key={idx}
              className="p-2 rounded-md shadow-sm border hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
            >
              {prep}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow p-3 sm:p-4 order-1 lg:order-2">
        <h2 className="text-blue-400 font-semibold mb-3 text-sm sm:text-base">
          Items
        </h2>
        <div className="overflow-y-auto max-h-64 sm:max-h-80 lg:max-h-96">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-full">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-left py-2 px-1 sm:px-2 whitespace-nowrap">
                    Code
                  </th>
                  <th className="text-left py-2 px-1 sm:px-2">Label</th>
                  <th className="text-right py-2 px-1 sm:px-2 whitespace-nowrap">
                    Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-1 sm:px-2 font-mono text-xs sm:text-sm whitespace-nowrap">
                      {item.code}
                    </td>
                    <td className="py-2 px-1 sm:px-2 text-xs sm:text-sm">
                      <div
                        className="truncate sm:whitespace-normal"
                        title={item.label}
                      >
                        {item.label}
                      </div>
                    </td>
                    <td className="py-2 px-1 sm:px-2 text-right text-xs sm:text-sm whitespace-nowrap">
                      {item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-48 flex flex-row lg:flex-col gap-2 sm:gap-3 order-3">
        <button className="flex-1 lg:w-full bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base">
          Show All
        </button>
        <button className="flex-1 lg:w-full flex items-center justify-center gap-2 bg-blue-400 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
          <FontAwesomeIcon
            icon={faBoxesPacking}
            className="text-sm sm:text-base"
          />
          <span className="hidden sm:inline">View Galleys</span>
          <span className="sm:hidden">Galleys</span>
        </button>
      </div>
    </div>
  );
};

export default FlightGalleys;

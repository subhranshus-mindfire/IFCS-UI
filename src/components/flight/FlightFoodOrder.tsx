import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faCogs } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { sampleFoodOrders } from "../../const/foodOrder";

function FlightFoodOrder() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePrint = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;
      const printWindow = window.open("", "", "width=900,height=650");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Food Orders</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f5f5f5; }
              </style>
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const filteredFoodOrders = sampleFoodOrders.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white w-full shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-bold text-gray-700">
          Food Orders: {filteredFoodOrders.length}
        </h2>
        <div className="flex flex-row items-center gap-4">
          <FontAwesomeIcon
            icon={faCogs}
            className="cursor-pointer text-red-500"
          />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FontAwesomeIcon icon={faPrint} />
            Print
          </button>
        </div>
      </div>

      {/* Scrollable Table */}
      <div ref={tableRef} className="overflow-x-auto">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-max w-full border border-gray-200 text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left">Station</th>
                <th className="px-3 py-2 text-left">FLT #</th>
                <th className="px-3 py-2 text-left">Seat #</th>
                <th className="px-3 py-2 text-left min-w-[140px]">
                  Passenger Name
                </th>
                <th className="px-3 py-2 text-left">SKU</th>
                <th className="px-3 py-2 text-left">Cabin</th>
                <th className="px-3 py-2 text-left min-w-[140px]">
                  <div className="flex flex-col gap-1">
                    <span>Name</span>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 text-center min-w-[100px]">Ordered</th>
                <th className="px-3 py-2 text-center min-w-[100px]">
                  Distributed
                </th>
                <th className="px-3 py-2 text-center min-w-[100px]">Loaded</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoodOrders.map((order, idx) => (
                <tr
                  key={idx}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-3 py-2">{order.station}</td>
                  <td className="px-3 py-2">{order.flight}</td>
                  <td className="px-3 py-2">{order.seat}</td>
                  <td className="px-3 py-2">{order.passenger}</td>
                  <td className="px-3 py-2">{order.sku}</td>
                  <td className="px-3 py-2">{order.cabin}</td>
                  <td className="px-3 py-2">{order.name}</td>
                  <td className="px-3 py-2 text-center">{order.ordered}</td>
                  <td className="px-3 py-2 text-center">{order.distributed}</td>
                  <td className="px-3 py-2 text-center">{order.loaded}</td>
                </tr>
              ))}
              {filteredFoodOrders.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlightFoodOrder;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { sampleFoodOrders } from "../../const/foodOrder";
import PrintIcon from "../../assets/icons/print.svg";
import AddIcon from "../../assets/icons/add.svg";
import { AddItemModal } from "./AddItemModal";

function FlightFoodOrder() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddItem = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveItems = (quantities: Record<string, number>) => {
    console.log("Saved Quantities:", quantities);
    setIsAddModalOpen(false);
  };

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
    <div className="bg-white w-full shadow rounded-lg p-4 font-rubik">
      <div className="font-rubik flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-base font-normal text-[#27262C]">
          Food Orders ({filteredFoodOrders.length})
        </h2>

        <div className="flex flex-row items-center gap-6 text-sm">
          <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition focus:outline-none">
            <img src={AddIcon} />
            <span className="underline font-normal">Add Dynamic Loading</span>
          </button>

          <button
            onClick={handleAddItem}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition focus:outline-none"
          >
            <img src={AddIcon} />
            <span className="underline font-normal">Add Item/PS</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition focus:outline-none"
          >
            <img src={PrintIcon} />
            <span className="underline font-normal">Print</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} className="overflow-x-auto">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-max w-full text-sm border-collapse">
            <thead className="bg-[#F0F0F0] text-[#3D3D3D] text-[14px] border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 text-left font-medium">Station</th>
                <th className="px-3 py-3 text-left font-medium">FLT #</th>
                <th className="px-3 py-3 text-left font-medium">Seat #</th>
                <th className="px-3 py-3 text-left font-medium min-w-[140px]">
                  Passenger Name
                </th>
                <th className="w-[20px]"></th>

                <th className="px-3 py-3 text-left font-medium">SKU</th>
                <th className="px-3 py-3 text-left font-medium">Cabin</th>

                <th className="px-3 py-3 text-left font-medium relative min-w-[140px]">
                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>Name</span>
                      <FontAwesomeIcon
                        icon={faFilter}
                        className="w-3 h-3 text-gray-400 hover:text-gray-600"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white shadow-sm transition-all"
                      style={{ width: "150px" }}
                    />
                  </div>
                </th>

                <th className="w-[20px]"></th>

                <th className="px-2 py-3 text-center font-medium min-w-[90px] border-l border-gray-200">
                  Ordered
                </th>
                <th className="px-2 py-3 text-center font-medium min-w-[90px]">
                  Distributed
                </th>
                <th className="px-2 py-3 text-center font-medium min-w-[90px]">
                  Loaded
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredFoodOrders.map((order, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b border-gray-100 last:border-b-0 text-[#7A7A7A] font-rubik"
                >
                  <td className="px-3 py-2 text-sm font-medium uppercase">
                    {order.station}
                  </td>
                  <td className="px-3 py-2 text-sm uppercase">
                    {order.flight}
                  </td>
                  <td className="px-3 py-2 text-sm uppercase">{order.seat}</td>
                  <td className="px-3 py-2 text-sm">{order.passenger}</td>
                  <td></td>
                  <td className="px-3 py-2 text-sm uppercase">{order.sku}</td>
                  <td className="px-3 py-2 text-sm uppercase">{order.cabin}</td>
                  <td className="px-3 py-2 text-sm">{order.name}</td>
                  <td></td>
                  <td className="px-2 py-2 text-center text-sm border-l border-gray-100">
                    {order.ordered}
                  </td>
                  <td className="px-2 py-2 text-center text-sm">
                    {order.distributed}
                  </td>
                  <td className="px-2 py-2 text-center text-sm">
                    {order.loaded}
                  </td>
                </tr>
              ))}

              {filteredFoodOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={13}
                    className="text-center py-4 text-gray-500 font-rubik"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <AddItemModal onClose={handleCloseModal} onSave={handleSaveItems} />
      )}
    </div>
  );
}

export default FlightFoodOrder;

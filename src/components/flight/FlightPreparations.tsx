import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faFilter,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { samplePreparations } from "../../const/samplePreparations";

function FlightPreparations() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setshowFilter] = useState(false);


  const filteredPreparations = samplePreparations.filter((p) =>
    p.preparedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;
      const printWindow = window.open("", "", "width=900,height=650");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Flight Preparations</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f5f5f5; }
                .no-print { display: none; }
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

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="font-rubik flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        {/* LEFT SIDE: Heading (as provided) */}
        <h2 className="text-base font-normal text-[#27262C]">
          Flight Preparation ({filteredPreparations.length})
        </h2>

        {/* RIGHT SIDE: Adjusted to match image_8f8924.png */}
        <div className="flex flex-row items-center gap-6 text-sm">

          {/* "Add New" Link */}
          <button
            // You might attach an onClick={handleAddNew} here
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="text-gray-500 text-lg" // Adjust size and color for the circular icon
            />
            <span className="underline font-normal">Add New</span>
          </button>

          {/* "Print" Link */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faPrint}
              className="text-gray-500 text-lg" // Adjust size and color for the circular icon
            />
            <span className="underline font-normal">Print</span>
          </button>

        </div>
      </div>

      {/* Table wrapper for horizontal scroll */}
      <div ref={tableRef} className="font-rubik overflow-x-auto rounded-lg border border-gray-100">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-max w-full text-sm border-collapse">
            <thead className="bg-[#F0F0F0] text-[#3D3D3D] text-[14px] border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 text-left font-medium">Stowage</th>
                <th className="px-3 py-3 text-left font-medium">Carrier</th>
                <th className="px-3 py-3 text-left font-medium">Equipment</th>
                <th className="px-3 py-3 text-left font-medium relative">
                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => setshowFilter(true)}
                    >
                      <span>Prepared By</span>
                      {/* Filter Icon */}
                      <FontAwesomeIcon icon={faFilter} className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </div>

                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 absolute top-0 left-30 mt-1 bg-white shadow-lg z-30 transition-all ${showFilter ? "block" : 'hidden'}`}
                      style={{ width: '150px' }}
                    />
                  </div>
                </th>
                <th className="px-3 py-3 text-left font-medium no-print min-w-[140px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPreparations.map((prep, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b border-gray-100 last:border-b-0 px-10 font-rubik text-[#7A7A7A]"
                >
                  <td className="px-3 py-2 text-sm font-medium uppercase">{prep.stowage}</td>
                  <td className="px-3 py-2 text-sm uppercase">{prep.carrier}</td>
                  <td className="px-3 py-2 text-sm uppercase">{prep.equipment}</td>
                  <td className="px-3 py-2 text-sm">{prep.preparedBy}</td>
                  <td className="px-3 py-2 flex justify-start gap-3 text-gray-600 no-print">

                  </td>
                </tr>
              ))}
              {/* ... (No results row) ... */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlightPreparations;

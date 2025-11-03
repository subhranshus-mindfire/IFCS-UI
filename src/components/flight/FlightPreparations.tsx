import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faCogs,
  faLock,
  faCheckCircle,
  faTruck,
  faInfoCircle,
  faQrcode,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { samplePreparations } from "../../const/samplePreparations";
import { flights } from "../../const/flightData";
import GalleyLabel from "../GalleyLabel";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

function FlightPreparations() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { flightNumber } = useParams<{ flightNumber: string }>();

  const filteredPreparations = samplePreparations.filter((p) =>
    p.preparedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const flight = flights.flat().find((f) => f.flightNumber === flightNumber);

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

  const handlePrintQr = (prep: (typeof samplePreparations)[0]) => {
    if (!flight) return;

    const labelHtml = ReactDOMServer.renderToString(
      <GalleyLabel preparation={prep} flight={flight} />
    );

    const printWindow = window.open("", "", "width=400,height=600");
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Galley Label</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: white; }
          </style>
        </head>
        <body>
          ${labelHtml}
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
      printWindow.document.close();
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-bold text-gray-700">
          Flight Preparation: {filteredPreparations.length}
        </h2>
        <div className="flex flex-row items-center gap-4">
          <FontAwesomeIcon
            icon={faCogs}
            className="cursor-pointer text-red-500"
          />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-400 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FontAwesomeIcon icon={faPrint} />
            Print
          </button>
        </div>
      </div>

      {/* Table wrapper for horizontal scroll */}
      <div ref={tableRef} className="overflow-x-auto">
        <div className="max-h-[50vh] overflow-y-auto">
          <table className="min-w-max w-full border border-gray-200 text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left">Stowage</th>
                <th className="px-3 py-2 text-left">Carrier</th>
                <th className="px-3 py-2 text-left">Equipment</th>
                <th className="px-3 py-2 text-left">
                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <span>Prepared By</span>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 text-center no-print min-w-[140px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPreparations.map((prep, idx) => (
                <tr
                  key={idx}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-3 py-2 font-medium">{prep.stowage}</td>
                  <td className="px-3 py-2">{prep.carrier}</td>
                  <td className="px-3 py-2">{prep.equipment}</td>
                  <td className="px-3 py-2">{prep.preparedBy}</td>
                  <td className="px-3 py-2 flex justify-center gap-3 text-gray-600 no-print">
                    <FontAwesomeIcon
                      icon={faQrcode}
                      className="cursor-pointer"
                      onClick={() => handlePrintQr(prep)}
                    />
                    <FontAwesomeIcon
                      icon={faBoxOpen}
                      className="cursor-pointer"
                    />
                    <FontAwesomeIcon icon={faLock} className="cursor-pointer" />
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="cursor-pointer text-green-500"
                    />
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="cursor-pointer text-blue-400"
                    />
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="cursor-pointer text-gray-500"
                    />
                  </td>
                </tr>
              ))}
              {filteredPreparations.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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

export default FlightPreparations;

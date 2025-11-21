import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { sampleFoodOrders } from "../../const/foodOrder";
import { AddItemModal } from "./AddItemModal";
import DynamicLoadingModal from "./AddDynamicLoadingModal";
import { AddIcon, PrintIcon } from "../../assets/icons";
import RedirectBtn from "../common/RedirectBtn";
import { PDFConfigModal } from "./PDFConfigModal";
import type { PDFConfig } from "../../types/Flight";
interface FlightFoodOrderProps {
  flightNumber: string;
}

function FlightFoodOrder({ flightNumber }: FlightFoodOrderProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddDynamicModalOpen, setIsDynamicAddModalOpen] = useState(false);
  const [isPDFConfigModalOpen, setIsPDFConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddItem = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  const handleOpenDynamicModal = () => setIsDynamicAddModalOpen(true);
  const handleCloseDynamicModal = () => setIsDynamicAddModalOpen(false);

  const handleSaveItems = (quantities: Record<string, number>) => {
    console.log("Saved Quantities:", quantities);
    setIsAddModalOpen(false);
  };

  // --- MODIFIED PRINT LOGIC ---
  const handlePrint = () => {
    // 1. Open the PDF Config Modal first
    setIsPDFConfigModalOpen(true);
  };
  const handleViewPDF = (config: PDFConfig) => {
    setIsPDFConfigModalOpen(false); // Close the config modal

    const params = new URLSearchParams({
      scale: config.scalePercentage,
      orientation: config.orientation,
    });

    window.open(
      `/meal-count-pdf/${flightNumber}?${params.toString()}`,
      '_blank'
    );
  };

  // const handleViewPDF = (config: PDFConfig) => {
  //   // 3. This function is called when 'View' is clicked in the PDFConfigModal
  //   setIsPDFConfigModalOpen(false); // Close the config modal

  //   // In a real application, you'd generate the PDF URL using the 'config' object (e.g., config.paperSize)
  //   // and then navigate/open it. 
  //   console.log("Printing with configuration:", config);

  //   // Using the legacy print method for demonstration purposes (you might need to adjust this)
  //   if (tableRef.current) {
  //     const printContents = tableRef.current.innerHTML;
  //     const printWindow = window.open("", "", "width=900,height=650");
  //     if (printWindow) {
  //       printWindow.document.write(`
  //         <html>
  //           <head>
  //             <title>Food Orders</title>
  //             <style>
  //               body { font-family: Arial, sans-serif; padding: 20px; }
  //               table { border-collapse: collapse; width: 100%; }
  //               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  //               th { background: #f5f5f5; }
  //               .no-print { display: none; }
  //             </style>
  //           </head>
  //           <body>
  //             ${printContents}
  //             <div class="no-print">
  //               -- Configuration used: ${JSON.stringify(config)} --
  //             </div>
  //           </body>
  //         </html>
  //       `);
  //       printWindow.document.close();
  //       // Delay print slightly to ensure content is rendered in the new window
  //       setTimeout(() => printWindow.print(), 100);
  //     }
  //   }
  // };
  // --- END MODIFIED PRINT LOGIC ---

  const filteredFoodOrders = sampleFoodOrders.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-bg-surface font-rubik">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-base font-normal text-text-primary">
          Food Orders ({filteredFoodOrders.length})
        </h2>

        <div className="flex flex-row items-center gap-6 text-sm">
          {/* Add Dynamic Loading */}
          <RedirectBtn
            icon={AddIcon}
            label={"Add Dynamic Loading"}
            handleClick={handleOpenDynamicModal}
          />
          <RedirectBtn
            icon={AddIcon}
            label={"Add Item/PS"}
            handleClick={handleAddItem}
          />
          <RedirectBtn
            icon={PrintIcon}
            label={"Print"}
            handleClick={handlePrint} // <-- This now opens the config modal
          />
        </div>
      </div>

      {/* Table Wrapper (unchanged) */}
      <div
        ref={tableRef}
        className="overflow-x-auto rounded-2xl border border-border-muted"
      >
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-max w-full text-sm border-collapse">
            {/* ... table content ... */}
            <thead className="bg-bg-secondary text-text-secondary text-[14px] border-b border-border-muted sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 text-left font-medium">Station</th>
                <th className="px-3 py-3 text-left font-medium">FLT #</th>
                <th className="px-3 py-3 text-left font-medium">Seat #</th>
                <th className="px-3 py-3 text-left font-medium min-w-[140px]">
                  Passenger Name
                </th>
                <th className="px-3 py-3 text-left font-medium">SKU</th>
                <th className="px-3 py-3 text-left font-medium">Cabin</th>
                <th className="px-3 py-3 text-left font-medium relative min-w-[140px]">
                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => setShowFilter(true)}
                    >
                      <span>Name</span>
                      <FontAwesomeIcon
                        icon={faFilter}
                        className="w-3 h-3 text-text-tertiary hover:text-text-secondary"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full px-2 py-1 text-xs border border-border-muted rounded focus:outline-none focus:ring-1 focus:ring-bg-button absolute top-6 bg-bg-surface shadow-lg z-30 transition-all ${showFilter ? "block" : "hidden"
                        }`}
                      style={{ width: "150px" }}
                    />
                  </div>
                </th>
                <th className="px-2 py-3 text-center font-medium border-l border-border-muted">
                  Ordered
                </th>
                <th className="px-2 py-3 text-center font-medium">
                  Distributed
                </th>
                <th className="px-2 py-3 text-center font-medium">Left Over</th>
                <th className="px-2 py-3 text-center font-medium">Cons %</th>
              </tr>

              <tr className="bg-bg-surface font-medium text-text-primary">
                <td
                  colSpan={7}
                  className="px-3 py-2 text-text-tertiary text-right"
                >
                  Total
                </td>
                <td className="px-2 py-2 text-center border-l border-border-muted">
                  {filteredFoodOrders.reduce(
                    (sum, item) => sum + (item.ordered || 0),
                    0
                  )}
                </td>
                <td className="px-2 py-2 text-center">
                  {filteredFoodOrders.reduce(
                    (sum, item) => sum + (item.distributed || 0),
                    0
                  )}
                </td>
                <td className="px-2 py-2 text-center">
                  {filteredFoodOrders.reduce(
                    (sum, item) => sum + (item.loaded || 0),
                    0
                  )}
                </td>
                <td className="px-2 py-2 text-center">0%</td>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(6)].map((_, idx) => (
                  <tr key={idx} className="border-b border-border-muted">
                    {[...Array(10)].map((_, cellIdx) => (
                      <td key={cellIdx} className="px-3 py-2">
                        <div className="relative h-4 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))) :
                filteredFoodOrders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="bg-bg-surface border-b border-border-muted last:border-b-0 text-text-muted hover:bg-bg-accent/20 transition"
                  >
                    <td className="px-3 py-2 text-sm font-medium uppercase">
                      {order.station}
                    </td>
                    <td className="px-3 py-2 text-sm uppercase">
                      {order.flight}
                    </td>
                    <td className="px-3 py-2 text-sm uppercase">{order.seat}</td>
                    <td className="px-3 py-2 text-sm">{order.passenger}</td>
                    <td className="px-3 py-2 text-sm uppercase">{order.sku}</td>
                    <td className="px-3 py-2 text-sm uppercase">{order.cabin}</td>
                    <td className="px-3 py-2 text-sm">{order.name}</td>
                    <td className="px-2 py-2 text-center text-sm border-l border-border-muted">
                      {order.ordered}
                    </td>
                    <td className="px-2 py-2 text-center text-sm">
                      {order.distributed}
                    </td>
                    <td className="px-2 py-2 text-center text-sm">
                      {order.loaded}
                    </td>
                    <td className="px-2 py-2 text-center text-sm">0%</td>
                  </tr>
                ))}

              {filteredFoodOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-4 text-text-tertiary font-rubik"
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
      {isAddDynamicModalOpen && (
        <DynamicLoadingModal onClose={handleCloseDynamicModal} />
      )}

      {/* 4. Render PDFConfigModal when state is true */}
      {isPDFConfigModalOpen && (
        <PDFConfigModal
          // Note: flightNumber is not available in FlightFoodOrder context, using a placeholder.
          // You might need to fetch the actual flight number if this component is used outside a row context.
          flightNumber="FLTXXX"
          onClose={() => setIsPDFConfigModalOpen(false)}
          onView={handleViewPDF} // <-- Pass the new handler
        />
      )}
    </div>
  );
}

export default FlightFoodOrder;
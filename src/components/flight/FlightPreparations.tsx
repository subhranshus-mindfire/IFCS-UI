import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { samplePreparations } from "../../const/samplePreparations";
import First from "../../assets/logos/preparation/first.svg";
import Second from "../../assets/logos/preparation/Second.png";
import Third from "../../assets/logos/preparation/third.png";
import Fourth from "../../assets/logos/preparation/forth.png";
import Fifth from "../../assets/logos/preparation/fifth.png";
import Sixth from "../../assets/logos/preparation/sixth.png";
import Seventh from "../../assets/logos/preparation/seventh.png";
import DynamicLoadingModal from "./AddDynamicLoadingModal";
import { FlightPreparationDetailsModal } from "./FlightPreparationDetailsModal";
import RedirectBtn from "../common/RedirectBtn";
import { AddIcon, PrintIcon } from "../../assets/icons";

function FlightPreparations() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setshowFilter] = useState(false);

  const [isFlightPrepModalOpen, setisFlightPrepModalOpen] = useState(false);
  const [isFlightPrepaDetailsModal, setIsFlightPrepDetailsModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenFlightPrepModal = () => setisFlightPrepModalOpen(true);
  const handleCloseFlightPrepModal = () => setisFlightPrepModalOpen(false);

  const handleOpenFlightPrepDetailsModal = () =>
    setIsFlightPrepDetailsModal(true);
  const handleCloseFlightPrepDetailsModal = () =>
    setIsFlightPrepDetailsModal(false);

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
    <div className="bg-bg-surface">
      {/* Header */}
      <div className="font-rubik flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-base font-normal text-text-primary">
          Flight Preparation ({filteredPreparations.length})
        </h2>

        <div className="flex flex-row items-center gap-6 text-sm">
          <RedirectBtn
            icon={AddIcon}
            label={"Add New"}
            handleClick={handleOpenFlightPrepModal}
          />
          <RedirectBtn
            icon={PrintIcon}
            label={"Print"}
            handleClick={handlePrint}
          />
        </div>
      </div>

      {/* Table wrapper */}
      <div
        ref={tableRef}
        className="font-rubik overflow-x-auto rounded-2xl border border-border-muted"
      >
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-max w-full text-sm border-collapse">
            <thead className="bg-bg-secondary text-text-primary text-[14px] border-b border-border-muted sticky top-0 z-10">
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
                      className={`w-full px-2 py-1 text-xs border border-border-muted rounded focus:outline-none focus:ring-1 focus:ring-bg-accent absolute top-0 left-30 mt-1 bg-bg-surface shadow-lg z-30 transition-all ${showFilter ? "block" : "hidden"
                        }`}
                      style={{ width: "150px" }}
                    />
                  </div>
                </th>
                <th className="px-3 py-3 text-left font-medium no-print min-w-[140px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, idx) => (
                  <tr key={idx} className="border-b border-border-muted">
                    {[...Array(5)].map((_, cellIdx) => (
                      <td key={cellIdx} className="px-3 py-2">
                        <div className="relative h-4 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (

                filteredPreparations.map((prep, idx) => (
                  <tr
                    key={idx}
                    className="bg-bg-surface border-b border-border-muted last:border-b-0 px-10 font-rubik text-text-muted"
                  >
                    <td className="px-3 py-2 text-sm font-medium uppercase text-text-secondary">
                      {prep.stowage}
                    </td>
                    <td className="px-3 py-2 text-sm uppercase text-text-secondary">
                      {prep.carrier}
                    </td>
                    <td className="px-3 py-2 text-sm uppercase text-text-secondary">
                      {prep.equipment}
                    </td>
                    <td className="px-3 py-2 text-sm text-text-secondary">
                      {prep.preparedBy}
                    </td>
                    <td className="px-3 py-2 flex justify-between gap-3 text-text-tertiary no-print">
                      <img src={First} alt="" className="w-4 h-4" />
                      <img src={Second} alt="" />
                      <img src={Third} alt="" />
                      <img src={Fourth} alt="" />
                      <img src={Fifth} alt="" />
                      <img src={Sixth} alt="" />
                      <img
                        src={Seventh}
                        alt="Open modal"
                        onClick={handleOpenFlightPrepDetailsModal}
                        className="cursor-pointer hover:scale-110 transition-transform duration-150"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFlightPrepModalOpen && (
        <DynamicLoadingModal onClose={handleCloseFlightPrepModal} />
      )}
      {isFlightPrepaDetailsModal && (
        <FlightPreparationDetailsModal
          onClose={handleCloseFlightPrepDetailsModal}
          open={false}
        />
      )}
    </div>
  );
}

export default FlightPreparations;

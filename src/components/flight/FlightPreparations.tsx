import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { samplePreparations } from "../../const/samplePreparations";
import DynamicLoadingModal from "./AddDynamicLoadingModal";
import { FlightPreparationDetailsModal } from "./FlightPreparationDetailsModal";
import RedirectBtn from "../common/RedirectBtn";
import {
  AddIcon,
  PrintIcon,
  PrepArchive,
  PrepSignatureIcon,
  PrepLockKeyIcon,
  PrepCheckIcon,
  PrepTruckIcon,
  PrepInfoIcon,
  PrepQRIcon
} from "../../assets/icons";
import { PromptModal } from "./PromptModal";

// Define types for completed actions
type CompletedActionsState = {
  [key: string]: number[];
};

interface PromptModalState {
  isOpen: boolean;
  rowIndex: number | null;
  actionIndex: number | null;
  actionName: string;
  isBlocked: boolean;
  isCompleted: boolean;
}

function FlightPreparations() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilter, setshowFilter] = useState<boolean>(false);

  const [isFlightPrepModalOpen, setisFlightPrepModalOpen] = useState<boolean>(false);
  const [isFlightPrepaDetailsModal, setIsFlightPrepDetailsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Track completed actions for each row
  const [completedActions, setCompletedActions] = useState<CompletedActionsState>({});

  // Modal state
  const [promptModal, setPromptModal] = useState<PromptModalState>({
    isOpen: false,
    rowIndex: null,
    actionIndex: null,
    actionName: "",
    isBlocked: false,
    isCompleted: false
  });

  const actionNames: string[] = [
    "Scan Action",
    "Preparation Action",
    "Seal Action",
    "Lock Action",
    "Verify Action",
    "Delivery Action"
  ];


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenFlightPrepModal = () => setisFlightPrepModalOpen(true);
  const handleCloseFlightPrepModal = () => setisFlightPrepModalOpen(false);

  const handleOpenFlightPrepDetailsModal = () => setIsFlightPrepDetailsModal(true);
  const handleCloseFlightPrepDetailsModal = () => setIsFlightPrepDetailsModal(false);

  const handleIconClick = (rowIndex: number, stepIndex: number, actionLabel: string) => {
    const rowKey = `row-${rowIndex}`;
    const completedForRow = completedActions[rowKey] || [];

    const isCompleted = completedForRow.includes(stepIndex);

    if (isCompleted) {
      setPromptModal({
        isOpen: true,
        rowIndex,
        actionIndex: stepIndex,
        actionName: actionLabel,
        isBlocked: false,
        isCompleted: true
      });
      return;
    }

    if (stepIndex > 0 && !completedForRow.includes(stepIndex - 1)) {
      setPromptModal({
        isOpen: true,
        rowIndex,
        actionIndex: stepIndex,
        actionName: actionLabel,
        isBlocked: true,
        isCompleted: false
      });
      return;
    }

    // Show confirmation modal
    setPromptModal({
      isOpen: true,
      rowIndex,
      actionIndex: stepIndex,
      actionName: actionLabel,
      isBlocked: false,
      isCompleted: false
    });
  };

  const handleConfirm = () => {
    const { rowIndex, actionIndex, isCompleted } = promptModal;

    if (rowIndex === null || actionIndex === null) return;

    const rowKey = `row-${rowIndex}`;

    if (isCompleted) {
      setCompletedActions(prev => ({
        ...prev,
        [rowKey]: (prev[rowKey] || []).filter(idx => idx < actionIndex)
      }));
    } else {
      setCompletedActions(prev => ({
        ...prev,
        [rowKey]: [...(prev[rowKey] || []), actionIndex]
      }));
    }

    setPromptModal({
      isOpen: false,
      rowIndex: null,
      actionIndex: null,
      actionName: "",
      isBlocked: false,
      isCompleted: false
    });
  };

  const handleClose = () => {
    setPromptModal({
      isOpen: false,
      rowIndex: null,
      actionIndex: null,
      actionName: "",
      isBlocked: false,
      isCompleted: false
    });
  };

  const isActionCompleted = (rowIndex: number, actionIndex: number): boolean => {
    const rowKey = `row-${rowIndex}`;
    return (completedActions[rowKey] || []).includes(actionIndex);
  };

  const isActionDisabled = (rowIndex: number, actionIndex: number): boolean => {
    if (actionIndex === 0) return false;
    const rowKey = `row-${rowIndex}`;
    const completedForRow = completedActions[rowKey] || [];
    return !completedForRow.includes(actionIndex) && !completedForRow.includes(actionIndex - 1);
  };

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

  const actionIcons = [
    PrepQRIcon,
    PrepArchive,
    PrepSignatureIcon,
    PrepLockKeyIcon,
    PrepCheckIcon,
    PrepTruckIcon
  ];

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
                    <td className="px-3 py-2 flex justify-between gap-2 text-text-tertiary no-print">
                      {actionIcons.map((Icon, actionIdx) => {
                        const completed = isActionCompleted(idx, actionIdx);
                        const disabled = isActionDisabled(idx, actionIdx);
                        return (
                          <span title={`${actionNames[actionIdx]}${completed
                            ? " (Completed - Click to uncheck)"
                            : disabled
                              ? " (Locked)"
                              : ""
                            }`}>
                            <Icon key={actionIdx} color="#008000"
                              className={`w-6 h-6 cursor-pointer transition-all duration-150 ${disabled
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:scale-110"
                                } ${completed ? "fill-green-600 stroke-green-600" : "fill-text-primary stroke-text-primary"}`}
                              onClick={() =>
                                handleIconClick(idx, actionIdx, actionNames[actionIdx])
                              }
                            />
                          </span>

                        )
                      })}
                      <PrepInfoIcon
                        onClick={handleOpenFlightPrepDetailsModal}
                        className="cursor-pointer hover:scale-110 transition-transform duration-150 w-6 h-6 fill-text-primary stroke-text-primary"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {
        isFlightPrepModalOpen && (
          <DynamicLoadingModal onClose={handleCloseFlightPrepModal} />
        )
      }
      {
        isFlightPrepaDetailsModal && (
          <FlightPreparationDetailsModal
            onClose={handleCloseFlightPrepDetailsModal}
            open={false}
          />
        )
      }
      <PromptModal
        isOpen={promptModal.isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        actionName={promptModal.actionName}
        isBlocked={promptModal.isBlocked}
        isCompleted={promptModal.isCompleted}
      />
    </div >
  );
}

export default FlightPreparations;
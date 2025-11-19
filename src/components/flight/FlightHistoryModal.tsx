// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faXmark,
//   faChevronDown,
//   faChevronUp,
// } from "@fortawesome/free-solid-svg-icons";
// import { flightHistoryData } from "../../const/flightData";

// interface FlightHistoryModalProps {
//   flightNumber: string;
//   onClose: () => void;
// }

// export const FlightHistoryModal: React.FC<FlightHistoryModalProps> = ({
//   flightNumber,
//   onClose,
// }) => {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
//   const historyEntries = flightHistoryData[flightNumber] || [];

//   const toggleExpand = (index: number) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
//       <div className="bg-white rounded-lg shadow-md w-full max-w-xl max-h-[80vh] flex flex-col text-sm">
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//           <h2 className="text-base font-semibold text-text-primary">
//             Flight {flightNumber}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-text-secondary hover:text-text-tertiary transition-colors"
//           >
//             <FontAwesomeIcon icon={faXmark} size="sm" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto px-4 py-3">
//           <h3 className="text-sm font-semibold text-text-primary mb-3">
//             Flight Changes Timeline
//           </h3>

//           {/* Timeline */}
//           <div className="relative">
//             {historyEntries.map((entry, index) => (
//               <div key={index} className="relative pb-5 last:pb-0">
//                 {/* Timeline line */}
//                 {index < historyEntries.length - 1 && (
//                   <div className="absolute left-3 top-5 bottom-0 w-0.5 bg-gray-300" />
//                 )}

//                 <div className="flex gap-3">
//                   {/* Timeline dot */}
//                   <div className="relative z-10">
//                     <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300" />
//                   </div>

//                   {/* Entry content */}
//                   <div className="flex-1">
//                     <div className="text-xs text-text-tertiary mb-0.5">
//                       {entry.timestamp}
//                     </div>

//                     <button
//                       onClick={() => toggleExpand(index)}
//                       className="flex items-center gap-1.5 text-bg-button hover:text-bg-button-text-hover font-medium transition-colors text-sm"
//                     >
//                       <span>{entry.label}</span>
//                       <FontAwesomeIcon
//                         icon={
//                           expandedIndex === index ? faChevronUp : faChevronDown
//                         }
//                         className="text-xs"
//                       />
//                     </button>

//                     {/* Expanded table */}
//                     {expandedIndex === index && (
//                       <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
//                         <table className="w-full text-xs">
//                           <thead>
//                             <tr className="bg-gray-100">
//                               <th className="px-3 py-1.5 text-left font-semibold text-text-primary border-r border-gray-200">
//                                 FIELD
//                               </th>
//                               <th className="px-3 py-1.5 text-left font-semibold text-text-primary border-r border-gray-200">
//                                 PREVIOUS
//                               </th>
//                               <th className="px-3 py-1.5 text-left font-semibold text-text-primary">
//                                 NOW
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {entry.changes.map((change, changeIndex) => (
//                               <tr
//                                 key={changeIndex}
//                                 className="border-t border-gray-200 hover:bg-gray-50"
//                               >
//                                 <td className="px-3 py-1.5 font-medium text-text-primary border-r border-gray-200">
//                                   {change.field}
//                                 </td>
//                                 <td className="px-3 py-1.5 text-red border-r border-gray-200">
//                                   {change.previously}
//                                 </td>
//                                 <td className="px-3 py-1.5 text-green font-medium">
//                                   {change.now}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end px-4 py-3 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="px-4 py-1.5 bg-bg-button-gray hover:bg-bg-button-gray-hover text-text-secondary rounded-md transition-colors font-medium text-sm"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/components/FlightHistoryModal.tsx

import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { generateHistoryDisplay } from "../../utils/flightHistoryUtils";
import { useFlightHistoryStore } from "../../store/flightHistory";
import type { HistoryEntryDisplay } from "../../types/Flight";

// Helper to format ISO string to just the Date part (as seen in screenshot)
const formatDate = (isoString: string | undefined): string | null => {
  if (!isoString) return null;
  try {
    return new Date(isoString).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  } catch {
    return null;
  }
};


interface FlightHistoryModalProps {
  flightNumber: string;
  onClose: () => void;
}

export const FlightHistoryModal: React.FC<FlightHistoryModalProps> = ({
  flightNumber,
  onClose,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Start with the first entry expanded

  const { rawHistory, isLoading, fetchFlightHistory, error } = useFlightHistoryStore();

  useEffect(() => {
    fetchFlightHistory(flightNumber);
  }, [flightNumber, fetchFlightHistory]);

  const historyEntries: HistoryEntryDisplay[] = useMemo(() => {
    if (rawHistory.length === 0) return [];
    return generateHistoryDisplay(rawHistory);
  }, [rawHistory]);


  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const firstEntry = rawHistory.length > 0 ? rawHistory[0] : null;
  const updateDate = formatDate(firstEntry?.scheduledDeparture);
  const sourceFile = firstEntry?.SourceFileName;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
        <div className="bg-white rounded-lg shadow-md w-full max-w-xl p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-gray-200 border-t-bg-button rounded-full animate-spin"></div>

            {/* Text */}
            <p className="text-gray-600 text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || historyEntries.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
        <div className="bg-white rounded-lg shadow-md w-full max-w-xl max-h-[80vh] flex flex-col p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-base font-semibold text-text-primary">Flight {flightNumber} History</h2>
            <button onClick={onClose}><FontAwesomeIcon icon={faXmark} size="sm" /></button>
          </div>
          <p className="text-center py-4 text-red-500">{error || `No history records found for this flight.`}</p>
          <div className="flex justify-end pt-2 border-t">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-bg-button-gray hover:bg-bg-button-gray-hover text-text-secondary rounded-md transition-colors font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-md w-full max-w-xl max-h-[80vh] flex flex-col text-sm">

        {/* Header - Custom Header with Date and File Name */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-text-primary">
              Flight {flightNumber} History
            </h2>
            <div className="text-xs text-text-tertiary">
              {updateDate}
              {sourceFile && <span className="ms-1">| Source: {sourceFile}</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-tertiary transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            Flight Changes Timeline
          </h3>

          {/* Timeline */}
          <div className="relative">
            {historyEntries.map((entry, index) => (
              <div key={index} className="relative pb-5 last:pb-0">
                {/* Timeline line */}
                {index < historyEntries.length - 1 && (
                  <div className="absolute left-3 top-5 bottom-0 w-0.5 bg-gray-300" />
                )}

                <div className="flex gap-3">
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300" />
                  </div>

                  {/* Entry content */}
                  <div className="flex-1">
                    <div className="text-xs text-text-tertiary mb-0.5">
                      {entry.timestamp}
                    </div>

                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-1.5 text-bg-button hover:text-bg-button-text-hover font-medium transition-colors text-sm"
                    >
                      <span>{entry.label}</span>
                      <FontAwesomeIcon
                        icon={
                          expandedIndex === index ? faChevronUp : faChevronDown
                        }
                        className="text-xs"
                      />
                    </button>

                    {/* Expanded table */}
                    {expandedIndex === index && entry.changes.length > 0 && (
                      <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-3 py-1.5 text-left font-semibold text-text-primary border-r border-gray-200">
                                FIELD
                              </th>
                              <th className="px-3 py-1.5 text-left font-semibold text-text-primary border-r border-gray-200">
                                PREVIOUS
                              </th>
                              <th className="px-3 py-1.5 text-left font-semibold text-text-primary">
                                NOW
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {entry.changes.map((change, changeIndex) => (
                              <tr
                                key={changeIndex}
                                className="border-t border-gray-200 hover:bg-gray-50"
                              >
                                <td className="px-3 py-1.5 font-medium text-text-primary border-r border-gray-200">
                                  {change.field}
                                </td>
                                <td className="px-3 py-1.5 text-red border-r border-gray-200">
                                  {change.previously}
                                </td>
                                <td className="px-3 py-1.5 text-green font-medium">
                                  {change.now}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {expandedIndex === index && entry.changes.length === 0 && (
                      <div className="mt-2 text-xs text-text-secondary italic">
                        No meaningful fields were changed in this update.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-bg-button-gray hover:bg-bg-button-gray-hover text-text-secondary rounded-md transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { flightHistoryData } from "../../const/flightData";

interface FlightHistoryModalProps {
  flightNumber: string;
  onClose: () => void;
}

export const FlightHistoryModal: React.FC<FlightHistoryModalProps> = ({
  flightNumber,
  onClose,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const historyEntries = flightHistoryData[flightNumber] || [];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-md w-full max-w-xl max-h-[80vh] flex flex-col text-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">
            Flight {flightNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
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
                    <div className="text-xs text-gray-500 mb-0.5">
                      {entry.timestamp}
                    </div>

                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
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
                    {expandedIndex === index && (
                      <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-3 py-1.5 text-left font-semibold text-gray-800 border-r border-gray-200">
                                FIELD
                              </th>
                              <th className="px-3 py-1.5 text-left font-semibold text-gray-800 border-r border-gray-200">
                                PREVIOUS
                              </th>
                              <th className="px-3 py-1.5 text-left font-semibold text-gray-800">
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
                                <td className="px-3 py-1.5 font-medium text-gray-900 border-r border-gray-200">
                                  {change.field}
                                </td>
                                <td className="px-3 py-1.5 text-red-600 border-r border-gray-200">
                                  {change.previously}
                                </td>
                                <td className="px-3 py-1.5 text-green-600 font-medium">
                                  {change.now}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

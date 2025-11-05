import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faUsers,
  faPlaneDeparture,
  faPlaneCircleCheck,
  faBoltLightning,
} from "@fortawesome/free-solid-svg-icons";
import { flights } from "../../const/flightData";
import FlightHeader from "../../components/flight/FlightListHeader";
import { AddFlightModal } from "../../components/flight/AddFlightModal";
import { FlightHistoryModal } from "../../components/flight/FlightHistoryModal";
import { FlightRow } from "../../components/flight/FlightRow";

const FlightList: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedFlightNumber, setSelectedFlightNumber] = useState<string>("");

  const handleAddFlight = () => setShowAddModal(true);
  const handleShowHistory = (flightNumber: string) => {
    setSelectedFlightNumber(flightNumber);
    setShowHistoryModal(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 font-arial overflow-hidden">
      <FlightHeader onAddFlight={handleAddFlight} />

      {showAddModal && (
        <AddFlightModal onClose={() => setShowAddModal(false)} />
      )}
      {showHistoryModal && (
        <FlightHistoryModal
          flightNumber={selectedFlightNumber}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {/* Table container with horizontal scroll */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse bg-white min-w-[1300px]">
          <thead className="bg-black text-white sticky top-0 z-10">
            <tr className="text-xs font-semibold border-b border-gray-600">
              <th className="w-10"></th>
              <th className="w-24"></th>
              <th className="w-16">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    className="text-sm"
                  />
                  <span>Flight</span>
                </div>
              </th>
              <th className="w-10"></th>
              <th className="w-20"></th>
              <th className="w-16"></th>
              <th className="w-16"></th>
              <th className="w-20"></th>
              <th className="w-36">
                <div className="flex items-center py-2 justify-center gap-1">
                  <FontAwesomeIcon icon={faPlaneCircleCheck} />
                  <span>Aircraft</span>
                </div>
              </th>
              <th className="w-36">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={faClipboardList} />
                  <span>Plans</span>
                </div>
              </th>
              <th className="w-16"></th>
              <th className="w-72">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={faUsers} />
                  <span className="text-left pl-5">PAX</span>
                </div>
              </th>
              <th className="w-48">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={faBoltLightning} />
                  <span>Status</span>
                </div>
              </th>
            </tr>
            <tr className="bg-[#9A9A9A] text-left text-black text-[10px] font-extralight border-b border-gray-400">
              <th className="font-extralight">Airline</th>
              <th className="font-extralight">Route</th>
              <th className="font-extralight">Flight #</th>
              <th className="font-extralight">Type</th>
              <th className="font-extralight">Date</th>
              <th className="font-extralight">Departure</th>
              <th className="font-extralight">Arrival</th>
              <th className="font-extralight">Status</th>
              <th className="text-center font-extralight">AC Type/AC Reg</th>
              <th className="font-extralight">Loading plan / Meal plan</th>
              <th className="text-center font-extralight">Total</th>
              <th className="text-center font-extralight">Cabins</th>
              <th className="font-extralight"></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((pair, idx) => (
              <React.Fragment key={idx}>
                {pair.map((flight, subIdx) => (
                  <FlightRow
                    key={`${idx}-${subIdx}`}
                    flight={flight}
                    onShowHistory={handleShowHistory}
                  />
                ))}
                {idx < flights.length - 1 && (
                  <tr>
                    <td colSpan={13} className="h-7"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-400 h-8 flex items-center px-4">
        <span className="text-xs text-white font-semibold">
          Galley X Planner
        </span>
      </div>
    </div>
  );
};

export default FlightList;

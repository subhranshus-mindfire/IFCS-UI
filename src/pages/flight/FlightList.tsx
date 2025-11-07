import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faUsers,
  faPlaneDeparture,
  faPlaneCircleCheck,
  faBoltLightning,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { flights } from "../../const/flightData";
import FlightHeader from "../../components/flight/FlightListHeader";
import { AddFlightModal } from "../../components/flight/AddFlightModal";
import { FlightHistoryModal } from "../../components/flight/FlightHistoryModal";
import { FlightRow } from "../../components/flight/FlightRow";
import { useNavigate } from "react-router-dom";

const FlightList: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedFlightNumber, setSelectedFlightNumber] = useState<string>("");
  const navigate = useNavigate();
  const handleAddFlight = () => setShowAddModal(true);
  const handleShowHistory = (flightNumber: string) => {
    setSelectedFlightNumber(flightNumber);
    setShowHistoryModal(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 font-arial overflow-hidden">
      <FlightHeader
        onBack={() => navigate("/dashboard")}
        onAddFlight={handleAddFlight}
      />

      {showAddModal && (
        <AddFlightModal onClose={() => setShowAddModal(false)} />
      )}
      {showHistoryModal && (
        <FlightHistoryModal
          flightNumber={selectedFlightNumber}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse bg-white min-w-[1400px]">
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
              <th className="w-20">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={faClock} />
                  <span>Ground Time</span>
                </div>
              </th>
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
            <tr className="bg-bg-secondary text-left text-sm text-blackfont-extralight border-b border-gray-400">
              <th className="text-text-tertiary">Airline</th>
              <th className="text-text-tertiary">Route</th>
              <th className="text-text-tertiary">Flight #</th>
              <th className="text-text-tertiary">Type</th>
              <th className="text-text-tertiary">Date</th>
              <th className="text-text-tertiary">Departure</th>
              <th className="text-text-tertiary">Arrival</th>
              <th className="text-text-tertiary">Status</th>
              <th className="text-center text-text-tertiary">Ground Time</th>
              <th className="text-center text-text-tertiary">AC Type/AC Reg</th>
              <th className="text-text-tertiary">Loading plan / Meal plan</th>
              <th className="text-center text-text-tertiary">Total</th>
              <th className="text-center text-text-tertiary">Cabins</th>
              <th className="text-text-tertiary"></th>
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
                    <td colSpan={14} className="h-7"></td>
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

import React, { useState } from "react";
import { flights } from "../../const/flightData";
import FlightHeader from "../../components/flight/FlightListHeader";
import { AddFlightModal } from "../../components/flight/AddFlightModal";
import { FlightHistoryModal } from "../../components/flight/FlightHistoryModal";
import { FlightRow } from "../../components/flight/FlightRow";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  AirplaneFlightIcon,
  AirplaneIcon,
  PlansIcon,
  SeatIcon,
  StatusIcon,
} from "../../assets/icons";

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
    <div className="w-full h-screen flex flex-col bg-gray-100 font-arial">
      <Navbar onMenuClick={() => {}} />
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
        <table className="w-full border-collapse bg-white min-w-[1600px]">
          <thead
            className="sticky top-0 z-10 bg-bg-tertiary text-text-secondary"
            style={{
              // This shadow creates the BOTTOM border of the whole header
              boxShadow: "0 2px 0 0 rgb(75 85 99)",
            }}
          >
            {/* First header row (REMOVED the style prop) */}
            <tr className="text-sm font-semibold">
              <th colSpan={8} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={AirplaneFlightIcon} />
                  <span>Flight</span>
                </div>
                {/* Vertical separator */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th colSpan={2} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={AirplaneIcon} />
                  <span>Aircraft</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th colSpan={1} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={PlansIcon} />
                  <span>Plans</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th colSpan={2} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={SeatIcon} />
                  <span>PAX</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th colSpan={1} className="py-2">
                <div className="flex items-center justify-center gap-2">
                  <img src={StatusIcon} />
                  <span>Status</span>
                </div>
              </th>
            </tr>

            {/* Second header row (ADDED style prop) */}
            <tr
              className="bg-bg-secondary text-left text-base text-text-primary font-light"
              style={{
                // This inset shadow creates the TOP border (the one you were missing)
                boxShadow: "inset 0 1px 0 0 rgb(75 85 99)",
              }}
            >
              <th className="py-2 px-3 font-medium">Airline</th>
              <th className="py-2 px-3 font-medium">Route</th>
              <th className="py-2 px-3 font-medium">Flight #</th>
              <th className="py-2 px-3 font-medium">Type</th>
              <th className="py-2 px-3 font-medium">Date</th>
              <th className="py-2 px-3 font-medium">Departure</th>
              <th className="py-2 px-3 font-medium">Arrival</th>
              <th className="py-2 px-3 font-medium relative">
                Status
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th className="py-2 px-3 text-center font-medium">
                AC Type/AC Reg
              </th>
              <th className="py-2 px-3 text-center font-medium relative">
                Ground Time
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th className="py-2 px-3 font-medium relative">
                Loading plan / Meal plan
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th className="py-2 px-3 text-center font-medium">Total</th>
              <th className="py-2 px-3 text-center font-medium relative">
                Cabins
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600"></div>
              </th>
              <th className="py-2 px-3 font-medium"></th>
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
                    <td colSpan={14} className="h-7 bg-gray-100"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-500 h-8 flex items-center px-4">
        <span className="text-sm text-white font-semibold">
          Galley X Planner
        </span>
      </div>
    </div>
  );
};

export default FlightList;

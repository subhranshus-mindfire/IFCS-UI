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

      {/* Outer horizontal scroll container */}
      <div className="flex-1 overflow-x-auto">
        <div className="min-w-[1300px] flex flex-col h-full">
          {/* Table Header */}
          <div className="bg-black text-white sticky top-0 z-10">
            <div className="grid grid-cols-[40px_100px_60px_35px_70px_50px_50px_70px_150px_150px_60px_300px_200px] text-xs font-semibold border-b border-gray-600">
              <div></div>
              <div></div>
              <div className="flex items-center justify-center gap-1 ">
                <FontAwesomeIcon icon={faPlaneDeparture} className="text-sm" />
                <span>Flight</span>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className="flex items-center py-2 justify-center gap-1">
                <FontAwesomeIcon icon={faPlaneCircleCheck} />
                <span>Aircraft</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faClipboardList} />
                <span>Plans</span>
              </div>
              <div></div>
              <div className="flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faUsers} />
                <span className="text-left pl-5">PAX</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faBoltLightning} />
                <span>Status</span>
              </div>
            </div>

            <div className="bg-[#9A9A9A] text-left text-black grid grid-cols-[40px_100px_60px_35px_70px_50px_50px_70px_150px_150px_60px_300px_200px] text-[10px] font-extralight border-b border-gray-400">
              <div>Airline</div>
              <div>Route</div>
              <div>Flight #</div>
              <div>Type</div>
              <div>Date</div>
              <div>Departure</div>
              <div>Arrival</div>
              <div>Status</div>
              <div className="text-center">AC Type/AC Reg</div>
              <div>Loading plan / Meal plan</div>
              <div className="text-center">Total</div>
              <div className="text-center">Cabins</div>
              <div></div>
            </div>
          </div>

          {/* Rows (Vertical scroll only) */}
          <div className="flex-1 overflow-y-auto">
            {flights.map((pair, idx) => (
              <div key={idx} className="mb-7 shadow-xl">
                {pair.map((flight, subIdx) => (
                  <FlightRow
                    key={subIdx}
                    flight={flight}
                    onShowHistory={handleShowHistory}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
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

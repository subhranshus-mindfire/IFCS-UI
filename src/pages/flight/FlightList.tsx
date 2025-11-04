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

  const handleAddFlight = () => {
    setShowAddModal(true);
  };

  const handleShowHistory = (flightNumber: string) => {
    setSelectedFlightNumber(flightNumber);
    setShowHistoryModal(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 font-arial">
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

      {/* Table Header */}
      <div className="bg-black text-white">
        <div className="grid grid-cols-[40px_150px_80px_40px_80px_100px_100px_80px_130px_200px_60px_180px_auto] text-xs font-semibold border-b border-gray-600">
          <div></div>
          <div></div>
          <div className="flex items-center justify-center gap-1">
            <FontAwesomeIcon icon={faPlaneDeparture} className="text-sm" />
            <span>Flight</span>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="flex items-center py-2   justify-center gap-1">
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
            <span>PAX</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <FontAwesomeIcon icon={faBoltLightning} />
            <span>Status</span>
          </div>
        </div>

        <div className="bg-zinc-400 text-black grid grid-cols-[40px_150px_80px_40px_80px_100px_100px_80px_130px_200px_60px_180px_auto] text-xs font-semibold border-b border-gray-400">
          <div>Airline</div>
          <div>Route</div>
          <div>Flight #</div>
          <div>Type</div>
          <div>Date</div>
          <div>
            <div>Departure</div>
            <div className="text-[10px] text-gray-600">Actual</div>
          </div>
          <div>
            <div>Arrival</div>
            <div className="text-[10px] text-gray-600">Actual</div>
          </div>
          <div>Status</div>
          <div>AC Type/Reg</div>
          <div>Plans</div>
          <div>Total</div>
          <div>Cabins</div>
          <div></div>
        </div>
      </div>

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

      <div className="bg-gray-400 h-8 flex items-center px-4">
        <span className="text-xs text-white font-semibold">
          Galley X Planner
        </span>
      </div>
    </div>
  );
};

export default FlightList;

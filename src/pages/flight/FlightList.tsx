import React, { useState, useEffect } from "react";
import FlightHeader from "../../components/flight/FlightListHeader";
import { AddFlightModal } from "../../components/flight/AddFlightModal";
import { FlightHistoryModal } from "../../components/flight/FlightHistoryModal";
import { FlightRow } from "../../components/flight/FlightRow";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {
  AirplaneFlightIcon,
  AirplaneIcon,
  IFCSLogo,
  PlansIcon,
  SeatIcon,
  StatusIcon,
} from "../../assets/icons";
import { useFlightStore } from "../../store/flight";

const FlightList: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedFlightNumber, setSelectedFlightNumber] = useState<string>("");
  const { flights, isLoading, error, fetchFlights } = useFlightStore();
  const navigate = useNavigate();
  const handleAddFlight = () => setShowAddModal(true);
  const handleShowHistory = (flightNumber: string) => {
    setSelectedFlightNumber(flightNumber);
    setShowHistoryModal(true);
  };
  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return (
    <div className="w-full h-screen flex flex-col bg-bg-secondary font-arial">
      <Navbar onMenuClick={() => { }} />
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
        <table className="w-full border-collapse bg-bg-surface min-w-[1600px]">
          <thead
            className="sticky top-0 z-10 bg-bg-tertiary text-text-secondary"
            style={{
              boxShadow: "0 1px 0 0 #EAE9EC",
            }}
          >
            {/* First header row */}
            <tr className="text-sm font-semibold">
              <th colSpan={8} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={AirplaneFlightIcon} />
                  <span>Flight</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th colSpan={1} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={AirplaneIcon} />
                  <span>Aircraft</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th colSpan={1} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={PlansIcon} />
                  <span>Plans</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th colSpan={2} className="py-2 relative">
                <div className="flex items-center justify-center gap-2">
                  <img src={SeatIcon} />
                  <span>PAX</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th colSpan={1} className="py-2">
                <div className="flex items-center justify-center gap-2">
                  <img src={StatusIcon} />
                  <span>Status</span>
                </div>
              </th>
            </tr>

            {/* Second header row */}
            <tr
              className="bg-bg-secondary text-left text-base text-text-primary font-light"
              style={{
                boxShadow: "inset 0 1px 0 0 #EAE9EC",
              }}
            >
              <th className="py-2 px-3 text-sm font-light">Airline</th>
              <th className="py-2 px-3 text-[13px] font-light">Route</th>
              <th className="py-2 px-3 text-[13px] font-light">Flight #</th>
              <th className="py-2 px-3 text-[13px] font-light">Type</th>
              <th className="py-2 px-3 text-[13px] font-light">Date</th>
              <th className="py-2 px-3 text-[13px] font-light">Departure</th>
              <th className="py-2 px-3 text-[13px] font-light">Arrival</th>
              <th className="py-2 px-3 text-[13px] font-light relative">
                Status
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th className="py-2 px-3 text-center text-[13px] font-light relative">
                AC Type/AC Reg
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th className="py-2 px-3 text-[13px] font-light relative">
                Loading plan / Meal plan
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th className="py-2 px-3 text-center text-[13px] font-light">
                Total
              </th>
              <th className="py-2 px-3 text-center text-[13px] font-light relative">
                Cabins
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
              </th>
              <th className="py-2 px-3 text-[13px] font-light"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && !error
              ? [...Array(6)].map((_, idx) => (
                <React.Fragment key={`shimmer-${idx}`}>
                  <tr className="border-b border-border-muted">
                    {[...Array(13)].map((_, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="py-4 px-3"
                      >
                        <div className="relative h-4 w-20 rounded bg-bg-secondary overflow-hidden animate-pulse duration-75">
                          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))
              : flights.map((pair, idx) => (
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
                      <td colSpan={13} className="h-7 bg-bg-secondary"></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>

      <div className=" h-8 flex items-center px-4">
        <img src={IFCSLogo} />
      </div>
    </div>
  );
};

export default FlightList;

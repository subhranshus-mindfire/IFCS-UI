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
import type { FlightFilters, FlightList as FlightListType } from "../../types/Flight";


const FlightList: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedFlightNumber, setSelectedFlightNumber] = useState<string>("");
  const [selectedFlightId, setSelectedFlightId] = useState<string>("");

  const { flights, filters, setFilters, flightStats, fetchFlightStats, isLoading, error, fetchFlights } = useFlightStore();
  const navigate = useNavigate();
  const handleAddFlight = () => setShowAddModal(true);
  const handleShowHistory = (flightId: string, flightNumber: string) => {
    setSelectedFlightId(flightId)
    setSelectedFlightNumber(flightNumber);
    setShowHistoryModal(true);
  };
  useEffect(() => {
    fetchFlights(filters);
    fetchFlightStats(filters)
  }, [fetchFlights, fetchFlightStats, filters]);
  const handleFilterChange = (key: keyof FlightFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
  };

  const getFullRouteForPair = (pair: FlightListType[]): string => {
    if (pair.length === 0) return '';

    // Start the route with the departure of the very first flight.
    let fullRoute = pair[0].departureDestination;

    // Iterate through all flights and append their arrival destination to build the chain.
    // For a chain A-B, B-C, C-A:
    // Start with A. 
    // Flight 1 (A-B) adds B. Route = A-B
    // Flight 2 (B-C) adds C. Route = A-B-C
    // Flight 3 (C-A) adds A. Route = A-B-C-A
    for (const flight of pair) {
      // Only append the arrival destination if it's different from the last segment added
      // (which is the departure destination of the current flight).
      // The simple method is just appending the arrival, as the segments are already ordered:
      fullRoute += `-${flight.arrivalDestination}`;
    }

    // Clean up potential duplicate destinations if the start and end of the pair overlap,
    // though the iterative approach above should handle it well for a closed chain.
    // Example: If pair[0].dep = MCT and pair[0].arr = CDG, pair[1].dep = CDG, pair[1].arr = MCT
    // Loop 1: fullRoute = MCT-CDG
    // Loop 2: fullRoute = MCT-CDG-MCT (Correct)

    return fullRoute;
  };
  return (
    <div className="w-full h-screen flex flex-col bg-bg-secondary font-arial">
      <Navbar onMenuClick={() => { }} />
      <FlightHeader
        totalFlights={flightStats.total}
        completeFlights={flightStats.completed}
        inProgressFlights={0}
        waitingFlights={flightStats.waiting}
        onBack={() => navigate("/dashboard")}
        onAddFlight={handleAddFlight}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {showAddModal && (
        <AddFlightModal onClose={() => setShowAddModal(false)} />
      )}
      {showHistoryModal && (
        <FlightHistoryModal

          flightId={selectedFlightId}
          flightNumber={selectedFlightNumber}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse bg-bg-surface min-w-[1650px]">
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
                Loading Plan / Meal Plan
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
            {/* {isLoading && !error
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
                  {idx === 0 && (<tr>
                    <td colSpan={13} className="h-4 bg-bg-quaternary"></td>
                  </tr>)}
                  {pair.map((flight, subIdx) => (
                    <FlightRow
                      key={`${idx}-${subIdx}`}
                      flight={flight}
                      onShowHistory={() => { handleShowHistory(flight.id, flight.flightNumber) }}
                      hideRoute={subIdx > 0}
                      isFirstInPair={subIdx === 0}
                      isLastInPair={subIdx === pair.length - 1}
                    />
                  ))}
                  {idx < flights.length - 1 && (
                    <tr>
                      <td colSpan={13} className="h-4 bg-bg-quaternary"></td>
                    </tr>
                  )}
                </React.Fragment>
              ))} */}
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
              : flights.map((pair, idx) => { // <-- Start of the map function block

                // 1. Calculate the full route string once per pair
                const fullRouteString = getFullRouteForPair(pair);

                // 2. Explicit return of the fragment
                return (
                  <React.Fragment key={idx}>
                    {idx === 0 && (<tr>
                      <td colSpan={13} className="h-4 bg-bg-quaternary"></td>
                    </tr>)}
                    {pair.map((flight, subIdx) => (
                      <FlightRow
                        key={`${idx}-${subIdx}`}
                        flight={flight}
                        onShowHistory={() => { handleShowHistory(flight.id, flight.flightNumber) }}
                        hideRoute={subIdx > 0}
                        isFirstInPair={subIdx === 0}
                        isLastInPair={subIdx === pair.length - 1}
                        // 3. Pass the full route string to FlightRow
                        fullPairRoute={fullRouteString}
                      />
                    ))}
                    {idx < flights.length - 1 && (
                      <tr>
                        <td colSpan={13} className="h-4 bg-bg-quaternary"></td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
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

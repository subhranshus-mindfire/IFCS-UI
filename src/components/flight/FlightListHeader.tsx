import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faCheckCircle,
  faRotateRight,
  faClock,
  faCalendar,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "../BreadCrumb";
import type { FlightFilters } from "../../types/Flight";

interface FlightHeaderProps {
  totalFlights?: number;
  completeFlights?: number;
  inProgressFlights?: number;
  waitingFlights?: number;
  onAddFlight?: () => void;
  onBack?: () => void;
  onFilterChange: (key: keyof FlightFilters, value: string) => void;
  currentFilters: FlightFilters;
}

const FlightHeader: React.FC<FlightHeaderProps> = ({
  totalFlights = 110,
  completeFlights = 48,
  inProgressFlights = 0,
  waitingFlights = 62,
  onAddFlight,
  onBack,
  onFilterChange,
  currentFilters,
}) => {
  return (
    <div className="flex flex-col w-full border-b border-gray-300">
      <div className="flex flex-wrap items-center gap-5 bg-bg-secondary text-white pr-4 py-0">
        <button
          onClick={onBack}
          className="flex items-center h-full gap-2 py-4 px-4 bg-black hover:text-blue-400 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <button
          onClick={onAddFlight}
          className="flex items-center gap-2 text-black py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Flight</span>
        </button>
      </div>

      <div className="bg-bg-surface px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 md:gap-3 lg:gap-4">
        <div className="flex flex-col gap-3">
          <Breadcrumb
            currentScreen={"Flights"}
            handleDetailsNav={() => { }}
          />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1">

            <select
              value={currentFilters.station || ""}
              onChange={(e) => onFilterChange("station", e.target.value)}
              className="px-3 py-1.5 border border-gray-200 bg-bg-surface text-gray-600 text-sm rounded focus:outline-none focus:ring-1 focus:border-border-accent w-28 sm:w-32"
            >
              <option value="">Station</option>
              <option value="MCT">MCT</option>
              <option value="MNL">MNL</option>
              <option value="KUL">KUL</option>
              <option value="CAI">CAI</option>
            </select>

            <div className="relative w-36 sm:w-40">
              <input
                type="date"
                value={currentFilters.date || ""}
                onChange={(e) => onFilterChange("date", e.target.value)}
                className="px-3 py-1.5 border border-border-muted bg-bg-surface text-gray-600 text-sm rounded w-full focus:outline-none focus:ring-1 focus:border-border-accent appearance-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FontAwesomeIcon icon={faCalendar} color="black" />
              </span>
            </div>

            <input
              type="text"
              value={currentFilters.flight || ""}
              onChange={(e) => onFilterChange("flight", e.target.value)}
              placeholder="Flight"
              className="px-3 py-1.5 border border-border-muted bg-bg-surface text-gray-800 text-sm rounded w-28 sm:w-32 focus:outline-none focus:ring-1 focus:border-border-accent placeholder-gray-500"
            />

            <input
              type="text"
              value={currentFilters.acReg || ""}
              onChange={(e) => onFilterChange("acReg", e.target.value)}
              placeholder="AC Reg"
              className="px-3 py-1.5 border border-border-muted bg-bg-surface text-gray-800 text-sm rounded w-28 sm:w-32 focus:outline-none focus:ring-1 focus:border-border-accent placeholder-gray-500"
            />

            <input
              type="text"
              value={currentFilters.acType || ""}
              onChange={(e) => onFilterChange("acType", e.target.value)}
              placeholder="AC Type"
              className="px-3 py-1.5 border border-border-muted bg-bg-surface text-gray-800 text-sm rounded w-28 sm:w-32 focus:outline-none focus:ring-1 focus:border-border-accent placeholder-gray-500"
            />

            <input
              type="text"
              value={currentFilters.route || ""}
              onChange={(e) => onFilterChange("route", e.target.value)}
              placeholder="Route"
              className="px-3 py-1.5 border border-border-muted bg-bg-surface text-gray-800 text-sm rounded w-28 sm:w-32 focus:outline-none focus:ring-1 focus:border-border-accent placeholder-gray-500"
            />

            <select
              value={currentFilters.client || ""}
              onChange={(e) => onFilterChange("client", e.target.value)}
              className="px-3 py-1.5 border border-border-muted bg-bg-surface text-gray-600 text-sm rounded focus:outline-none focus:ring-1 focus:border-border-accent w-28 sm:w-32"
            >
              <option value="Oman">Oman Air</option>
              <option value="Dubai">Salam Air</option>
              <option value="Abu Dhabi">All</option>
            </select>
          </div>
        </div>

        {/* Stats (responsive grid) */}
        <div className="grid grid-cols-4 gap-6">

          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-gray-800">{totalFlights}</div>
            <div className="text-xs text-gray-600 font-medium">Flights</div>
            <FontAwesomeIcon icon={faPlane} className="text-blue-400 text-lg mt-1" />
          </div>

          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-gray-800">{completeFlights}</div>
            <div className="text-xs text-gray-600 font-medium">Complete</div>
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-lg mt-1" />
          </div>

          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-gray-800">{inProgressFlights}</div>
            <div className="text-xs text-gray-600 font-medium">In Progress</div>
            <FontAwesomeIcon icon={faRotateRight} className="text-yellow-500 text-lg mt-1" />
          </div>

          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-gray-800">{waitingFlights}</div>
            <div className="text-xs text-gray-600 font-medium">Waiting</div>
            <FontAwesomeIcon icon={faClock} className="text-blue-400 text-lg mt-1" />
          </div>

        </div>
      </div>
    </div>

  );
};

export default FlightHeader;
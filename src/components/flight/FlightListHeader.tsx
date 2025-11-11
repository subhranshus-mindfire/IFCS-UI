import React, { useState } from "react";
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

interface FlightHeaderProps {
  totalFlights?: number;
  completeFlights?: number;
  inProgressFlights?: number;
  waitingFlights?: number;
  onAddFlight?: () => void;
  onBack?: () => void;
}

const FlightHeader: React.FC<FlightHeaderProps> = ({
  totalFlights = 110,
  completeFlights = 48,
  inProgressFlights = 0,
  waitingFlights = 62,
  onAddFlight,
  onBack,
}) => {
  const [station, setStation] = useState("");
  const [date, setDate] = useState("2024-11-04");
  const [flightNumber, setFlightNumber] = useState("");

  return (
    <div className="flex flex-col w-full border-b border-gray-300">
      <div className="flex items-center justify-left gap-5 bg-red-800 text-white pr-4 py-0">
        <button
          onClick={onBack}
          className="flex items-center h-full gap-2 py-4 px-4 bg-black hover:text-blue-400 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <button
          onClick={onAddFlight}
          className="flex items-center gap-2 text-white py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Flight</span>
        </button>
      </div>

      <div className="bg-bg-secondary px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col items-left gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Flight Hub</h1>

          <div className="flex flex-row items-center justify-center gap-1">
            <div className="flex items-center gap-2">
              <select
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="px-3 py-1.5 border border-black bg-black text-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Station</option>
                <option value="Oman">Oman</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-3 py-1.5 border border-gray-600 bg-black text-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FontAwesomeIcon icon={faCalendar} color="white" />
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="Flight"
                className="px-3 py-1.5 border border-gray-600 bg-black text-white text-sm rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center">
              <input
                type="text"
                // value={flightNumber}
                // onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="AC Reg"
                className="px-3 py-1.5 border border-gray-600 bg-black text-white text-sm rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center">
              <input
                type="text"
                // value={flightNumber}
                // onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="AC Type"
                className="px-3 py-1.5 border border-gray-600 bg-black text-white text-sm rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center">
              <input
                type="text"
                // value={flightNumber}
                // onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="Route"
                className="px-3 py-1.5 border border-gray-600 bg-black text-white text-sm rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                // value={station}
                // onChange={(e) => setStation(e.target.value)}
                className="px-3 py-1.5 border border-black bg-black text-gray-400 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Oman">Oman</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {totalFlights}
            </div>
            <div className="text-xs text-gray-600 font-medium">Flights</div>
            <FontAwesomeIcon
              icon={faPlane}
              className="text-blue-400 text-lg mt-1"
            />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {completeFlights}
            </div>
            <div className="text-xs text-gray-600 font-medium">Complete</div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-lg mt-1"
            />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {inProgressFlights}
            </div>
            <div className="text-xs text-gray-600 font-medium">In Progress</div>
            <FontAwesomeIcon
              icon={faRotateRight}
              className="text-yellow-500 text-lg mt-1"
            />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {waitingFlights}
            </div>
            <div className="text-xs text-gray-600 font-medium">Waiting</div>
            <FontAwesomeIcon
              icon={faClock}
              className="text-blue-400 text-lg mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;

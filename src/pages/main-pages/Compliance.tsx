import React, { useState, useMemo } from "react";
import {
  COUNTRIES_DATA,
  ISSUE_CATEGORIES,
  type Country,
  type Station,
} from "../../const/ComplianceData";
import IssueCard from "../../components/compliance/IssueCard";
import DoughnutChart from "../../components/compliance/DoughnutChart";

interface SummaryStats {
  totalFlights: number;
  totalPassengers: number;
  flightMismatches: number;
  missingFlights: number;
}

// --- MOCK DATA ---
// NOTE: For Font Awesome icons to work, make sure you've included the library
// in your project (e.g., via CDN in your index.html)

const SUMMARY_STATS: SummaryStats = {
  totalFlights: 205,
  totalPassengers: 28045,
  flightMismatches: 5,
  missingFlights: 28,
};

interface CountryTableSectionProps {
  country: Country;
}

/**
 * Collapsible Country Table Section
 * Shows a header and a conditionally rendered table of stations
 */
const CountryTableSection: React.FC<CountryTableSectionProps> = ({
  country,
}) => {
  const [isOpen, setIsOpen] = useState(country.name === "Canada"); // Default Canada to open

  const headerKeys =
    country.stations.length > 0
      ? (Object.keys(country.stations[0]) as (keyof Station)[])
      : [];

  // Filter out 'id' and 'action' for header display
  const displayHeaders = headerKeys.filter(
    (key) => key !== "id" && key !== "action"
  );

  return (
    <div className="bg-white font-rubik rounded-lg shadow border border-gray-200 mb-4">
      {/* Header */}
      <button
        className="flex justify-between items-center w-full px-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {country.name} ({country.stations.length.toString().padStart(2, "0")})
        </h3>
        {isOpen ? (
          <i className="fa-solid fa-chevron-up text-gray-600"></i>
        ) : (
          <i className="fa-solid fa-chevron-down text-gray-600"></i>
        )}
      </button>

      {/* Table (Conditional) */}
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                {displayHeaders.map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {["city", "caterer"].includes(key) && (
                        <i className="fa-solid fa-filter text-xs"></i>
                      )}
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {country.stations.map((station) => (
                <tr
                  key={station.id + station.city}
                  className="border-b hover:bg-gray-50"
                >
                  {displayHeaders.map((key) => (
                    <td key={key} className="px-4 py-3 whitespace-nowrap">
                      {station[key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    {station.action && (
                      <i className="fa-solid fa-arrow-up-right-from-square text-purple-600"></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/**
 * Main Compliance Tracking Component
 * Assembles all the pieces
 */
const App: React.FC = () => {
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({
    status: false,
    duration: false,
  });

  const toggleDropdown = (name: string) => {
    setDropdowns((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [name]: !prev[name],
    }));
  };

  const totalIssues = useMemo(
    () => ISSUE_CATEGORIES.reduce((sum, cat) => sum + cat.issueCount, 0),
    []
  );

  return (
    <div className="p-6 font-rubik md:p-8 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Compliance Tracking
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
            <span>
              Total Flights:{" "}
              <span className="font-semibold text-gray-800">
                {SUMMARY_STATS.totalFlights}
              </span>
            </span>
            <span>
              Total Passengers:{" "}
              <span className="font-semibold text-gray-800">
                {SUMMARY_STATS.totalPassengers}
              </span>
            </span>
            <span>
              Flight Mismatches:{" "}
              <span className="font-semibold text-gray-800">
                {SUMMARY_STATS.flightMismatches}
              </span>
            </span>
            <span>
              Missing Flights:{" "}
              <span className="font-semibold text-gray-800">
                {SUMMARY_STATS.missingFlights}
              </span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-purple-700 transition-colors">
            New Issue
          </button>
          {/* Status Dropdown */}
          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("status")}
              className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
            >
              Status
              <i
                className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${
                  dropdowns.status ? "rotate-180" : "rotate-0"
                }`}
              ></i>
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border transition-all duration-300 origin-top ${
                dropdowns.status
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                All
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Open
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Closed
              </a>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("duration")}
              className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
            >
              Duration
              <i
                className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${
                  dropdowns.duration ? "rotate-180" : "rotate-0"
                }`}
              ></i>
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border transition-all duration-300 origin-top ${
                dropdowns.duration
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Last 7 Days
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Last 30 Days
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Last 90 Days
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Summary Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex-shrink-0">
          <DoughnutChart
            categories={ISSUE_CATEGORIES}
            totalIssues={totalIssues}
          />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ISSUE_CATEGORIES.map((category) => (
            <IssueCard
              key={category.id}
              category={category}
              totalIssues={totalIssues}
            />
          ))}
        </div>
      </div>

      {/* Country Tables Section */}
      <div>
        {COUNTRIES_DATA.map((country) => (
          <CountryTableSection key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
};

// Default export
export default App;

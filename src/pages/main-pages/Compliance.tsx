import React, { useState, useMemo, useEffect, useRef } from "react";
import { COUNTRIES_DATA, ISSUE_CATEGORIES } from "../../const/ComplianceData";
import IssueCard from "../../components/compliance/IssueCard";
import DoughnutChart from "../../components/compliance/DoughnutChart";
import {
  DelayIcon,
  DropdownIcon,
  PawsIcon,
  ProvisioningIcon,
  QualityIcon,
  RefreshIcon,
  SafetyIcon,
  SettingIcon,
  SquaresIcon,
} from "../../assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { CountryTableSection } from "../../components/compliance/CountryTable";

interface SummaryStats {
  totalFlights: number;
  totalPassengers: number;
  flightMismatches: number;
  missingFlights: number;
}

const ICONS = [
  DelayIcon,
  QualityIcon,
  PawsIcon,
  ProvisioningIcon,
  SquaresIcon,
  SafetyIcon,
];

const SUMMARY_STATS: SummaryStats = {
  totalFlights: 205,
  totalPassengers: 28045,
  flightMismatches: 5,
  missingFlights: 28,
};

const useDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        Object.values(dropdownRefs.current).every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return { openDropdown, toggleDropdown, dropdownRefs };
};

const App: React.FC = () => {
  const { openDropdown, toggleDropdown, dropdownRefs } = useDropdown();

  const totalIssues = useMemo(
    () => ISSUE_CATEGORIES.reduce((sum, cat) => sum + cat.issueCount, 0),
    []
  );

  return (
    <div className="p-6 font-rubik md:p-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-[20px] font-[500] text-text-primary">
            Compliance Tracking
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mt-2">
            {Object.entries(SUMMARY_STATS).map(([key, value]) => (
              <span key={key}>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                : <span className="text-text-primary font-[500]">{value}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button className="bg-bg-button text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-purple-700 transition-colors">
            + New Issue
          </button>
          <button className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
            <img src={RefreshIcon} />
          </button>

          {/* Status Dropdown */}
          <div
            className="relative"
            ref={(el) => {
              dropdownRefs.current.status = el;
            }}
          >
            {" "}
            <button
              onClick={() => toggleDropdown("status")}
              className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
            >
              Status
              <img src={DropdownIcon} />
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border transition-all duration-200 origin-top ${
                openDropdown === "status"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {["All", "Open", "Closed"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Duration Dropdown */}
          <div
            className="relative"
            ref={(el) => {
              dropdownRefs.current.duration = el;
            }}
          >
            {" "}
            <button
              onClick={() => toggleDropdown("duration")}
              className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
            >
              Duration
              <img src={DropdownIcon} />
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border transition-all duration-200 origin-top ${
                openDropdown === "duration"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {["Last 7 Days", "Last 30 Days", "Last 90 Days"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div
            className="relative"
            ref={(el) => {
              dropdownRefs.current.settings = el;
            }}
          >
            {" "}
            <button
              onClick={() => toggleDropdown("settings")}
              className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
            >
              <img src={SettingIcon} />
              <img src={DropdownIcon} />
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border transition-all duration-200 origin-top ${
                openDropdown === "settings"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <a
                key={"categories"}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faFile} />
                categories
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

        {/* Cards grid — 5 per row */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 justify-items-center">
          {ISSUE_CATEGORIES.map((category, index) => (
            <IssueCard
              key={category.id}
              category={category}
              totalIssues={totalIssues}
              cardIcon={ICONS[index]}
            />
          ))}
        </div>
      </div>

      <div>
        {COUNTRIES_DATA.map((country) => (
          <CountryTableSection key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
};

export default App;

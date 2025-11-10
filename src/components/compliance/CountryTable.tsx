import { useState } from "react";
import type { Country, Station } from "../../const/ComplianceData";
import { DropdownIcon, DropdownRevIcon } from "../../assets/icons";

interface CountryTableSectionProps {
  country: Country;
}

export const CountryTableSection: React.FC<CountryTableSectionProps> = ({
  country,
}) => {
  const [isOpen, setIsOpen] = useState(country.name === "Canada");

  const headerKeys =
    country.stations.length > 0
      ? (Object.keys(country.stations[0]) as (keyof Station)[])
      : [];

  const displayHeaders = headerKeys.filter(
    (key) => key !== "id" && key !== "action"
  );

  return (
    <div className="bg-white font-rubik rounded-xl py-3 shadow mb-4 transition-all duration-300">
      <button
        className="flex justify-between items-center w-full px-4 text-left py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[20px] text-text-secondary font-[500]">
          {country.name}{" "}
          <span className="text-text-muted text-sm">
            ({country.stations.length.toString().padStart(2, "0")})
          </span>
        </h3>
        <img
          src={isOpen ? DropdownRevIcon : DropdownIcon}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary font-[500] uppercase bg-bg-tertiary">
              <tr>
                {displayHeaders.map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-4 text-[12px] py-3 whitespace-nowrap"
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
          </table>

          <div className="max-h-[200px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <tbody>
                {country.stations.map((station) => (
                  <tr
                    key={station.id + station.city}
                    className="border-b-1 border-b-border-muted hover:bg-gray-50"
                  >
                    {displayHeaders.map((key) => (
                      <td key={key} className="px-4 py-3 whitespace-nowrap">
                        {station[key]}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <i className="fa-solid fa-arrow-up-right-from-square text-purple-600"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

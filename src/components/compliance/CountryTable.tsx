import { useState } from "react";
import type { Country, Station } from "../../const/ComplianceData";
import {
  DropdownIcon,
  DropdownRevIcon,
  RedirectIcon,
} from "../../assets/icons";

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
        {/* This outer div handles horizontal scrolling for the entire table.
         */}
        <div className="overflow-x-auto">
          {/* This inner div creates the vertical scrolling container.
           */}
          <div className="max-h-[200px] overflow-y-auto">
            {/* We now use ONE single table. 
              'relative' is needed for the 'sticky' header to work inside.
            */}
            <table className="w-full text-sm text-left relative">
              {/* The 'thead' is now 'sticky top-0' to lock it to the top
                of the scrolling container. 'z-10' keeps it on top.
                The background 'bg-bg-tertiary' is important so content
                doesn't show through.
              */}
              <thead className="text-xs text-text-secondary font-[500] uppercase bg-bg-tertiary sticky top-0 z-10">
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

              {/* The 'tbody' is placed directly inside the same table.
                This ensures all columns align perfectly.
              */}
              <tbody>
                {country.stations.map((station) => (
                  <tr
                    key={station.id + station.city}
                    className="border-b-1 border-b-border-muted hover:bg-gray-50"
                  >
                    {displayHeaders.map((key) => (
                      <td
                        key={key}
                        className="px-4 ps-6 py-3 whitespace-nowrap"
                      >
                        {station[key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 justify-left flex flex-row">
                      <img src={RedirectIcon} />
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

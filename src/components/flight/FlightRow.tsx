import {
  faClipboardList,
  faUtensils,
  faExclamationTriangle,
  faCog,
  faUsers,
  faCheckCircle,
  faBox,
  faMagnifyingGlass,
  faLock,
  faWrench,
  faComment,
  faFileAlt,
  faEye,
  faHistory,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import type { Flight } from "../../const/flightData";
import { useEffect, useRef, useState } from "react";

interface FlightRowProps {
  flight: Flight;
  onShowHistory: (flightNumber: string) => void;
}

export const FlightRow: React.FC<FlightRowProps> = ({
  flight,
  onShowHistory,
}) => {
  const logoUrl = `https://content.airhex.com/content/logos/airlines_${flight.airlineCode}_100_100_s.png`;
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleFlightDetails = () => {
    setOpen(false);
    navigate(`/flight-details/${flight.flightNumber}`);
  };

  const handleHistory = () => {
    setOpen(false);
    onShowHistory(flight.flightNumber);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50 text-xs bg-white font-arial shadow-2xl">
      <td className="text-center py-2">
        <img
          src={logoUrl}
          alt={flight.airlineCode}
          className="h-6 w-6 mx-auto"
        />
      </td>
      <td className="text-left font-medium py-2 ">{flight.route}</td>
      <td className="text-left text-base font-bold text-black py-2 ">
        {flight.flightNumber}
      </td>
      <td className="text-left font-semibold text-base py-2 ">{flight.type}</td>
      <td className="text-left font-semibold text-base py-2 ">{flight.date}</td>
      <td className="text-left py-2 ">
        <div className="font-extralight text-[10px]">
          {flight.departureType}
        </div>
        <div className="font-bold text-base">{flight.departure}</div>
        <div className="text-[#47B8ED] font-semibold">{flight.depStation}</div>
      </td>
      <td className="text-left py-2 ">
        <div className="font-extralight text-[10px]">{flight.arrivalType}</div>
        <div className="font-bold text-base">{flight.arrival}</div>
        <div className="text-[#47B8ED] font-semibold">{flight.arrStation}</div>
      </td>
      <td className="text-left py-2 ">
        <span className={`font-semibold ${flight.status}`}>
          {flight.status}
        </span>
      </td>
      <td className="text-center py-2 ">
        <div className="font-medium">{flight.acType}</div>
        <div className="text-gray-600">{flight.acReg}</div>
      </td>
      <td className=" py-2 text-[11px] text-gray-700 leading-tight">
        {flight.plan && <div className="mb-1">📄 {flight.plan}</div>}
        {flight.mealPlan && <div>{flight.mealPlan}</div>}
        {!flight.mealPlan && <div className="text-red-500">no meal plan</div>}
      </td>
      <td className="text-center py-2 ">
        <div className="flex flex-col items-center justify-center gap-1">
          <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
          <span className="font-bold text-sm">{flight.paxTotal}</span>
        </div>
      </td>
      <td className=" py-2 text-[11px] text-gray-700">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left">
          <div>
            <span className="text-xs text-left text-gray-900">
              Business Studio
            </span>
            <span className="text-left"> {flight.pax.business}</span>
          </div>
          <div>
            <span className="text-xs text-left text-gray-900">Economy</span>
            <span className="text-left"> {flight.pax.economy}</span>
          </div>
          <div>
            <span className="text-xs text-left text-gray-900">Business</span>
            <span className="text-left"> {flight.pax.first}</span>
          </div>
          <div>
            <span className="text-xs text-left text-gray-900">Crew</span>
            <span className="text-left"> {flight.pax.premium}</span>
          </div>
        </div>
      </td>
      <td className="py-2 ">
        <div className="flex items-center justify-end gap-2 text-gray-400">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="hover:text-yellow-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faUtensils}
            className="hover:text-green-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faClipboardList}
            className="hover:text-blue-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="hover:text-purple-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faBox}
            className="hover:text-orange-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faLock}
            className="hover:text-red-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="hover:text-green-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faWrench}
            className="hover:text-blue-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faComment}
            className="hover:text-purple-500 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faFileAlt}
            className="hover:text-gray-600 cursor-pointer"
          />
          <div className="relative inline-block" ref={menuRef}>
            <FontAwesomeIcon
              icon={faCog}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="text-xs text-gray-700">
                  <li
                    className="px-3 py-1.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleFlightDetails}
                  >
                    <FontAwesomeIcon icon={faEye} className="text-blue-400" />
                    Details
                  </li>
                  <li className="px-3 py-1.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                    <FontAwesomeIcon icon={faPen} className="text-green-500" />
                    Edit
                  </li>
                  <li
                    className="px-3 py-1.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleHistory}
                  >
                    <FontAwesomeIcon
                      icon={faHistory}
                      className="text-purple-500"
                    />
                    History
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

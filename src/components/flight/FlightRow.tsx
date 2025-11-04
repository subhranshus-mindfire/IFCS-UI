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
    <div className="grid grid-cols-[40px_150px_80px_40px_80px_100px_100px_80px_130px_200px_60px_180px_auto] items-center border-b border-gray-300 hover:bg-gray-50 text-xs bg-white font-arial">
      <div className="flex justify-center py-2 border-r border-gray-200">
        <img src={logoUrl} alt={flight.airlineCode} className="h-6 w-6" />
      </div>
      <div className="text-center font-medium py-2 border-r border-gray-200">
        {flight.route}
      </div>
      <div className="text-center font-bold text-black py-2 border-r border-gray-200">
        {flight.flightNumber}
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        {flight.type}
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        {flight.date}
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        <div className="font-bold">{flight.departure}</div>
        <div className="text-blue-500 font-semibold">{flight.depStation}</div>
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        <div className="font-bold">{flight.arrival}</div>
        <div className="text-blue-500 font-semibold">{flight.arrStation}</div>
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        <span className={`font-semibold ${flight.status}`}>
          {flight.status}
        </span>
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        <div className="font-medium">{flight.acType}</div>
        <div className="text-gray-600">{flight.acReg}</div>
      </div>
      <div className="px-2 py-2 border-r border-gray-200 text-[11px] text-gray-700 leading-tight">
        {flight.plan && <div className="mb-1">📄 {flight.plan}</div>}
        {flight.mealPlan && <div>{flight.mealPlan}</div>}
        {!flight.mealPlan && <div className="text-red-500">no meal plan</div>}
      </div>
      <div className="text-center py-2 border-r border-gray-200">
        <div className="flex flex-col items-center justify-center gap-1">
          <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
          <span className="font-bold text-sm">{flight.paxTotal}</span>
        </div>
      </div>
      <div className="px-2 py-2 border-r border-gray-200 text-[11px] text-gray-700">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-center">
          <div>
            <span className="font-semibold text-gray-900">First</span>
            <div className="text-blue-600">{flight.pax.first}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Business</span>
            <div className="text-blue-600">{flight.pax.business}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Premium</span>
            <div className="text-blue-600">{flight.pax.premium}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Economy</span>
            <div className="text-blue-600">{flight.pax.economy}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-2 text-gray-400">
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
        <div className="relative" ref={menuRef}>
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
    </div>
  );
};

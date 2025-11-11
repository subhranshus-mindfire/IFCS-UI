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
import Dropdown from "../Dropdown";

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
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const departureTriggerRef = useRef<HTMLTableCellElement>(null);
  const arrivalTriggerRef = useRef<HTMLTableCellElement>(null);
  const paxTotalTriggerRef = useRef<HTMLTableCellElement>(null);
  const paxCabinsTriggerRef = useRef<HTMLTableCellElement>(null);

  const navigate = useNavigate();

  const handleFlightDetails = () => {
    setOpen(false);
    navigate(`/flight-details/${flight.flightNumber}`);
  };

  const handleHistory = () => {
    setOpen(false);
    onShowHistory(flight.flightNumber);
  };

  const handlePopover = (popoverName: string) => {
    setActivePopover(activePopover === popoverName ? null : popoverName);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }

      if (popoverRef.current && !popoverRef.current.contains(target)) {
        if (
          departureTriggerRef.current?.contains(target) ||
          arrivalTriggerRef.current?.contains(target) ||
          paxTotalTriggerRef.current?.contains(target) ||
          paxCabinsTriggerRef.current?.contains(target)
        ) {
          return;
        }
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === "actual") return "text-blue-500";
    if (status.toLowerCase() === "scheduled") return "text-gray-500";
    return "text-gray-800";
  };

  const TimePopover = () => (
    <div
      ref={popoverRef}
      className="absolute z-20 w-78 bg-white shadow-lg rounded-md border border-gray-200 p-4 top-full mt-2 left-1/2 -translate-x-1/2"
      onClick={(e) => e.stopPropagation()}
    >
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-gray-800">
            <th className="py-1 font-bold"></th>
            <th className="py-1 px-2 font-bold text-center">Scheduled</th>
            <th className="py-1 px-2 font-bold text-center">Estimated</th>
            <th className="py-1 px-2 font-bold text-center">Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-800">
            <td className="py-1 font-bold">Departure</td>
            <td className="py-1 px-2 font-medium text-center">
              {flight.departure}
            </td>
            <td className="py-1 px-2 font-medium text-center"></td>
            <td className="py-1 px-2 font-medium text-center"></td>
          </tr>
          <tr className="text-gray-800">
            <td className="py-1 font-bold">Arrival</td>
            <td className="py-1 px-2 font-medium text-center">
              {flight.arrival}
            </td>
            <td className="py-1 px-2 font-medium text-center"></td>
            <td className="py-1 px-2 font-medium text-center"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const PaxPopover = () => (
    <div
      ref={popoverRef}
      className="absolute z-20 w-64 bg-white shadow-lg rounded-md border border-gray-200 p-4 top-full mt-2 left-1/2 -translate-x-1/2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2 text-sm text-gray-800">
        <h3 className="font-bold text-lg text-black">Passenger Count</h3>
        <div className="flex justify-between mt-2">
          <span>Business Studio</span>
          <span className="font-medium text-black">{flight.pax.business}</span>
        </div>
        <div className="flex justify-between">
          <span>Business</span>
          <span className="font-medium text-black">{flight.pax.first}</span>
        </div>
        <div className="flex justify-between">
          <span>Economy</span>
          <span className="font-medium text-black">{flight.pax.economy}</span>
        </div>
        <div className="flex justify-between">
          <span>Crew</span>
          <span className="font-medium text-black">{flight.pax.premium}</span>
        </div>
      </div>
    </div>
  );

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50 text-sm bg-white font-arial">
      <td className="text-center py-2 px-3">
        <img
          src={logoUrl}
          alt={flight.airlineCode}
          className="h-7 w-7 mx-auto"
        />
      </td>
      <td className="text-left font-sm py-2 px-0">{flight.route}</td>
      <td className="text-left text-lg font-bold text-black py-2 px-3">
        {flight.flightNumber}
      </td>
      <td className="text-left font-semibold text-lg py-2 px-3">
        {flight.type}
      </td>
      <td className="text-left font-semibold text-lg py-2 px-3">
        {flight.date}
      </td>

      <td
        ref={departureTriggerRef}
        onClick={() => handlePopover("departure")}
        className="text-left py-2 px-3 relative cursor-pointer"
      >
        <div
          className={`font-light text-sm ${getStatusColor(
            flight.departureType
          )}`}
        >
          {flight.departureType}
        </div>
        <div className="font-bold text-lg">{flight.departure}</div>
        <div className="text-blue-500 font-semibold text-sm">
          {flight.depStation}
        </div>
        {activePopover === "departure" && <TimePopover />}
      </td>

      <td
        ref={arrivalTriggerRef}
        onClick={() => handlePopover("arrival")}
        className="text-left py-2 px-3 relative cursor-pointer"
      >
        <div
          className={`font-light text-sm ${getStatusColor(flight.arrivalType)}`}
        >
          {flight.arrivalType}
        </div>
        <div className="font-bold text-lg">{flight.arrival}</div>
        <div className="text-blue-500 font-semibold text-sm">
          {flight.arrStation}
        </div>
        {activePopover === "arrival" && <TimePopover />}
      </td>

      <td className="text-left py-2 px-3">
        <span className={`font-semibold text-base ${flight.status}`}>
          {flight.status}
        </span>
      </td>
      <td className="text-center py-2 px-3 text-sm">
        <div className="font-medium">{flight.acType}</div>
        <div className="text-gray-600">{flight.acReg}</div>
      </td>
      <td className="text-center py-2 px-3 text-2xl font-medium">6:66</td>
      <td className="py-2 px-3 text-sm text-gray-700 leading-tight">
        {flight.plan && <div className="mb-1">📄 {flight.plan}</div>}
        {flight.mealPlan && <div>{flight.mealPlan}</div>}
        {!flight.mealPlan && <div className="text-red-500">no meal plan</div>}
      </td>

      <td
        ref={paxTotalTriggerRef}
        onClick={() => handlePopover("paxTotal")}
        className="text-center py-2 px-3 relative cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <FontAwesomeIcon icon={faUsers} className="text-gray-500 text-lg" />
          <span className="font-bold text-base">{flight.paxTotal}</span>
        </div>
        {activePopover === "paxTotal" && <PaxPopover />}
      </td>

      {/* --- PAX Cabins Cell --- */}
      <td
        ref={paxCabinsTriggerRef}
        onClick={() => handlePopover("paxCabins")}
        className="py-2 px-3 text-sm text-gray-700 relative cursor-pointer"
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left">
          <div>
            <span className="text-left text-gray-900">Business Studio</span>
            <span className="text-left font-medium">
              {" "}
              {flight.pax.business}
            </span>
          </div>
          <div>
            <span className="text-left text-gray-900">Economy</span>
            <span className="text-left font-medium"> {flight.pax.economy}</span>
          </div>
          <div>
            <span className="text-left text-gray-900">Business</span>
            <span className="text-left font-medium"> {flight.pax.first}</span>
          </div>
          <div>
            <span className="text-left text-gray-900">Crew</span>
            <span className="text-left font-medium"> {flight.pax.premium}</span>
          </div>
        </div>
        {activePopover === "paxCabins" && <PaxPopover />}
      </td>

      {/* --- Actions Cell --- */}
      <td className="py-2 px-3 text-base">
        <div className="flex items-center justify-end pe-2 gap-3 text-gray-400">
          {/* FIX: Re-added all icons */}
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
              <Dropdown
                actions={[
                  {
                    icon: faEye,
                    label: "Details",
                    onClick: handleFlightDetails,
                  },
                  {
                    icon: faPen,
                    label: "Edit",
                    onClick: handleFlightDetails,
                  },
                  {
                    icon: faHistory,
                    label: "History",
                    onClick: handleHistory,
                  },
                ]}
                width="w-36"
              />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

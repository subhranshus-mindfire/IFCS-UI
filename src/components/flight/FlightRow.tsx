import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faClipboardList,
  faUtensils,
  faSuitcaseRolling,
  faExclamationTriangle,
  faCog,
  faEye,
  faHistory,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

interface PaxData {
  first: string;
  business: string;
  premium: string;
  economy: string;
}

export interface Flight {
  airlineCode: string;
  route: string;
  flightNumber: string;
  type: string;
  date: string;
  departure: string;
  arrival: string;
  depStation: string;
  arrStation: string;
  status: string;
  acType: string;
  acReg: string;
  groundTime: string;
  plan: string;
  paxTotal: number;
  pax: PaxData;
}

const FlightRow: React.FC<Flight> = ({
  airlineCode,
  route,
  flightNumber,
  type,
  date,
  departure,
  arrival,
  depStation,
  arrStation,
  status,
  acType,
  acReg,
  groundTime,
  plan,
  paxTotal,
  pax,
}) => {
  const logoUrl = `https://content.airhex.com/content/logos/airlines_${airlineCode}_100_100_s.png`;

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
      case "on time":
        return "bg-blue-100 text-blue-700";
      case "departed":
        return "bg-green-100 text-green-700";
      case "delayed":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleFlightDetails = () => {
    setOpen(false);
    navigate(`/flight-details/${flightNumber}`);
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
    <div
      className="
        grid grid-cols-20 items-center border-b border-gray-200 
        py-1.5 sm:py-2 text-xs sm:text-sm 
        hover:bg-gray-50 transition-colors 
        min-w-[1400px]
      "
    >
      <div className="col-span-1 flex justify-center px-1">
        <img
          src={logoUrl}
          alt={airlineCode}
          className="h-6 w-6 object-contain"
        />
      </div>

      <div className="col-span-1 text-center font-medium">{route}</div>

      <div className="col-span-1 text-center font-bold text-blue-500">
        {flightNumber}
      </div>

      <div className="col-span-1 text-center">{type}</div>

      <div className="col-span-1 text-center">{date}</div>

      <div className="col-span-1 text-center">
        <div className="font-medium">{departure}</div>
        <div className="text-gray-500 text-[11px]">{depStation}</div>
      </div>

      <div className="col-span-1 text-center">
        <div className="font-medium">{arrival}</div>
        <div className="text-gray-500 text-[11px]">{arrStation}</div>
      </div>

      <div className="col-span-1 text-center">
        <span
          className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <div className="col-span-1 text-center">
        <div className="font-medium">{acType}</div>
        <div className="text-gray-500 text-[11px]">{acReg}</div>
      </div>

      <div className="col-span-1 text-center">{groundTime}</div>

      <div className="col-span-1 text-center">{plan}</div>

      <div className="col-span-1 text-center font-bold text-gray-800">
        {paxTotal}
      </div>

      <div className="col-span-4 text-center ml-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-yellow-100 rounded p-1">
            <div className="text-[10px] text-yellow-600 font-semibold">
              First Class
            </div>
            <div className="font-bold">{pax.first}</div>
          </div>
          <div className="bg-blue-100 rounded p-1">
            <div className="text-[10px] text-blue-600 font-semibold">
              Business Class
            </div>
            <div className="font-bold">{pax.business}</div>
          </div>
          <div className="bg-purple-100 rounded p-1">
            <div className="text-[10px] text-purple-600 font-semibold">
              Premium Economy
            </div>
            <div className="font-bold">{pax.premium}</div>
          </div>
          <div className="bg-green-100 rounded p-1">
            <div className="text-[10px] text-green-600 font-semibold">
              Economy
            </div>
            <div className="font-bold">{pax.economy}</div>
          </div>
        </div>
      </div>

      <div className="col-span-4 flex gap-2 justify-center text-gray-500 text-center items-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="hover:text-yellow-500 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faUtensils}
          className="hover:text-blue-400 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faClipboardList}
          className="hover:text-green-500 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faSuitcaseRolling}
          className="hover:text-purple-500 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faPlane}
          className="hover:text-blue-500 cursor-pointer"
        />
        <div className="relative" ref={menuRef}>
          <FontAwesomeIcon
            icon={faCog}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
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
                <li className="px-3 py-1.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
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

export default FlightRow;

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import {
  CheckCircleIcon,
  ClipboardTextIcon,
  ForkKnifeIcon,
  GuardIcon,
  LassoIcon,
  LockKeyIcon,
  PackageSealedIcon,
  ReceiptIcon,
  SeatIcon,
  SignatureIcon,
  WarningIcon,
  CogIcon,
  DetailIcon,
  EditIcon,
  HistoryIcon
} from "../../assets/icons";
import type { Flight } from "../../types/Flight";

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
    if (status.toLowerCase() === "actual") return "text-bg-button";
    if (status.toLowerCase() === "scheduled") return "text-text-tertiary";
    return "text-text-primary";
  };

  const TimePopover = () => (
    <div
      ref={popoverRef}
      className="absolute z-20 w-78 bg-bg-surface shadow-lg rounded-md border border-border-muted p-4 top-full mt-2 left-1/2 -translate-x-1/2"
      onClick={(e) => e.stopPropagation()}
    >
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-text-primary">
            <th className="py-1 font-bold"></th>
            <th className="py-1 px-2 font-bold text-center">Scheduled</th>
            <th className="py-1 px-2 font-bold text-center">Estimated</th>
            <th className="py-1 px-2 font-bold text-center">Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-text-secondary">
            <td className="py-1 font-bold">Departure</td>
            <td className="py-1 px-2 font-medium text-center">
              {flight.departure}
            </td>
            <td className="py-1 px-2 font-medium text-center"></td>
            <td className="py-1 px-2 font-medium text-center"></td>
          </tr>
          <tr className="text-text-secondary">
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
      className="absolute z-20 w-64 bg-bg-surface shadow-lg rounded-md border border-border-muted p-4 top-full mt-2 left-1/2 -translate-x-1/2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2 text-sm text-text-secondary">
        <h3 className="font-bold text-lg text-text-primary">Passenger Count</h3>
        <div className="flex justify-between mt-2">
          <span>Business Studio</span>
          <span className="font-medium text-text-primary">
            {flight.pax.business}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Business</span>
          <span className="font-medium text-text-primary">
            {flight.pax.first}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Economy</span>
          <span className="font-medium text-text-primary">
            {flight.pax.economy}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Crew</span>
          <span className="font-medium text-text-primary">
            {flight.pax.premium}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <tr className="border-b border-border-muted hover:bg-bg-accent/20 text-sm bg-bg-surface font-arial">
      <td className="text-center py-2 px-3">
        <img
          src={logoUrl}
          alt={flight.airlineCode}
          className="h-7 w-7 mx-auto"
        />
      </td>
      <td className="text-left font-sm py-2 px-0 text-text-secondary">
        {flight.route}
      </td>
      <td className="text-left text-lg font-bold text-text-primary py-2 px-3">
        {flight.flightNumber}
      </td>
      <td className="text-left font-semibold text-lg py-2 px-3 text-text-primary">
        {flight.type}
      </td>
      <td className="text-left font-semibold text-lg py-2 px-3 text-text-secondary">
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
        <div className="font-bold text-lg text-text-primary">
          {flight.departure}
        </div>
        <div className="text-bg-button font-semibold text-sm">
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
        <div className="font-bold text-lg text-text-primary">
          {flight.arrival}
        </div>
        <div className="text-bg-button font-semibold text-sm">
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
        <div className="font-medium text-text-primary">{flight.acType}</div>
        <div className="text-text-tertiary">{flight.acReg}</div>
      </td>
      {/* Removed the 'Ground Time' column's cell */}
      <td className="py-2 px-3 text-sm text-text-secondary leading-tight">
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
          <img src={SeatIcon} />
          <span className="font-bold text-base text-text-primary">
            {flight.paxTotal}
          </span>
        </div>
        {activePopover === "paxTotal" && <PaxPopover />}
      </td>

      {/* --- PAX Cabins Cell with Grid Borders --- */}
      <td
        ref={paxCabinsTriggerRef}
        onClick={() => handlePopover("paxCabins")}
        className="py-2 px-3 text-sm text-text-secondary relative cursor-pointer"
      >
        <div className="grid grid-cols-2 text-left border border-border-muted">
          {/* Top-Left */}
          <div className="py-1 px-1 border-b border-r border-border-muted">
            <span className="text-left text-text-secondary">
              Business Studio
            </span>
            <span className="text-left font-medium text-text-primary">
              {" "}
              {flight.pax.business}
            </span>
          </div>
          {/* Top-Right */}
          <div className="py-1 px-1 border-b border-border-muted">
            <span className="text-left text-text-secondary">Economy</span>
            <span className="text-left font-medium text-text-primary">
              {" "}
              {flight.pax.economy}
            </span>
          </div>
          {/* Bottom-Left */}
          <div className="py-1 px-1 border-r border-border-muted">
            <span className="text-left text-text-secondary">Business</span>
            <span className="text-left font-medium text-text-primary">
              {" "}
              {flight.pax.first}
            </span>
          </div>
          {/* Bottom-Right */}
          <div className="py-1 px-1">
            <span className="text-left text-text-secondary">Crew</span>
            <span className="text-left font-medium text-text-primary">
              {" "}
              {flight.pax.premium}
            </span>
          </div>
        </div>
        {activePopover === "paxCabins" && <PaxPopover />}
      </td>

      {/* --- Actions Cell --- */}
      <td className="py-2 px-3 text-base">
        <div className="flex items-center justify-end pe-2 gap-3 text-text-tertiary">
          <img src={WarningIcon} className="h-4 w-4 cursor-pointer" />
          <img src={ForkKnifeIcon} className="h-4 w-4 cursor-pointer" />
          <img src={ClipboardTextIcon} className="h-4 w-4 cursor-pointer" />
          <img src={GuardIcon} className="h-4 w-4 cursor-pointer" />
          <img src={PackageSealedIcon} className="h-4 w-4 cursor-pointer" />
          <img src={LockKeyIcon} className="h-4 w-4 cursor-pointer" />
          <img src={CheckCircleIcon} className="h-4 w-4 cursor-pointer" />
          <img src={LassoIcon} className="h-4 w-4 cursor-pointer" />
          <img src={SignatureIcon} className="h-4 w-4 cursor-pointer" />
          <img src={ReceiptIcon} className="h-4 w-4 cursor-pointer" />
          <div className="relative inline-block" ref={menuRef}>
            {/* <FontAwesomeIcon
              icon={}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => setOpen(!open)}
            /> */}
            <img src={CogIcon} className="h-4 w-4 cursor-pointer" onClick={() => setOpen(!open)} />

            {open && (
              <Dropdown
                actions={[
                  {
                    icon: <img src={DetailIcon} className="h-4 w-4 cursor-pointer" />,
                    label: "Details",
                    onClick: handleFlightDetails,
                  },
                  {
                    icon: <img src={EditIcon} className="h-4 w-4 cursor-pointer" />,
                    label: "Edit",
                    onClick: handleFlightDetails,
                  },
                  {
                    icon: <img src={HistoryIcon} className="h-4 w-4 cursor-pointer" />,
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

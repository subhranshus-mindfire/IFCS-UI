import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import {
  CheckCircleIcon,
  ClipboardTextIcon,
  ForkKnifeIcon,
  GuardIcon,
  LockKeyIcon,
  PackageSealedIcon,
  ReceiptIcon,
  SeatIcon,
  SignatureIcon,
  WarningColouredIcon,
  CogIcon,
  DetailIcon,
  EditIcon,
  HistoryIcon,
  ThermometerIcon,
  TruckIcon
} from "../../assets/icons";
import type { FlightRowProps, PDFConfig } from "../../types/Flight";
import { Tooltip } from "../common/Tooltip";
import { PDFConfigModal } from "./PDFConfigModal";
import { formatDate, formatTimeInHHMM, getArrivalType, getDepartureType, getDynamicCabinCounts, getPaxCount } from "../../lib/utils";




export const FlightRow: React.FC<FlightRowProps> = ({
  flight,
  onShowHistory,
  hideRoute = false,
  isFirstInPair = false,
  isLastInPair = false,
  fullPairRoute
}) => {
  const logoUrl = `https://content.airhex.com/content/logos/airlines_${flight.airline.code}_100_100_s.png`;

  const [open, setOpen] = useState<boolean>(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [showPDFConfig, setShowPDFConfig] = useState(false);

  const handlePDFView = (config: PDFConfig) => {
    setShowPDFConfig(false);
    const params = new URLSearchParams({
      scale: config.scalePercentage,
      orientation: config.orientation,
    });

    window.open(
      `/meal-count-pdf/${flight.flightNumber}?${params.toString()}`,
      '_blank'
    );
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const departureTriggerRef = useRef<HTMLTableCellElement>(null);
  const arrivalTriggerRef = useRef<HTMLTableCellElement>(null);
  const paxTotalTriggerRef = useRef<HTMLTableCellElement>(null);
  const paxCabinsTriggerRef = useRef<HTMLTableCellElement>(null);

  const navigate = useNavigate();

  const handleFlightDetails = () => {
    setOpen(false);
    navigate(`/flight-details/${flight.id}`);
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

  const visibleCabinCounts = getDynamicCabinCounts(flight.passengers);
  // Get current departure/arrival status and time
  const depStatus = getDepartureType(flight);
  const arrStatus = getArrivalType(flight);

  // const fullRoute = flight.pairRoute || `${flight.departureDestination}-${flight.arrivalDestination}`;


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
              {formatTimeInHHMM(flight.scheduledDeparture || flight.scheduledDepartureUtc)}
            </td>
            <td className="py-1 px-2 font-medium text-center">
              {formatTimeInHHMM(flight.estimatedDeparture || flight.estimatedDepartureUtc)}
            </td>
            <td className="py-1 px-2 font-medium text-center">
              {formatTimeInHHMM(flight.actualDeparture || flight.actualDepartureUtc)}
            </td>

          </tr>
          <tr className="text-text-secondary">
            <td className="py-1 font-bold">Arrival</td>
            <td className="py-1 px-2 font-medium text-center">
              {formatTimeInHHMM(flight.scheduledArrivalUtc || flight.scheduledArrival)}
            </td>
            <td className="py-1 px-2 font-medium text-center">
              {formatTimeInHHMM(flight.estimatedArrivalUtc)}
            </td>
            <td className="py-1 px-2 font-medium text-center">
              {formatTimeInHHMM(flight.actualArrivalUtc)}
            </td>
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
        <h3 className="font-bold text-sm 3xl:text-lg text-text-primary">Passenger Count</h3>
        <div className="flex justify-between mt-2">
          <span>Business Studio</span>
          <span className="font-medium text-text-primary">
            {getPaxCount(flight.passengers.businessStudioCount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Business</span>
          <span className="font-medium text-text-primary">
            {getPaxCount(flight.passengers.businessCount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Economy</span>
          <span className="font-medium text-text-primary">
            {getPaxCount(flight.passengers.economyCount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Crew</span>
          <span className="font-medium text-text-primary">
            {getPaxCount(flight.passengers.crewCount)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showPDFConfig && (
        <PDFConfigModal
          flightNumber={flight.flightNumber}
          onClose={() => setShowPDFConfig(false)}
          onView={handlePDFView}
        />
      )}
      <tr className={`border-b border-border-muted hover:bg-bg-accent/20 text-sm bg-bg-surface font-arial relative ${isFirstInPair ? 'shadow-[0_-2px_4px_rgba(0,0,0,0.08)]' : ''
        } ${isLastInPair ? 'shadow-[0_2px_4px_rgba(0,0,0,0.08)]' : ''
        }`}>

        <td className="text-center py-2 px-3">
          <img
            src={logoUrl}
            alt={flight.airline.code}
            className="h-7 w-7 mx-auto"
          />
        </td>
        <td className="text-left  font-sm py-2 px-0 text-text-secondary">
          {!hideRoute && fullPairRoute}
        </td>
        <td className="text-left text-sm 3xl:text-lg font-bold text-text-primary py-2 px-3">
          {flight.flightNumber}{flight.flightNumberSuffix}
        </td>
        <td className="text-left font-semibold text-sm 3xl:text-lg py-2 px-3 text-text-primary">
          {flight.flightTypeIataCode || flight.flightType}
        </td>
        <td className="text-left font-semibold text-sm 3xl:text-lg py-2 px-3 text-text-secondary">
          {formatDate(flight.scheduledDepartureUtc || flight.scheduledDepartureUtc)}
        </td>

        <td
          ref={departureTriggerRef}
          onClick={() => handlePopover("departure")}
          className="text-left py-2 px-3 relative cursor-pointer"
        >
          <div
            className={`font-light text-sm ${getStatusColor(
              depStatus.type
            )}`}
          >
            {depStatus.type}
          </div>
          <div className="font-bold text-sm 3xl:text-lg text-text-primary">
            {depStatus.time}
          </div>
          <div className="text-bg-button font-semibold text-sm">
            {flight.departureDestination}
          </div>
          {activePopover === "departure" && <TimePopover />}
        </td>

        <td
          ref={arrivalTriggerRef}
          onClick={() => handlePopover("arrival")}
          className="text-left py-2 px-3 relative cursor-pointer"
        >
          <div
            className={`font-light text-sm ${getStatusColor(arrStatus.type)}`}
          >
            {arrStatus.type}
          </div>
          <div className="font-bold text-sm 3xl:text-lg text-text-primary">
            {arrStatus.time}
          </div>
          <div className="text-bg-button font-semibold text-sm">
            {flight.arrivalDestination}
          </div>
          {activePopover === "arrival" && <TimePopover />}
        </td>

        <td className="text-left py-2 px-3 relative">
          {/* REFACTORED: Use flight.status directly */}
          <span className={`font-semibold text-base ${flight.status}`}>
            {flight.status}
          </span>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
        </td>

        <td className="text-center py-2 px-3 text-sm relative">
          <div className="font-medium text-text-primary">
            {flight.aircraft.designator || flight.aircraft.type}
          </div>
          <div className="text-text-tertiary">
            {flight.aircraft.registration}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
        </td>

        <td className="py-2 px-3 text-sm text-text-secondary leading-tight relative">
          {flight.loadingPlan?.name && <div className="mb-1">📄 {flight.loadingPlan.name}</div>}

          {flight.mealPlan?.name ? (
            <div>{flight.mealPlan.name}</div>
          ) : (
            <div className="text-red-500">no meal plan</div>
          )}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
        </td>

        <td
          ref={paxTotalTriggerRef}
          onClick={() => handlePopover("paxTotal")}
          className="text-center py-2 px-3 relative cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={SeatIcon} alt="Seats" />
            <span className="font-bold text-base text-text-primary">
              {getPaxCount(flight.passengers.totalCount)}
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
          {visibleCabinCounts.length > 0 ? (
            <div className="flex flex-col gap-0.5 text-left">
              {visibleCabinCounts.map(({ key, label, count }) => (
                <div key={key} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-text-secondary w-4/5 truncate">{label}</span>
                  <span className="font-medium text-text-primary text-right w-1/5">
                    {getPaxCount(count)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-xs text-text-tertiary pt-2"></div>
          )}
          {activePopover === "paxCabins" && <PaxPopover />}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>
        </td>
        {/* <td
          ref={paxCabinsTriggerRef}
          onClick={() => handlePopover("paxCabins")}
          className="py-2 px-3 text-sm text-text-secondary relative cursor-pointer"
        >
          <div className="grid grid-cols-2 text-left "> */}
        {/* Top-Left: Business Studio */}
        {/* <div className="py-1 px-1 ">
              <span className="text-left text-text-secondary">
                Business Studio
              </span>
              <span className="text-left font-medium text-text-primary">
                {" "}
                {getPaxCount(flight.passengers.businessStudioCount)}
              </span>
            </div> */}
        {/* Top-Right: Economy */}
        {/* <div className="py-1 px-1 d">
              <span className="text-left text-text-secondary">Economy</span>
              <span className="text-left font-medium text-text-primary">
                {" "}
                {getPaxCount(flight.passengers.economyCount)}
              </span>
            </div> */}
        {/* Bottom-Left: Business (Previously First/Business) */}
        {/* <div className="py-1 px-1 ">
              <span className="text-left text-text-secondary">Business</span>
              <span className="text-left font-medium text-text-primary">
                {" "}
                {getPaxCount(flight.passengers.businessCount)}
              </span>
            </div> */}
        {/* Bottom-Right: Crew (Previously Premium/Crew) */}
        {/* <div className="py-1 px-1">
              <span className="text-left text-text-secondary">Crew</span>
              <span className="text-left font-medium text-text-primary">
                {" "}
                {getPaxCount(flight.passengers.crewCount)}
              </span>
            </div>
          </div>
          {activePopover === "paxCabins" && <PaxPopover />}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-border-secondary"></div>

        </td> */}

        <td className="py-2 px-3 text-base">
          <div className="flex items-center justify-between  pe-2 box-border gap-2  3xl:gap-3  text-text-tertiary">
            <Tooltip text="Distribution incomplete">
              <img src={WarningColouredIcon} className="h-4.5 w-4.5   3xl:h-6 3xl:w-6 cursor-pointer" alt="Warning" />
            </Tooltip>
            <Tooltip text="Meals">
              <img
                src={ForkKnifeIcon}
                className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer"
                onClick={() => setShowPDFConfig(true)}
                alt="Meals"
              />
            </Tooltip>

            <Tooltip text="Build">
              <img src={PackageSealedIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Build" />
            </Tooltip>

            <Tooltip text="Seal">
              <img src={SignatureIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Seal" />
            </Tooltip>

            <Tooltip text="Lock">
              <img src={LockKeyIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Lock" />
            </Tooltip>

            <Tooltip text="Check">
              <img src={CheckCircleIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Check" />
            </Tooltip>

            <Tooltip text="Temperature">
              <img src={ThermometerIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Temperature" />
            </Tooltip>

            <Tooltip text="Delivery">
              <img src={TruckIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Delivery" />
            </Tooltip>

            <Tooltip text="Customs">
              <img src={GuardIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Customs" />
            </Tooltip>
            <img src={ClipboardTextIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Clipboard" />


            <img src={ReceiptIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Receipt" />
            <div className="relative inline-block" ref={menuRef}>
              <img src={CogIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" onClick={() => setOpen(!open)} alt="Settings" />

              {open && (
                <Dropdown
                  actions={[
                    {
                      icon: <img src={DetailIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Details Icon" />,
                      label: "Details",
                      onClick: handleFlightDetails,
                    },
                    {
                      icon: <img src={EditIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="Edit Icon" />,
                      label: "Edit",
                      onClick: handleFlightDetails,
                    },
                    {
                      icon: <img src={HistoryIcon} className="h-4.5 w-4.5  3xl:h-6 3xl:w-6 cursor-pointer" alt="History Icon" />,
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
    </>
  );
};
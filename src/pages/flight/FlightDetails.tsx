import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FlightPreparations from "../../components/flight/preparation/FlightPreparations";
import FlightFoodOrder from "../../components/flight/FlightFoodOrder";
import FlightGalleys from "../../components/flight/FlightGalleys";
import FlightContLoc from "../../components/flight/FlightContLoc";
import FlightDeliveries from "../../components/flight/delivery/FlightDeliveries";
import FlightLabels from "../../components/flight/FlightLabels";
import FlightLegsDisplay from "../../components/flight/flightInfo/FlightLegsDisplay";
import { Breadcrumb } from "../../components/BreadCrumb";
// import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";
// import { useFlightStore } from "../../store/useFlightStore";
import { formatDateToDDMonYYYY } from "../../lib/utils";
import { useFlightStore } from "../../store/flight";

const tabKeys = [
  "Flight Info",
  "Preparations",
  "Food Orders",
  "Content Locn",
  "Galleys",
  "Labels/Reports",
  "Deliveries",
  "Invoice",
];

function FlightDetails() {
  const { flightNumber } = useParams<{ flightNumber: string }>();
  // For Now Its Disabled
  // const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || tabKeys[0];
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const { flightData, fetchFlight } = useFlightStore();


  useEffect(() => {
    if (flightNumber) fetchFlight(flightNumber);
  }, [flightNumber, fetchFlight]);

  const selectedFlight = flightData?.find(f => f.selectedFlight === true) || null;

  if (!flightData) {
    return (
      <div className="p-6">
        {/* <h1 className="text-xl font-semibold text-red-600">
          {t("flightDetails.notFound")}
        </h1> */}
      </div>
    );
  }



  return (
    <>
      <Navbar onMenuClick={() => { }} />
      <div className="p-2 sm:p-8">
        <Breadcrumb
          handleDetailsNav={() => setActiveTab("Flight Info")}
          currentScreen={activeTab}
        />

        <div className="flex flex-wrap font-rubik gap-4 mt-6">
          {isLoading ? ([...Array(7)].map((_, idx) => (
            <div key={idx} className="flex gap-2">
              <div className="relative h-4 w-16 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
              <div className="relative h-4 w-24 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            </div>
          ))) :
            selectedFlight ? <>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  Flight:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {selectedFlight.flightNumber}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  Route:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {selectedFlight.pairRoute}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  Complete Date:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {formatDateToDDMonYYYY(selectedFlight.scheduledDepartureUtc)}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  Aircraft:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {selectedFlight.aircraft?.type}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  AC Reg.:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {selectedFlight.aircraft?.registration}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  Destination:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {selectedFlight.arrivalDestination || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary text-sm font-normal">
                  Loading Plan:{" "}
                </span>
                <span className="font-medium text-base text-text-secondary">
                  {selectedFlight.loadingPlan?.name || "N/A"}
                </span>
              </div>
            </> : null}
        </div>

        <div className="overflow-x-auto overflow-y-hidden my-6">
          {isLoading ? <div className="relative h-16 rounded-full bg-gray-200 overflow-hidden animate-pulse duration-75">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div> :
            <div className="flex font-roboto items-stretch border rounded-full border-border-muted w-full bg-white overflow-x-auto">
              {tabKeys.map((tab, index) => (
                <div
                  key={tab}
                  className="relative flex-1 flex items-center justify-center"
                >
                  <button
                    onClick={() => (tab !== "Invoice") && setActiveTab(tab)}
                    className={`relative w-full h-full px-2 py-3 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden
                  ${activeTab === tab
                        ? "text-bg-button"
                        : tab === "Invoice" || tab === "Invoice" || tab === "Labels/Reports" || tab === "Deliveries" || tab === "Galleys"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-text-secondary hover:text-bg-button/80"
                      }`}
                    disabled={tab === "Invoice" || tab === "Galleys" || tab === "Deliveries" || tab === "Labels/Reports"}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium
                  ${activeTab === tab
                          ? "bg-bg-button text-white"
                          : "bg-bg-tertiary text-text-secondary"
                        }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {tab}
                    </span>

                    {/* Bottom border indicator for active tab */}
                    {activeTab === tab && (
                      <span
                        className={`absolute bottom-0 h-1 bg-bg-button ${index === 0
                          ? "left-4 right-0"
                          : index === tabKeys.length - 1
                            ? "left-0 right-4"
                            : "left-0 right-0"
                          }`}
                      ></span>
                    )}
                  </button>

                  {/* Separator with pointed edges */}
                  {index < tabKeys.length - 1 && (
                    <div className="relative w-0 h-12 flex items-center">
                      <svg
                        width="16"
                        height="48"
                        viewBox="0 0 16 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-0 z-10"
                        style={{ transform: "translateX(-50%)" }}
                      >
                        {/* Vertical line from top, wider pointed middle section, vertical line to bottom */}
                        <path
                          d="M8 0 L8 14 L14 24 L8 34 L8 48"
                          stroke="#D1D5DB"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>}
        </div>

        <div className="bg-white rounded-xl mt-3 sm:mt-4 min-w-full min-h-[250px]">
          {/* Use the tab keys for conditional rendering */}
          {activeTab === "Flight Info" && (
            <FlightLegsDisplay
              legs={flightData.map((flight) => flight)}
            />
          )}
          {activeTab !== "Flight Info" && (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-full">
                {activeTab === "Preparations" && <FlightPreparations flightId={flightData[0].id} />}
                {activeTab === "Food Orders" && <FlightFoodOrder flightNumber={flightData[0].flightNumber} />}
                {activeTab === "Galleys" && <FlightGalleys />}
                {activeTab === "Content Locn" && <FlightContLoc />}
                {activeTab === "Deliveries" && <FlightDeliveries />}
                {activeTab === "Labels/Reports" && <FlightLabels />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FlightDetails;

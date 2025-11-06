import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { flights } from "../../const/flightData";
import FlightPreparations from "../../components/flight/FlightPreparations";
import FlightFoodOrder from "../../components/flight/FlightFoodOrder";
import FlightGalleys from "../../components/flight/FlightGalleys";
import FlightContLoc from "../../components/flight/FlightContLoc";
import FlightDeliveries from "../../components/flight/delivery/FlightDeliveries";
import FlightLabels from "../../components/flight/FlightLabels";
import FlightLegsDisplay from "../../components/flight/FlightLegsDisplay";
import { Breadcrumb } from "../../components/BreadCrumb";
import { useTranslation } from "react-i18next";

const tabKeys = [
  "Details",
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
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || tabKeys[0];
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const flight = flights.flat().find((f) => f.flightNumber === flightNumber);

  if (!flight) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">
          {t("flightDetails.notFound")}
        </h1>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-8">
      <nav className="w-full bg-bg-surface h-14 sm:h-16 flex items-center justify-between"></nav>

      <Breadcrumb
        handleDetailsNav={() => setActiveTab("Details")}
        currentScreen={activeTab}
      />

      <div className="flex flex-wrap font-rubik gap-4 mt-6">
        <div>
          <span className="text-text-tertiary text-sm font-normal">
            Flight:{" "}
          </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.flightNumber}
          </span>
        </div>
        <div>
          <span className="text-text-tertiary text-sm font-normal">
            Route:{" "}
          </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.route}
          </span>
        </div>
        <div>
          <span className="text-text-tertiary text-sm font-normal">Date: </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.date}
          </span>
        </div>
        <div>
          <span className="text-text-tertiary text-sm font-normal">
            Aircraft:{" "}
          </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.acType}
          </span>
        </div>
        <div>
          <span className="text-text-tertiary text-sm font-normal">
            AC Reg.:{" "}
          </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.acReg}
          </span>
        </div>
        <div>
          <span className="text-text-tertiary text-sm font-normal">
            Destination:{" "}
          </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.departure}
          </span>
        </div>
        <div>
          <span className="text-text-tertiary text-sm font-normal">
            Loading Plan:{" "}
          </span>
          <span className="font-medium text-base text-text-secondary">
            {flight.plan}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto my-3 sm:my-4">
        <div className="flex font-roboto bg-bg-surface rounded-full shadow min-w-max border border-border-muted">
          {tabKeys.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-roboto capitalize transition-all duration-500 cursor-pointer flex-1 min-w-[120px] md:min-w-[140px] px-3 py-2 sm:py-3 text-xs md:text-sm font-medium text-center items-center
              ${index == 0 ? "rounded-l-full" : ""}
              ${index == tab.length ? "rounded-r-full" : ""}
              ${index == 0 || index == tab.length ? "" : "border border-gray-100 "} ${activeTab === tab
                ? "border-b-4 border-b-bg-button text-bg-button shadow-md"
                : "text-text-secondary hover:bg-bg-button hover:text-white"
              }`}>
              <span className={`inline-block w-6 py-1 rounded-full text-xs ${activeTab === tab
                ? "bg-bg-button text-white shadow-md"
                : "text-text-secondary bg-border-muted"} `}>
                {'0' + (index + 1)}
              </span> &ensp; {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl mt-3 sm:mt-4 min-w-full min-h-[250px]">
        {/* Use the tab keys for conditional rendering */}
        {activeTab === "Details" && (
          <FlightLegsDisplay
            legs={[
              {
                route: `${flight.depStation}-${flight.arrStation}`,
                flightNumber: flight.flightNumber,
                type: flight.type,
                date: flight.date,
                depTime: flight.departure,
                arrTime: flight.arrival,
                acType: flight.acType,
                acReg: flight.acReg,
                direction: "",
                businessStudio: 0,
                business: parseInt(flight.pax.business.split("/")[0]) || 4,
                economy: parseInt(flight.pax.economy.split("/")[0]) || 118,
                crew: 0,
                child: 0,
                crewCount: 0,
                status: flight.status,
                loadingPlan: flight.plan!,
                mealPlan: "No Meal Plan",
                crewFlightReports: ["NA"],
                alerts: ["NA", "NA"],
                cutOffTimes: {
                  meals: "NA",
                  commissary: "NA",
                },
              },
              {
                route: `${flight.arrStation}-${flight.depStation}`,
                flightNumber: flight.flightNumber.replace(/\d+/, (match) =>
                  (parseInt(match) + 1).toString()
                ),
                type: flight.type,
                date: flight.date,
                depTime: "01:25",
                arrTime: "05:40",
                acType: flight.acType,
                acReg: flight.acReg,
                direction: "",
                businessStudio: 0,
                business: 7,
                economy: 108,
                crew: 0,
                child: 0,
                crewCount: 0,
                status: flight.status,
                loadingPlan: "",
                mealPlan: "No Meal Plan",
                crewFlightReports: ["NA"],
                alerts: ["NA", "NA"],
                cutOffTimes: {
                  meals: "NA",
                  commissary: "NA",
                },
              },
            ]}
          />
        )}
        {activeTab !== "Details" && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full">
              {activeTab === "Preparations" && <FlightPreparations />}
              {activeTab === "Food Orders" && <FlightFoodOrder />}
              {activeTab === "Galleys" && <FlightGalleys />}
              {activeTab === "Content Locn" && <FlightContLoc />}
              {activeTab === "Deliveries" && <FlightDeliveries />}
              {activeTab === "Labels/Reports" && <FlightLabels />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightDetails;

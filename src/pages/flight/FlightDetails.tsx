import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { flights } from "../../const/flightData";
import FlightPreparations from "../../components/flight/FlightPreparations";
import Button from "../../components/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlightFoodOrder from "../../components/flight/FlightFoodOrder";
import FlightGalleys from "../../components/flight/FlightGalleys";
import FlightContLoc from "../../components/flight/FlightContLoc";
import FlightDeliveries from "../../components/flight/FlightDeliveries";
import FlightLabels from "../../components/flight/FlightLabels";
import FlightLegsDisplay from "../../components/flight/FlightLegsDisplay";
import { useTranslation } from "react-i18next";

// Use keys for logic and mapping
// These keys will match the 'tabs' object in your translation JSON files
const tabKeys = [
  "details",
  "preparations",
  "food_orders",
  "content_locn",
  "galleys",
  "labels_reports",
  "deliveries",
  "invoice",
];

function FlightDetails() {
  const { flightNumber } = useParams<{ flightNumber: string }>();
  const { t } = useTranslation(); // Initialize the translation hook

  const [activeTab, setActiveTab] = useState(() => {
    // Default to the first tab key
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
    <div className="p-2 sm:p-4">
      <nav className="w-full bg-white h-14 sm:h-16 flex items-center justify-between">
        <Button className="bg-blue-400" to="/flight-list">
          <div className="flex flex-row justify-center items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
            <p className="text-sm sm:text-base">
              {t("flightDetails.backButton")}
            </p>
          </div>
        </Button>
      </nav>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow rounded-xl p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-start">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-blue-800 mb-1 sm:mb-2">
            {/* Use interpolation for dynamic values */}
            {t("flightDetails.info.title", {
              flightNumber: flight.flightNumber,
            })}
          </h1>
          <p className="text-sm sm:text-lg text-gray-700 font-medium">
            {flight.airlineCode} • {flight.type}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {flight.date} |{" "}
            <span className="font-semibold">{flight.status}</span>
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-xs sm:text-sm text-gray-500">
            {t("flightDetails.info.route")}
          </p>
          <h2 className="text-base sm:text-xl font-semibold text-gray-800">
            {flight.depStation} → {flight.arrStation}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t("flightDetails.info.departure")}{" "}
            <span className="font-medium">{flight.departure}</span> •{" "}
            {t("flightDetails.info.arrival")}{" "}
            <span className="font-medium">{flight.arrival}</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto mt-3 sm:mt-4">
        <div className="flex gap-2 bg-blue-400 rounded-lg shadow p-1 min-w-max">
          {/* Map over the tab keys */}
          {tabKeys.map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`flex-1 min-w-[120px] md:min-w-[140px] px-3 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-center transition-all ${
                activeTab === tabKey
                  ? "bg-blue-100 text-blue-400 shadow-md"
                  : "text-white hover:bg-blue-300"
              }`}
            >
              {/* Use the key to get the translated display text */}
              {t(`flightDetails.tabs.${tabKey}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl mt-3 sm:mt-4 p-3 sm:p-3 min-w-full min-h-[250px]">
        {/* Use the tab keys for conditional rendering */}
        {activeTab === "details" && (
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
                loadingPlan: flight.plan,
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
        {activeTab !== "details" && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full">
              {activeTab === "preparations" && <FlightPreparations />}
              {activeTab === "food_orders" && <FlightFoodOrder />}
              {activeTab === "galleys" && <FlightGalleys />}
              {activeTab === "content_locn" && <FlightContLoc />}
              {activeTab === "deliveries" && <FlightDeliveries />}
              {activeTab === "labels_reports" && <FlightLabels />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightDetails;

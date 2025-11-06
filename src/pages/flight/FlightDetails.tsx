import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { flights } from "../../const/flightData";
import FlightPreparations from "../../components/flight/FlightPreparations";
import FlightFoodOrder from "../../components/flight/FlightFoodOrder";
import FlightGalleys from "../../components/flight/FlightGalleys";
import FlightContLoc from "../../components/flight/FlightContLoc";
import FlightDeliveries from "../../components/flight/FlightDeliveries";
import FlightLabels from "../../components/flight/FlightLabels";
import { Breadcrumb } from "../../components/BreadCrumb";
import { useTranslation } from "react-i18next";

const tabKeys = [
  "details",
  "preparations",
  "food_orders",
  "content locn",
  "galleys",
  "labels reports",
  "deliveries",
  "invoice",
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
      <nav className="w-full bg-white h-14 sm:h-16 flex items-center justify-between"></nav>

      {/* <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow rounded-xl p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-start">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-blue-800 mb-1 sm:mb-2">
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
      </div> */}

      <Breadcrumb
        handleDetailsNav={() => setActiveTab("details")}
        currentScreen={activeTab}
      />

      <div className="flex flex-wrap font-rubik gap-4 mt-6">
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">Flight: </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.flightNumber}
          </span>
        </div>
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">Route: </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.route}
          </span>
        </div>
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">Date: </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.date}
          </span>
        </div>
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">Aircraft: </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.acType}
          </span>
        </div>
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">AC Reg.: </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.acReg}
          </span>
        </div>
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">
            Destination:{" "}
          </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.departure}
          </span>
        </div>
        <div>
          <span className="text-[#A09CAB] text-sm font-normal">
            Loading Plan:{" "}
          </span>
          <span className="font-medium text-base text-[#4F4B58]">
            {flight.plan}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto my-3 sm:my-4">
        <div className="flex bg-white rounded-full shadow min-w-max border border-gray-100">
          {tabKeys.map((tab, index) => (
            <>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-roboto capitalize cursor-pointer flex-1 min-w-[120px] md:min-w-[140px] px-3 py-2 sm:py-3 text-xs font-semibold text-center transition-all 
              ${index == 0 ? "rounded-l-full" : ""}
              ${index == tab.length ? "rounded-r-full" : ""}
              ${
                index == 0 || index == tab.length
                  ? ""
                  : "border border-gray-100 "
              } ${
                  activeTab === tab
                    ? "border-b-4 border-b-[#602AF3] text-[#602AF3] shadow-md"
                    : "text-[#4F4B58] hover:bg-[#602AF3] hover:text-white"
                }`}
              >
                <span
                  className={`inline-block w-6 py-1 rounded-full ${
                    activeTab === tab
                      ? "bg-[#602AF3] text-white shadow-md"
                      : "text-[#4F4B58] bg-[#EAE9EC]"
                  } `}
                >
                  {"0" + (index + 1)}
                </span>{" "}
                &ensp; {tab}
              </button>
            </>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl mt-3 sm:mt-4 p-3 sm:p-6 min-w-full min-h-[250px]">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-gray-800">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase">
                {t("flightDetails.detailsPane.aircraft")}
              </h3>
              <p className="text-sm sm:text-lg font-semibold">
                {flight.acType}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{flight.acReg}</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase">
                {t("flightDetails.detailsPane.groundTime")}
              </h3>
              <p className="text-sm sm:text-lg font-semibold">
                {flight.groundTime}
              </p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase">
                {t("flightDetails.detailsPane.plan")}
              </h3>
              <p className="text-sm sm:text-lg font-semibold">{flight.plan}</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase">
                {t("flightDetails.detailsPane.passengers")}
              </h3>
              <p className="text-sm sm:text-lg font-semibold">
                {flight.paxTotal} {t("flightDetails.detailsPane.total")}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                <span className="font-medium text-yellow-600">F:</span>{" "}
                {flight.pax.first} |{" "}
                <span className="font-medium text-blue-400">C:</span>{" "}
                {flight.pax.business} |{" "}
                <span className="font-medium text-purple-600">P:</span>{" "}
                {flight.pax.premium} |{" "}
                <span className="font-medium text-green-600">Y:</span>{" "}
                {flight.pax.economy}
              </p>
            </div>
          </div>
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

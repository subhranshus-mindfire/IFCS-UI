import { useState } from "react";
import GalleyLabel from "../GalleyLabel";

const FlightLabels = () => {
  const [activeTab, setActiveTab] = useState("LABELS");

  const sampleFlight = {
    airlineCode: "WY",
    route: "MCT-MNL-MCT",
    flightNumber: "WY843",
    type: "A40SK",
    date: "SEP8 [NA]",
    departure: "10:30",
    arrival: "18:45",
    depStation: "MCT",
    arrStation: "MNL",
    status: "Active",
    acType: "A40SK",
    acReg: "A40SK",
    groundTime: "2h 15m",
    plan: "ATLAS",
    paxTotal: 180,
    pax: {
      first: "12",
      business: "24",
      premium: "36",
      economy: "108",
    },
  };

  const outboundPreparations = [
    {
      stowage: "101T",
      carrier: "JC Headsets",
      equipment: "Dry Stores",
      preparedBy: "John Smith",
    },
    {
      stowage: "102T",
      carrier: "JC Oven",
      equipment: "Tray Set Up",
      preparedBy: "Sarah Johnson",
    },
  ];

  const inboundPreparations = [
    {
      stowage: "201T",
      carrier: "1.5 LT Water",
      equipment: "Dry Stores",
      preparedBy: "Mike Wilson",
    },
  ];

  const currentDate = new Date().toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* Tab Buttons */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("LABELS")}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-l-lg font-medium text-sm transition-colors duration-200 ${
            activeTab === "LABELS"
              ? "bg-gray-400 text-black shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          LABELS
        </button>
        <button
          onClick={() => setActiveTab("REPORTS")}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-r-lg font-medium text-sm transition-colors duration-200 ${
            activeTab === "REPORTS"
              ? "bg-gray-400 text-black shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          REPORTS
        </button>
      </div>

      <div className="text-xs text-gray-500 mb-6">Generated {currentDate}</div>

      {activeTab === "LABELS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Outbound Labels Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4 border-b pb-2">
              Print Outbound Labels
            </h3>

            <div className="space-y-4">
              {outboundPreparations.map((prep, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md transition-shadow hover:shadow-sm"
                >
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <GalleyLabel preparation={prep} flight={sampleFlight} />
                  </div>
                  <div className="sm:ml-4 flex-1 w-full sm:w-auto">
                    <div className="font-medium text-gray-800">
                      {prep.equipment}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="block sm:inline">
                        Stowage: {prep.stowage}
                      </span>
                      <span className="hidden sm:inline"> | </span>
                      <span className="block sm:inline">
                        Prepared by: {prep.preparedBy}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inbound Labels Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4 border-b pb-2">
              Print Inbound Labels
            </h3>

            <div className="space-y-4">
              {inboundPreparations.map((prep, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md transition-shadow hover:shadow-sm"
                >
                  <div className="flex-shrink-0 mb-3 sm:mb-0">
                    <GalleyLabel
                      preparation={{
                        ...prep,
                        carrier: prep.carrier.replace(
                          "1.5 LT Water",
                          "1.5 LT Water X8"
                        ),
                      }}
                      flight={sampleFlight}
                    />
                  </div>
                  <div className="sm:ml-4 flex-1 w-full sm:w-auto">
                    <div className="font-medium text-gray-800">
                      {prep.equipment}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="block sm:inline">
                        Stowage: {prep.stowage}
                      </span>
                      <span className="hidden sm:inline"> | </span>
                      <span className="block sm:inline">
                        Prepared by: {prep.preparedBy}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "REPORTS" && (
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
          <div className="text-gray-500">
            <h3 className="text-lg font-medium mb-2">Reports Section</h3>
            <p>
              Report generation and management tools will be available here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightLabels;

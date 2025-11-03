import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faCogs,
  faClipboardList,
  faUsers,
  faCheckCircle,
  faRotateRight,
  faClock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import airTransat from "../../assets/logos/airTransat.png";
import FlightRow from "../../components/flight/FlightRow";
import { flights } from "../../const/flightData";
import Button from "../../components/Button";
import galleyXplanner from "../../assets/logos/galleyXplanner.png";

function FlightList() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-blue-100 w-full h-14 flex justify-between items-center px-2 shadow-sm">
        <Button className="bg-blue-400" to="/flights">
          <div className="flex flex-row justify-center items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
            <p className="text-sm sm:text-base">Flights</p>
          </div>
        </Button>
        <img src={airTransat} alt="User Logo" className="h-10 w-auto" />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <div className="bg-white shadow-md rounded-md w-full flex flex-col lg:flex-row justify-between items-center p-2 lg:p-3 gap-6">
          <div className="flex flex-col w-full lg:w-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Flights</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:flex lg:flex-row lg:gap-6 w-full">
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Station
                </label>
                <select className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                  <option value="">Select</option>
                  <option value="YYZ">Toronto (YYZ)</option>
                  <option value="YUL">Montreal (YUL)</option>
                  <option value="YVR">Vancouver (YVR)</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full sm:w-44 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Flight No.
                </label>
                <input
                  type="text"
                  placeholder="Enter Flight"
                  className="w-full sm:w-44 px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto lg:flex lg:justify-end">
            {[
              {
                label: "Flights",
                value: 94,
                icon: faPlane,
                color: "text-blue-400",
              },
              {
                label: "Complete",
                value: 0,
                icon: faCheckCircle,
                color: "text-green-500",
              },
              {
                label: "In Progress",
                value: 0,
                icon: faRotateRight,
                color: "text-yellow-500",
              },
              {
                label: "Waiting",
                value: 94,
                icon: faClock,
                color: "text-blue-400",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50 shadow-sm"
              >
                <h1 className="text-xl font-bold text-gray-800">
                  {item.value}
                </h1>
                <h3 className="text-gray-500 text-xs">{item.label}</h3>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`${item.color} mt-2 text-lg`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <div className="min-w-[1400px]">
            <div className="grid grid-cols-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-bold sticky top-0 z-20">
              <div className="col-span-8 flex items-center justify-center gap-2 py-3 border-r-2 border-gray-400">
                <FontAwesomeIcon icon={faPlane} className="text-blue-400" />
                <span>Flight Info</span>
              </div>
              <div className="col-span-2 flex items-center justify-center gap-2 py-3 border-r-2 border-gray-400">
                <FontAwesomeIcon icon={faCogs} className="text-green-400" />
                <span>Aircraft</span>
              </div>
              <div className="col-span-1 flex items-center justify-center gap-2 py-3 border-r-2 border-gray-400">
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="text-yellow-400"
                />
                <span>Plan</span>
              </div>
              <div className="col-span-5 flex items-center justify-center gap-2 py-3 border-r-2 border-gray-400">
                <FontAwesomeIcon icon={faUsers} className="text-purple-400" />
                <span>PAX</span>
              </div>
              <div className="col-span-4 flex items-center justify-center gap-2 py-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-red-400"
                />
                <span>Status</span>
              </div>
            </div>

            <div className="grid grid-cols-20 bg-gray-100 text-xs font-semibold border-b border-gray-300">
              {[
                "Airline",
                "Route",
                "Flight",
                "Type",
                "Date",
                "Departure",
                "Arrival",
                "Status",
                "AC / Reg",
                "Ground",
                "Plan",
                "Total",
                "Config",
                "",
              ].map((label, idx) => (
                <div
                  key={idx}
                  className={`text-center py-2 border-r border-gray-300 ${
                    idx === 13
                      ? "col-span-4"
                      : idx === 12
                      ? "col-span-4"
                      : "col-span-1"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="divide-y divide-gray-200 overflow-y-auto max-h-[calc(100vh-12rem)] mb-10">
              {flights.map((pair, idx) => (
                <div key={idx} className=" border-b-2 border-black">
                  {pair.map((flight, subIdx) => (
                    <FlightRow key={subIdx} {...flight} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full flex items-center bg-gray-400 h-7 fixed bottom-0 z-10">
        <img src={galleyXplanner} alt="Bottom Logo" className="w-28" />
      </footer>
    </div>
  );
}

export default FlightList;

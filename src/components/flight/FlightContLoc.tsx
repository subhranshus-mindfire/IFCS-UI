import { useState } from "react";
import { galleryItems } from "../../const/galleyItems";
import flightSkeletonImage from "../../assets/flight-skeleton.jpeg";

const FlightContLoc = () => {
  const [selectedItem, setSelectedItem] = useState(galleryItems[0]);
  const [activeContentTab, setActiveContentTab] = useState("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGalley, setSelectedGalley] = useState<string | null>("G1");

  const filteredItems = galleryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface w-full max-w-full font-rubik">
      <h2 className="text-base font-normal text-gray-800">Items</h2>
      {/* Tabs - Pill Style */}
      <div className="flex bg-surface overflow-x-auto pt-4 gap-2">
        <button
          className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm transition-all ${
            activeContentTab === "static"
              ? "bg-gray-300 text-gray-800 font-normal shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          onClick={() => setActiveContentTab("static")}
        >
          Static Content
        </button>
        <button
          className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm transition-all ${
            activeContentTab === "dynamic"
              ? "bg-gray-300 text-gray-800 font-normal shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Dynamic Content
        </button>
        <button
          className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm transition-all ${
            activeContentTab === "deadhead"
              ? "bg-gray-300 text-gray-800 font-normal shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          onClick={() => setActiveContentTab("deadhead")}
        >
          Dead Head
        </button>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-secondary pt-4">
        {/* Left Section - Items */}
        <div className="lg:col-span-3 bg-surface flex flex-col rounded-lg">
          {/* Search Input */}
          <div className="border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center ${
                  selectedItem.id === item.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="text-sm text-gray-600">{item.name}</div>
                <div className="text-xs text-gray-400">
                  {item.locations[0]?.name || "G1"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Details & Galley Locations */}
        <div className="lg:col-span-6 flex flex-col gap-4 px-4">
          {/* Details Section */}
          <div className="bg-[--color-bg-surface] rounded-lg">
            <div className="">
              <h2 className="text-base font-normal text-gray-800">Details</h2>
            </div>
            <div className="pt-4 min-h-[150px]">
              <p className="text-sm text-gray-400 mb-2">Equipment Preview</p>
              {/* Empty preview area */}
            </div>
          </div>

          {/* Galley Locations Table */}
          <div className="bg-[--color-bg-surface] flex-1 rounded-lg">
            <div className="">
              <h2 className="text-base font-normal text-gray-800">
                Galley Locations
              </h2>
            </div>
            <div className="pt-4">
              <div className="overflow-x-auto overflow-y-auto max-h-[400px] border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                        {activeContentTab === "deadhead" ? "Name" : "Galley"}
                      </th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                        Storage
                      </th>
                      <th className="text-right py-3 px-4 text-gray-700 font-semibold">
                        Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {activeContentTab === "deadhead" ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 text-center text-gray-400"
                        >
                          No data available
                        </td>
                      </tr>
                    ) : (
                      selectedItem.locations.map((location, index) => (
                        <tr key={index}>
                          <td className="py-3 px-4 text-gray-600">
                            {location.name}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {location.storage}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {location.qty}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Aircraft Galley Layout */}
        <div className="lg:col-span-3 bg-[--color-bg-surface] flex flex-col rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-base font-normal text-gray-800">
              Galley Locations in Aircraft
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 relative">
            {/* Aircraft Image with Side Buttons */}
            <div className="relative flex items-start gap-2">
              <img
                src={flightSkeletonImage}
                alt="Aircraft Layout"
                className="h-[450px] w-auto object-contain"
              />

              {/* Galley Buttons - Right Side */}
              {/* Top Group - G1 and G2 close together */}
              <div className="flex flex-col gap-1">
                <button
                  className={`px-5 py-1.5 rounded-full text-xs font-medium transition-colors min-w-[60px] ${
                    selectedGalley === "G1"
                      ? "bg-purple-900 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => setSelectedGalley("G1")}
                >
                  G1
                </button>
                <button
                  className={`px-5 py-1.5 rounded-full text-xs font-medium transition-colors min-w-[60px] ${
                    selectedGalley === "G2"
                      ? "bg-purple-900 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => setSelectedGalley("G2")}
                >
                  G2
                </button>
                <div className="flex flex-col gap-1 mt-4">
                  <button
                    className={`px-5 py-1.5 rounded-full text-xs font-medium transition-colors min-w-[60px] ${
                      selectedGalley === "G3"
                        ? "bg-purple-900 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedGalley("G3")}
                  >
                    G3
                  </button>
                  <button
                    className={`px-5 py-1.5 mt-4 rounded-full text-xs font-medium transition-colors min-w-[60px] ${
                      selectedGalley === "G4"
                        ? "bg-purple-900 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedGalley("G4")}
                  >
                    G4
                  </button>
                </div>
              </div>
            </div>

            {/* BULK and BELLY Buttons - Below Aircraft */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                className={`px-5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedGalley === "BULK"
                    ? "bg-orange-400 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedGalley("BULK")}
              >
                BULK
              </button>
              <button
                className={`px-5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedGalley === "BELLY"
                    ? "bg-orange-400 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedGalley("BELLY")}
              >
                BELLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightContLoc;

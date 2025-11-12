import { useState } from "react";
import { galleryItems } from "../../const/galleyItems";
import flightSkeletonImage from "../../assets/flight-skeleton.jpeg";
import { SortIcon } from "../../assets/icons";

const FlightContLoc = () => {
  const [selectedItem, setSelectedItem] = useState(galleryItems[0]);
  const [activeContentTab, setActiveContentTab] = useState("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGalley, setSelectedGalley] = useState<string | null>("G1");

  const filteredItems = galleryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-bg-surface w-full max-w-full font-rubik">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Section - Items */}
        <div className="lg:col-span-3 bg-bg-secondary flex flex-col rounded-2xl border border-border-muted ">
          <div className="flex justify-between items-center p-4 border-b border-border-muted">
            <h2 className="text-base font-normal text-text-primary">Items</h2>
            <button className="text-sm font-normal text-text-secondary cursor-pointer underline hover:text-text-primary">
              Show All
            </button>
          </div>

          {/* Tabs - Pill Style */}
          <div className="flex overflow-x-auto px-4 pt-4 pb-2 gap-2">
            <button
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all ${
                activeContentTab === "static"
                  ? "bg-bg-secondary text-text-primary font-normal shadow-sm"
                  : "bg-gray-100 text-text-muted hover:bg-gray-200"
              }`}
              onClick={() => setActiveContentTab("static")}
            >
              Static Content
            </button>
            <button
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all ${
                activeContentTab === "dynamic"
                  ? "bg-bg-secondary text-text-primary font-normal shadow-sm "
                  : "bg-gray-100 text-text-muted hover:bg-gray-200"
              }`}
            >
              Dynamic Content
            </button>
            <button
              className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all ${
                activeContentTab === "deadhead"
                  ? "bg-bg-secondary text-text-primary font-normal shadow-sm"
                  : "bg-gray-100 text-text-muted hover:bg-gray-200"
              }`}
              onClick={() => setActiveContentTab("deadhead")}
            >
              Dead Head
            </button>
          </div>

          {/* Search Input with Sort Icon */}
          <div className="px-4 pb-4 pt-2 border-b border-border-muted">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-border-muted rounded-2xl text-sm text-text-primary placeholder-text-tertiary bg-bg-surface focus:outline-none focus:ring-1 focus:ring-border-accent focus:border-border-accent"
              />
              <button className="p-2 border border-border-muted rounded-lg hover:bg-bg-secondary transition-colors">
                <img src={SortIcon} alt="Sort" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-3 cursor-pointer hover:bg-bg-accent/30 flex justify-between items-center rounded-lg ${
                  selectedItem.id === item.id
                    ? "bg-bg-accent border border-border-accent"
                    : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="text-sm text-text-secondary">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Details & Galley Locations */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Details Section */}
          <div className="bg-bg-surface rounded-lg p-4">
            <h2 className="text-base font-normal text-text-primary mb-4">
              Details
            </h2>

            {/* Item Title and Description */}
            <div className="border border-border-muted rounded-2xl ">
              <div className="mb-2">
                <p className="text-base font-normal text-text-primary p-2 px-4">
                  {selectedItem.details.title}
                </p>
                <p className="text-base font-normal text-text-primary border-t border-border-muted p-2 px-4">
                  {selectedItem.details.description}
                </p>
              </div>

              {/* Equipment Preview */}
              <div className="min-h-[150px] p-2 px-4 border-t border-border-muted">
                <p className="text-xs text-text-tertiary">Equipment Preview</p>
              </div>
            </div>
          </div>

          {/* Galley Locations Table */}
          <div className="bg-bg-surface rounded-lg flex-1 p-4">
            <div className="">
              <h2 className="text-base font-normal text-text-primary">
                Galley Locations
              </h2>
            </div>
            <div className="mt-4">
              <div className="overflow-x-auto overflow-y-auto max-h-[400px] rounded-2xl border border-border-muted">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-bg-secondary">
                    <tr className="border-b border-border-muted">
                      <th className="text-left py-3 px-4 text-text-secondary font-semibold">
                        {activeContentTab === "deadhead" ? "Name" : "Name"}
                      </th>
                      <th className="text-left py-3 px-4 text-text-secondary font-semibold">
                        Stowage
                      </th>
                      <th className="text-right py-3 px-4 text-text-secondary font-semibold">
                        Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-bg-surface">
                    {activeContentTab === "deadhead" ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 text-center text-text-tertiary"
                        >
                          No data available
                        </td>
                      </tr>
                    ) : (
                      selectedItem.locations.map((location, index) => (
                        <tr
                          key={index}
                          className="border-b border-border-muted last:border-b-0"
                        >
                          <td className="py-3 px-4 text-text-secondary">
                            {location.name}
                          </td>
                          <td className="py-3 px-4 text-text-secondary">
                            {location.storage}
                          </td>
                          <td className="py-3 px-4 text-right text-text-secondary">
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
        <div className="lg:col-span-3 bg-bg-surface flex flex-col">
          <div className="p-4">
            <h2 className="text-base font-normal text-text-primary">
              Galley Locations in Aircraft
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 relative rounded-2xl border border-border-muted">
            {/* Aircraft Image with Floating Buttons */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={flightSkeletonImage}
                alt="Aircraft Layout"
                className="max-h-[500px] w-auto object-contain"
              />

              {/* G100 Button - Top Left */}
              <button
                className={`absolute top-[10%] left-[20%] px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedGalley === "G100"
                    ? "bg-bg-secondary text-text-primary border-2 border-border-accent"
                    : "bg-bg-secondary text-text-secondary border border-border-muted"
                }`}
                onClick={() => setSelectedGalley("G100")}
              >
                G100
              </button>

              {/* G200 Button - Top Right */}
              <button
                className={`absolute top-[5%] right-[5%] px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedGalley === "G200"
                    ? "bg-bg-primary text-white border-2 border-bg-primary"
                    : "bg-bg-primary/80 text-white border border-bg-primary"
                }`}
                onClick={() => setSelectedGalley("G200")}
              >
                G200
              </button>

              {/* G300 Button - Bottom Left */}
              <button
                className={`absolute bottom-[20%] left-[20%] px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedGalley === "G300"
                    ? "bg-bg-secondary text-text-primary border-2 border-border-accent"
                    : "bg-bg-secondary text-text-secondary border border-border-muted"
                }`}
                onClick={() => setSelectedGalley("G300")}
              >
                G300
              </button>

              {/* G400 Button - Bottom Right */}
              <button
                className={`absolute bottom-[15%] right-[5%] px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedGalley === "G400"
                    ? "bg-bg-secondary text-text-primary border-2 border-border-accent"
                    : "bg-bg-secondary text-text-secondary border border-border-muted"
                }`}
                onClick={() => setSelectedGalley("G400")}
              >
                G400
              </button>

              {/* BULK Button - Bottom Center Left */}
              <button
                className={`absolute bottom-[5%] left-[30%] px-5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedGalley === "Bulk"
                    ? "bg-bg-secondary text-text-primary border-2 border-border-accent"
                    : "bg-bg-secondary text-text-secondary border border-border-muted"
                }`}
                onClick={() => setSelectedGalley("Bulk")}
              >
                Bulk
              </button>

              {/* BELLY Button - Bottom Center Right */}
              <button
                className={`absolute bottom-[5%] right-[30%] px-5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedGalley === "Belly"
                    ? "bg-bg-secondary text-text-primary border-2 border-border-accent"
                    : "bg-bg-secondary text-text-secondary border border-border-muted"
                }`}
                onClick={() => setSelectedGalley("Belly")}
              >
                Belly
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightContLoc;

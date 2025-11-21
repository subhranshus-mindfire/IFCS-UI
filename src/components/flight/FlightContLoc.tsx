import { useEffect, useState } from "react";
import { galleryItems } from "../../const/galleyItems";
import flightSkeletonImage from "../../assets/flight-skeleton.jpeg";
import { SortIcon } from "../../assets/icons";
import React from "react";


interface GalleyCoordinate {
  name: string;
  position: 'Forward Left' | 'Forward Right' | 'Mid Left' | 'Mid Right' | 'Aft Left' | 'Aft Right';
  x: string;
  y: string;
}


const mockGalleyCoordinates: GalleyCoordinate[] = [
  {
    name: "G1",
    position: "Forward Right",
    y: "22.5px",
    x: "15%",
  },
  {
    name: "G2L",
    position: "Forward Left",
    y: "67.5px",
    x: "15%",
  },
  {
    name: "G2R-1",
    position: "Forward Right",
    y: "67.5px",
    x: "15%",
  },
  {
    name: "G2R-2",
    position: "Forward Right",
    y: "112.5px",
    x: "15%",
  },
  {
    name: "G3-1",
    position: "Mid Right",
    y: "222.5px",
    x: "15%",
  },
  {
    name: "G3-2",
    position: "Mid Right",
    y: "267.5px",
    x: "15%",
  },
  {
    name: "G5",
    position: "Aft Left",
    y: "52.5px",
    x: "15%",
  },
  {
    name: "G6",
    position: "Aft Right",
    y: "52.5px",
    x: "15%",
  }
];


const FlightContLoc = () => {
  const [selectedItem, setSelectedItem] = useState(galleryItems[0]);
  const [activeContentTab, setActiveContentTab] = useState("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGalleys, setSelectedGalleys] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const finalProcessedGalleys: GalleyCoordinate[] = mockGalleyCoordinates;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = galleryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Generates the dynamic CSS style object from the GalleyCoordinate.
   * Logic to use 'bottom' for Aft positions.
   */
  const getGalleyStyle = (galley: GalleyCoordinate): React.CSSProperties => {
    const style: React.CSSProperties = {};
    let transformValue = '';

    const isAft = galley.position.includes('Aft');
    const isLeft = galley.position.includes('Left');

    if (isAft) {
      style.bottom = galley.y;
    } else {
      style.top = galley.y;
    }

    if (isLeft) {
      style.left = galley.x;
      transformValue = 'translateX(-50%)';
    } else {
      style.right = galley.x;
      transformValue = 'translateX(50%)';
    }

    style.transform = transformValue.trim();

    return style;
  };

  /**
   * Toggles the selection state for a galley name in the array.
   */
  const toggleGalleySelection = (galleyName: string) => {
    setSelectedGalleys(prevSelected => {
      if (prevSelected.includes(galleyName)) {
        return prevSelected.filter(name => name !== galleyName);
      } else {
        return [...prevSelected, galleyName];
      }
    });
  };

  return (
    <div className="bg-bg-surface w-full max-w-full font-rubik">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Left Section - Items */}
        <div className="lg:col-span-3 bg-bg-secondary flex flex-col rounded-2xl border border-border-muted ">
          <div className="flex justify-between items-center p-4 border-b border-border-muted">
            {isLoading ? (
              <>
                <div className="relative h-5 w-16 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
                <div className="relative h-4 w-20 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-base font-normal text-text-primary">Items</h2>
                <button className="text-sm font-normal text-text-secondary cursor-pointer underline hover:text-text-primary">
                  Show All
                </button>
              </>
            )}
          </div>

          {/* Tabs - Pill Style */}
          <div className="flex overflow-x-auto px-4 pt-4 pb-2 gap-2">
            {isLoading ? (
              [...Array(3)].map((_, idx) => (
                <div key={idx} className="relative h-7 w-28 rounded-full bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              ))
            ) : (
              <>
                <button
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all ${activeContentTab === "static"
                    ? "bg-bg-secondary text-text-primary font-normal shadow-sm"
                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    }`}
                  onClick={() => setActiveContentTab("static")}
                >
                  Static Content
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all ${activeContentTab === "dynamic"
                    ? "bg-bg-secondary text-text-primary font-normal shadow-sm "
                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    }`}
                >
                  Dynamic Content
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-xs transition-all ${activeContentTab === "deadhead"
                    ? "bg-bg-secondary text-text-primary font-normal shadow-sm"
                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    }`}
                  onClick={() => setActiveContentTab("deadhead")}
                >
                  Dead Head
                </button></>)}
          </div>

          {/* Search Input with Sort Icon */}
          <div className="px-4 pb-4 pt-2 border-b border-border-muted">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="relative flex-1 h-10 rounded-2xl bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
                <div className="relative h-10 w-10 rounded-lg bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              </div>
            ) : (
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
              </div>)}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-2">
            {isLoading ? (
              [...Array(8)].map((_, idx) => (
                <div key={idx} className="px-4 py-3 rounded-lg mb-2">
                  <div className="relative h-5 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
              ))
            ) : (filteredItems.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-3 cursor-pointer hover:bg-bg-accent/30 flex justify-between items-center rounded-lg ${selectedItem.id === item.id
                  ? "bg-bg-accent border border-border-accent"
                  : ""
                  }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="text-sm text-text-secondary">{item.name}</div>
              </div>
            ))
            )}
          </div>
        </div>

        {/* Middle Section - Details & Galley Locations */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Details Section */}
          <div className="bg-bg-surface rounded-lg p-4">
            {isLoading ? (
              <div className="relative h-6 w-32 mb-4 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            ) : (
              <h2 className="text-base font-normal text-text-primary mb-4">
                Details
              </h2>
            )}

            {/* Item Title and Description */}
            {isLoading ? (
              <div className="border border-border-muted rounded-2xl">
                <div className="p-2 px-4">
                  <div className="relative h-5 w-3/4 mb-3 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
                <div className="p-2 px-4 border-t border-border-muted">
                  <div className="relative h-5 w-full mb-2 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
                <div className="min-h-[150px] p-2 px-4 border-t border-border-muted">
                  <div className="relative h-32 w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            ) : (
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
              </div>)}
          </div>

          {/* Galley Locations Table */}
          <div className="bg-bg-surface rounded-lg flex-1 p-4">
            <div className="">
              {isLoading ? (
                <div className="relative h-6 w-40 mb-4 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              ) : (
                <h2 className="text-base font-normal text-text-primary">
                  Galley Locations
                </h2>
              )}
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
                    {isLoading ? (
                      [...Array(5)].map((_, idx) => (
                        <tr key={idx} className="border-b border-border-muted">
                          <td className="py-3 px-4">
                            <div className="relative h-4 w-24 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="relative h-4 w-16 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="relative h-4 w-8 ml-auto rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) :
                      activeContentTab === "deadhead" ? (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-4 text-center text-text-tertiary"
                          >
                            No data available
                          </td>
                        </tr>
                      ) : (
                        selectedItem.locations.map((location: { name: string, storage: string, qty: number }, index: number) => (
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
            {isLoading ? (
              <div className="relative h-6 w-48 rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            ) : (
              <h2 className="text-base font-normal text-text-primary">
                Galley Locations in Aircraft
              </h2>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center p-6  md:px-0 xl:p-6 relative rounded-2xl border border-border-muted">
            {/* Aircraft Image with Floating Buttons */}
            {isLoading ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative h-[550px] w-full rounded bg-gray-200 overflow-hidden animate-pulse duration-75">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">

                {/* Absolute positioning container */}
                <div
                  className="galley-layout-absolute w-full px-4 md:px-65 lg:px-0 xl:px-8 max-w-full h-[550px]"
                  style={{
                    position: 'relative'
                  }}
                >
                  <img
                    src={flightSkeletonImage}
                    alt="Aircraft Layout"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {finalProcessedGalleys.map((galley: GalleyCoordinate) => (
                    <button
                      key={galley.name}
                      className={`z-10 px-4 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap absolute 
                              ${selectedGalleys.includes(galley.name)
                          ? "bg-bg-accent text-text-primary border-2 border-border-accent"
                          : "bg-bg-secondary text-text-secondary border border-border-muted" // Default, uncolored state
                        }`}
                      style={getGalleyStyle(galley)}
                      onClick={() => toggleGalleySelection(galley.name)}
                    >
                      {galley.name}
                    </button>
                  ))}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightContLoc;
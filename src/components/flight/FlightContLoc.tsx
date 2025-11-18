import { useEffect, useState } from "react";
import { galleryItems } from "../../const/galleyItems";
import flightSkeletonImage from "../../assets/flight-skeleton.jpeg";
import { SortIcon } from "../../assets/icons";


interface GalleyPosition {
  name: string;
  position: 'Forward Left' | 'Forward Right' | 'Mid Left' | 'Mid Right' | 'Aft Left' | 'Aft Right' | 'Cargo Left' | 'Cargo Right';
}

interface ProcessedGalleyPosition extends GalleyPosition {
  gridArea: string;
}



// 1. Maps the high-level position to the base grid area name
const positionToGridAreaBase = (position: string): string => {
  return positionAreaMap[position as keyof typeof positionAreaMap] || '';
};

// 2. Processes galleys to assign unique stacked grid area names
const processGalleyPositions = (galleys: GalleyPosition[]): ProcessedGalleyPosition[] => {
  const counts: Record<string, number> = {};

  return galleys.map((galley) => {
    const baseArea = positionToGridAreaBase(galley.position);
    const count = counts[galley.position] || 0;
    counts[galley.position] = count + 1;

    let gridArea = baseArea;
    if (count > 0) {
      gridArea = `${baseArea}-${count + 1}`;
    }

    return {
      ...galley,
      gridArea,
    };
  });
};

// Define base names for all possible grid areas (Updated with Mid Left and Mid Right)
const positionAreaMap: Record<GalleyPosition['position'], string> = {
  'Forward Left': 'forward-left',
  'Forward Right': 'forward-right',
  'Mid Left': 'mid-left',
  'Mid Right': 'mid-right',
  'Aft Left': 'aft-left',
  'Aft Right': 'aft-right',
  'Cargo Left': 'cargo-left',
  'Cargo Right': 'cargo-right',
};

const generateDynamicGridStyle = (processedGalleys: ProcessedGalleyPosition[]) => {
  const maxStacking: Record<string, number> = {};
  for (const galley of processedGalleys) {
    const baseArea = positionToGridAreaBase(galley.position);
    const match = galley.gridArea.match(/-(\d+)$/);
    const index = match ? parseInt(match[1]) : 1;
    maxStacking[baseArea] = Math.max(maxStacking[baseArea] || 0, index);
  }

  // --- HEIGHT & SPACING CONSTANTS (Fixed Pixel Heights for tighter control) ---
  const FUNCTIONAL_ROW_HEIGHT = '45px';

  // INCREASED: Larger fixed pixel height for the Forward/Mid separation
  const SPACER_ONE_HEIGHT = '65px'; // Increased from 30px

  const CARGO_ROWS_HEIGHT = '30px';

  // --- STACK COUNT CALCULATION ---
  const maxForwardStack = Math.max(maxStacking['forward-left'] || 0, maxStacking['forward-right'] || 0, 1);
  const maxMidStack = Math.max(maxStacking['mid-left'] || 0, maxStacking['mid-right'] || 0, 1);
  const maxAftStack = Math.max(maxStacking['aft-left'] || 0, maxStacking['aft-right'] || 0, 1);

  // --- DYNAMIC ROW DEFINITIONS ---
  const forwardRows = `repeat(${maxForwardStack}, ${FUNCTIONAL_ROW_HEIGHT})`;
  const midRows = `repeat(${maxMidStack}, ${FUNCTIONAL_ROW_HEIGHT})`;
  const aftRows = `repeat(${maxAftStack}, ${FUNCTIONAL_ROW_HEIGHT})`;

  // --- AREAS STRING GENERATION ---
  let areasString = '';

  // 1. FORWARD ROWS (G1, G2L, G2R)
  for (let i = 1; i <= maxForwardStack; i++) {
    const leftArea = i === 1 ? positionAreaMap['Forward Left'] : `${positionAreaMap['Forward Left']}-${i}`;
    const rightArea = i === 1 ? positionAreaMap['Forward Right'] : `${positionAreaMap['Forward Right']}-${i}`;
    areasString += `"${leftArea} . . ${rightArea}" \n`;
  }

  // 2. SPACER ROW 1 (Fixed, LARGER gap before Mid)
  areasString += `". spacer-1 spacer-1 ." \n`;

  // 3. MIDDLE ROWS (G3)
  for (let i = 1; i <= maxMidStack; i++) {
    const leftArea = i === 1 ? positionAreaMap['Mid Left'] : `${positionAreaMap['Mid Left']}-${i}`;
    const rightArea = i === 1 ? positionAreaMap['Mid Right'] : `${positionAreaMap['Mid Right']}-${i}`;
    areasString += `"${leftArea} . . ${rightArea}" \n`;
  }

  // 4. FLEXIBLE AIRCRAFT BODY ROW (Absorbs remaining space between Mid and Aft)
  areasString += `". aircraft-body aircraft-body ." \n`;

  // 5. AFT ROWS (G5, G6)
  for (let i = maxAftStack; i >= 1; i--) {
    const leftArea = i === 1 ? positionAreaMap['Aft Left'] : `${positionAreaMap['Aft Left']}-${i}`;
    const rightArea = i === 1 ? positionAreaMap['Aft Right'] : `${positionAreaMap['Aft Right']}-${i}`;
    areasString += `"${leftArea} . . ${rightArea}" \n`;
  }

  // 6. CARGO ROW (Bulk, Belly)
  areasString += `". ${positionAreaMap['Cargo Left']} ${positionAreaMap['Cargo Right']} ."`;

  return {
    gridTemplateRows: `${forwardRows} ${SPACER_ONE_HEIGHT} ${midRows} 1fr ${aftRows} ${CARGO_ROWS_HEIGHT}`,
    gridTemplateAreas: areasString.trim(),
  };
};

const FlightContLoc = () => {
  const [selectedItem, setSelectedItem] = useState(galleryItems[0]);
  const [activeContentTab, setActiveContentTab] = useState("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGalley, setSelectedGalley] = useState<string | null>("G1");
  const [isLoading, setIsLoading] = useState(true);

  const dynamicGalleyData: GalleyPosition[] = [
    { name: "G1", position: "Forward Right" },
    { name: "G2L", position: "Forward Left" },
    { name: "G2R", position: "Forward Right" },
    { name: "G2R", position: "Forward Right" },
    { name: "G3", position: "Mid Right" },
    { name: "G3", position: "Mid Right" },
    { name: "G5", position: "Aft Left" },
    { name: "G6", position: "Aft Right" },
  ];

  const fixedCargoData: GalleyPosition[] = [
    { name: "Bulk", position: "Cargo Left" },
    { name: "Belly", position: "Cargo Right" },
  ];

  const processedGalleys = processGalleyPositions([...dynamicGalleyData, ...fixedCargoData]);

  const updatedProcessedGalleys = processedGalleys.map(g => {
    if (g.position === 'Mid Right' || g.position === 'Mid Left') {
      return {
        ...g,
        gridArea: g.gridArea.replace('mid-center', positionAreaMap[g.position]) // Corrected mapping
      };
    }
    return g;
  });

  const dynamicGridStyle = generateDynamicGridStyle(processedGalleys);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

                {/* Applying the dynamic styles */}
                <div
                  className="galley-grid w-full px-4 md:px-65 lg:px-0 xl:px-8 max-w-full h-[550px]"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '30% 20% 20% 30%',
                    gridTemplateRows: dynamicGridStyle.gridTemplateRows,
                    gridTemplateAreas: dynamicGridStyle.gridTemplateAreas,
                    position: 'relative'
                  }}
                >
                  <img
                    src={flightSkeletonImage}
                    alt="Aircraft Layout"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {updatedProcessedGalleys.map((galley: ProcessedGalleyPosition) => (
                    <button
                      key={galley.name}
                      className={`z-10 px-4 py-1.5 rounded-md text-xs font-medium transition-colors justify-self-center self-center
                              ${selectedGalley === galley.name
                          ? "bg-bg-accent text-text-primary border-2 border-border-accent"
                          : "bg-bg-secondary text-text-secondary border border-border-muted"
                        }`}
                      style={{ gridArea: galley.gridArea }}
                      onClick={() => setSelectedGalley(galley.name)}
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
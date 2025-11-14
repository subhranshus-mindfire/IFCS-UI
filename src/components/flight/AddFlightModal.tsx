import type React from "react"

import { useState, useRef, useEffect } from "react"

const AIRPORT_OPTIONS = ["ADA", "ADD", "ADL", "AKL", "ALG", "AMM", "AMS", "ARN", "ASW", "ATH"]

export const AddFlightModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [flightType, setFlightType] = useState("J")
  const [manualPairing, setManualPairing] = useState(false)
  const [manualLoading, setManualLoading] = useState(false)
  const [manualMeal, setManualMeal] = useState(false)
  const [departureAirportSearch, setDepartureAirportSearch] = useState("")
  const [arrivalAirportSearch, setArrivalAirportSearch] = useState("")
  const [showDepartureOptions, setShowDepartureOptions] = useState(false)
  const [showArrivalOptions, setShowArrivalOptions] = useState(false)

  // refs for dropdown containers
  const departureRef = useRef<HTMLDivElement | null>(null)
  const arrivalRef = useRef<HTMLDivElement | null>(null)

  // close dropdowns when clicking/tapping outside
  useEffect(() => {
    function handleOutside(event: Event) {
      const target = event.target as Node | null

      if (departureRef.current && !departureRef.current.contains(target as Node)) {
        setShowDepartureOptions(false)
      }

      if (arrivalRef.current && !arrivalRef.current.contains(target as Node)) {
        setShowArrivalOptions(false)
      }
    }

    document.addEventListener("mousedown", handleOutside)
    document.addEventListener("touchstart", handleOutside)

    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("touchstart", handleOutside)
    }
  }, [])

  const filteredDepartureAirports = AIRPORT_OPTIONS.filter((airport) =>
    airport.toUpperCase().includes(departureAirportSearch.toUpperCase()),
  )

  const filteredArrivalAirports = AIRPORT_OPTIONS.filter((airport) =>
    airport.toUpperCase().includes(arrivalAirportSearch.toUpperCase()),
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      {/* Modal */}
      <div className="w-full  text-sm underline max-w-md bg-green-600 text-gray-800 text-center py-1.5 rounded-t">
        Create Mode
      </div>
      <div className="bg-white  shadow-lg w-full max-w-md p-6">

        <div className="space-y-5 text-sm">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Airline Code</label>
              <select className="w-full border border-border-muted rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400">
                <option value=""></option>
                <option value="ADA">WY</option>
                <option value="ADD">OV</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Direction</label>
              <select className="w-full border border-border-muted rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400">
                <option value=""></option>
                <option value="inbound">[O/B]</option>
                <option value="outbound">[I/B]</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Flight Type</label>
              <div className="flex gap-3 pt-1">
                {["J", "P"].map((type) => (
                  <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="flightType"
                      value={type}
                      checked={flightType === type}
                      onChange={(e) => setFlightType(e.target.value)}
                      className="w-4 h-4 bg-white"
                    />
                    <span className="text-sm text-gray-800">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "Date", type: "date" },
              { label: "Departure Time", type: "time" },
              { label: "Arrival Time", type: "time" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-gray-700 mb-1.5 text-xs font-medium">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            ))}
          </div>

          {/* Row 3 - Departure Airport and Arrival Airport converted to searchable select */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Flight Number</label>
              <input
                type="text"
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="relative" ref={departureRef}>
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Departure Airport</label>
              <input
                type="text"
                placeholder="Search..."
                value={departureAirportSearch}
                onChange={(e) => setDepartureAirportSearch(e.target.value)}
                onFocus={() => setShowDepartureOptions(true)}
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400"
              />
              {showDepartureOptions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-muted rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredDepartureAirports.map((airport) => (
                    <div
                      key={airport}
                      onClick={() => {
                        setDepartureAirportSearch(airport)
                        setShowDepartureOptions(false)
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                    >
                      {airport}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative" ref={arrivalRef}>
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Arrival Airport</label>
              <input
                type="text"
                placeholder="Search..."
                value={arrivalAirportSearch}
                onChange={(e) => setArrivalAirportSearch(e.target.value)}
                onFocus={() => setShowArrivalOptions(true)}
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-400"
              />
              {showArrivalOptions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-muted rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredArrivalAirports.map((airport) => (
                    <div
                      key={airport}
                      onClick={() => {
                        setArrivalAirportSearch(airport)
                        setShowArrivalOptions(false)
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                    >
                      {airport}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex items-start gap-8">
            <div className="w-1/3">
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">Aircraft Reg</label>
              <select className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:border-orange-500">
                <option value=""></option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 mb-1.5 text-xs font-medium">PAX Count</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Business Studio", key: "bs" },
                  { label: "Business", key: "b" },
                  { label: "Economy", key: "e" },
                  { label: "Crew", key: "c" },
                ].map((type) => (
                  <div key={type.key} className="flex flex-col items-center bg-gray-50 rounded p-2">
                    <input
                      type="number"
                      className="w-full border border-border-muted rounded py-1 text-sm text-gray-800 text-center bg-white focus:outline-none focus:border-orange-500"
                    />
                    <label className="mt-1 text-[9px] text-gray-700 leading-tight text-center">{type.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manual toggles */}
          <div className="space-y-2 pt-2">
            {[
              { label: "Manual Pairing", checked: manualPairing, onChange: setManualPairing },
              { label: "Manual Loading Plan Selection", checked: manualLoading, onChange: setManualLoading },
              { label: "Manual Meal Plan Selection", checked: manualMeal, onChange: setManualMeal },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-center justify-between gap-2 cursor-pointer text-sm text-gray-800"
              >
                <span>{item.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.checked && item.label !== "Manual Pairing" ? "border-green-500" : "border-border-muted"
                    }`}
                  onClick={(e) => {
                    e.preventDefault()
                    item.onChange(!item.checked)
                  }}
                >
                  {item.checked && (
                    <svg
                      className={`w-3.5 h-3.5 ${item.label !== "Manual Pairing" ? "text-green-500" : "text-gray-400"} `}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            {["Cancel", "Save", "Save and Add"].map((btn, i) => (
              <button
                key={i}
                onClick={btn === "Cancel" ? onClose : undefined}
                className={`px-6 py-1.5 rounded-xl transition-colors text-sm 
                bg-gray-200 text-gray-700 hover:bg-gray-300  `}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

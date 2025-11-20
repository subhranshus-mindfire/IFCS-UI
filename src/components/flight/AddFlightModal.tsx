import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useFlightStore } from "../../store/flight";
import type { AddFlightPayload, AddFormState } from "../../types/Flight";


const AIRPORT_OPTIONS = ["ADA", "ADD", "ADL", "AKL", "ALG", "AMM", "AMS", "ARN", "ASW", "ATH"]
const AIRCRAFT_REG_OPTIONS = [
  "A4O-BAA", "A4O-BAB", "A4O-BAC", "A4O-BAE", "A4O-BI",
  "A4O-BK", "A4O-BQ", "A4O-BT", "A4O-BUBCF", "A4O-BW"
];


export const AddFlightModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formState, setFormState] = useState<AddFormState>({
    airlineCode: "",
    direction: "",
    flightType: "J",
    date: "",
    departureTime: "",
    arrivalTime: "",
    flightNumber: "",
    aircraftReg: "",
    pax: { businessStudio: 0, business: 0, economy: 0, crew: 0 },
    manualPairing: false,
    manualLoadingPlanSelection: false,
    manualMealPlanSelection: false,
    departureAirport: "",
    arrivalAirport: ""
  });

  const [showDepartureOptions, setShowDepartureOptions] = useState(false);
  const [showArrivalOptions, setShowArrivalOptions] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { addFlight, isLoading, error } = useFlightStore();

  const departureRef = useRef<HTMLDivElement | null>(null)
  const arrivalRef = useRef<HTMLDivElement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  const handlePaxChange = (key: keyof AddFormState['pax'], value: string) => {
    const num = parseInt(value, 10);

    const numericValue = (!isNaN(num) && num >= 0) ? num : 0;

    setFormState(prev => ({
      ...prev,
      pax: { ...prev.pax, [key]: numericValue }
    }));
  };

  const handleToggleChange = (name: keyof AddFormState, checked: boolean) => {
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

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
    airport.toUpperCase().includes(formState.departureAirport.toUpperCase()),
  )

  const filteredArrivalAirports = AIRPORT_OPTIONS.filter((airport) =>
    airport.toUpperCase().includes(formState.arrivalAirport.toUpperCase()),
  )

  const handleSubmit = useCallback(async (shouldClose: boolean) => {
    setLocalError(null);
    const { date, departureTime, arrivalTime, flightNumber, departureAirport, arrivalAirport } = formState;

    if (!flightNumber || !date || !departureTime || !arrivalTime || !departureAirport || !arrivalAirport) {
      setLocalError("Please fill in all mandatory fields.");
      return;
    }

    const totalPax = Object.values(formState.pax).reduce((sum, count) => sum + count, 0);


    const payload: AddFlightPayload = {
      airlineCode: formState.airlineCode,
      direction: formState.direction,
      flightType: formState.flightType,
      date: date,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      flightNumber: flightNumber,
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      aircraftReg: formState.aircraftReg,
      paxCount: totalPax,
      manualPairing: formState.manualPairing,
      manualLoadingPlanSelection: formState.manualLoadingPlanSelection,
      manualMealPlanSelection: formState.manualMealPlanSelection,
    };



    await addFlight(payload);

    if (shouldClose) {
      onClose();
    } else {
      setFormState({
        airlineCode: "WY",
        direction: "[O/B]",
        flightType: "J",
        date: "",
        departureTime: "",
        arrivalTime: "",
        flightNumber: "",
        aircraftReg: "",
        pax: { businessStudio: 0, business: 0, economy: 0, crew: 0 },
        manualPairing: false,
        manualLoadingPlanSelection: false,
        manualMealPlanSelection: false,
        departureAirport: "",
        arrivalAirport: ""
      });
      setLocalError(null);
    }



  }, [formState, addFlight, onClose]);


  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      {/* Modal */}
      <div className="w-full  text-sm underline max-w-md bg-green-600 text-text-primary text-center py-1.5 rounded-t">
        Create Mode
      </div>

      <div className="bg-white  shadow-lg w-full max-w-md p-6">
        {/* Error Message Display */}
        {localError ? (
          <div className="p-2 mb-6  text-xs font-medium text-red-700 bg-red-100 border border-red-400 rounded">
            {localError}
          </div>
        ) : error && (
          <div className="p-2  mb-6 text-xs font-medium text-red-700 bg-red-100 border border-red-400 rounded">
            API Error: {error}
          </div>
        )}
        <div className="space-y-5 text-sm">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Airline Code</label>
              <select
                className="w-full border border-border-muted rounded px-3 py-2 text-sm text-text-primary bg-white focus:outline-none focus:border-blue-400"
                name="airlineCode"
                value={formState.airlineCode}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="WY">WY</option>
                <option value="OV">OV</option>
              </select>
            </div>
            <div>
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Direction</label>
              <select
                className="w-full border border-border-muted rounded px-3 py-2 text-sm text-text-primary bg-white focus:outline-none focus:border-blue-400"
                name="direction"
                value={formState.direction}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="[O/B]">[O/B]</option>
                <option value="[I/B]">[I/B]</option>
              </select>
            </div>
            <div>
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Flight Type</label>
              <div className="flex gap-3 pt-1">
                {["J", "P"].map((type) => (
                  <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="flightType"
                      value={type}
                      checked={formState.flightType === type}
                      onChange={handleInputChange}
                      className="w-4 h-4 bg-white"
                    />
                    <span className="text-sm text-text-primary">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "Date", type: "date", name: "date", value: formState.date },
              { label: "Departure Time", type: "time", name: "departureTime", value: formState.departureTime },
              { label: "Arrival Time", type: "time", name: "arrivalTime", value: formState.arrivalTime },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-text-primary mb-1.5 text-xs font-medium">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={handleInputChange}
                  className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            ))}
          </div>

          {/* Row 3 - Departure Airport and Arrival Airport converted to searchable select */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={formState.flightNumber}
                onChange={handleInputChange}
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="relative" ref={departureRef}>
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Departure Airport</label>
              <input
                type="text"
                placeholder="Search..."
                name="departureAirport"
                value={formState.departureAirport}
                onChange={handleInputChange}
                onFocus={() => setShowDepartureOptions(true)}
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-blue-400"
              />
              {showDepartureOptions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-muted rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredDepartureAirports.map((airport) => (
                    <div
                      key={airport}
                      onClick={() => {
                        setFormState(prev => ({ ...prev, departureAirport: airport }));
                        setShowDepartureOptions(false)
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-primary"
                    >
                      {airport}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative" ref={arrivalRef}>
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Arrival Airport</label>
              <input
                type="text"
                placeholder="Search..."
                name="arrivalAirport"
                value={formState.arrivalAirport}
                onChange={handleInputChange}
                onFocus={() => setShowArrivalOptions(true)}
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-blue-400"
              />
              {showArrivalOptions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-muted rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredArrivalAirports.map((airport) => (
                    <div
                      key={airport}
                      onClick={() => {
                        setFormState(prev => ({ ...prev, arrivalAirport: airport }));
                        setShowArrivalOptions(false)
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-primary"
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
              <label className="block text-text-primary mb-1.5 text-xs font-medium">Aircraft Reg</label>
              <select
                className="w-full border border-border-muted rounded px-2.5 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-orange-500"
                name="aircraftReg"
                value={formState.aircraftReg}
                onChange={handleInputChange}
              >
                <option value=""></option>
                {AIRCRAFT_REG_OPTIONS.map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-text-primary mb-1.5 text-xs font-medium">PAX Count</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Business Studio", key: "businessStudio" as keyof AddFormState['pax'], value: formState.pax.businessStudio },
                  { label: "Business", key: "business" as keyof AddFormState['pax'], value: formState.pax.business },
                  { label: "Economy", key: "economy" as keyof AddFormState['pax'], value: formState.pax.economy },
                  { label: "Crew", key: "crew" as keyof AddFormState['pax'], value: formState.pax.crew },
                ].map((type) => (
                  <div key={type.key} className="flex flex-col items-center bg-gray-50 rounded p-2">
                    <input
                      type="number"
                      // Display empty string if value is 0 for better UX
                      value={type.value === 0 ? '' : type.value}
                      onChange={(e) => handlePaxChange(type.key, e.target.value)}
                      className="w-full border border-border-muted rounded py-1 text-sm text-text-primary text-center bg-white focus:outline-none focus:border-orange-500"
                      min="0"
                    />
                    <label className="mt-1 text-[9px] text-text-primary leading-tight text-center">{type.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>



          {/* Manual toggles */}
          <div className="space-y-2 pt-2">
            {[
              { label: "Manual Pairing", checked: formState.manualPairing, name: 'manualPairing' as keyof AddFormState },
              { label: "Manual Loading Plan Selection", checked: formState.manualLoadingPlanSelection, name: 'manualLoadingPlanSelection' as keyof AddFormState },
              { label: "Manual Meal Plan Selection", checked: formState.manualMealPlanSelection, name: 'manualMealPlanSelection' as keyof AddFormState },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-center justify-between gap-2 cursor-pointer text-sm text-text-primary"
              >
                <span>{item.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.checked ? "border-green-500" : "border-border-muted"
                    }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleToggleChange(item.name, !item.checked);
                  }}
                >
                  {item.checked && (
                    <svg
                      className={`w-3.5 h-3.5  text-green-500 `}
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
                onClick={() => {
                  if (btn === "Cancel") {
                    onClose()
                  }
                  else if (btn === "Save") {
                    handleSubmit(true)
                  }
                  else if (btn === "Save and Add") {
                    handleSubmit(false)
                  }
                }}
                className={`px-6 py-1.5 rounded-xl transition-colors text-sm 
                bg-bg-button-gray text-text-primary hover:bg-bg-button-gray-hover `}
              >
                {(btn === "Save" || btn === "Save and Add") && isLoading ? 'Saving...' : btn}

              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
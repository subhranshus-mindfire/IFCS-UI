import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useFlightStore } from "../../store/flight";
import type { AddFlightPayload, AddFormState } from "../../types/Flight";
import {
  Field,
  FieldLabel,
  FieldContent
} from "../Field";
import Button from "../Button";

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
    const { date, departureTime, arrivalTime, flightNumber, departureAirport, arrivalAirport, aircraftReg } = formState;

    const mandatoryFields: (keyof AddFormState)[] = [
      'date', 'departureTime', 'arrivalTime',
      'flightNumber', 'departureAirport', 'arrivalAirport',
      'airlineCode', 'aircraftReg', 'direction'
    ];

    const missingField = mandatoryFields.some(key => {
      const value = formState[key];
      return typeof value === 'string' && value.trim() === '';
    });

    if (missingField) {
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
      aircraftReg: aircraftReg,
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
    <div className="fixed inset-0 font-rubik bg-black/50 flex flex-col items-center justify-center z-50">
      {/* Modal Header */}
      <div className="w-full max-w-xl bg-green-600 text-white text-center py-2 rounded-t-lg">
        <h2 className="text-sm font-semibold">Create Mode</h2>
      </div>

      <div className="bg-white shadow-lg w-full max-w-xl p-6 rounded-b-lg">

        {/* Error Message Display */}
        {(localError || error) && (
          <div className="p-2 mb-4 text-[13px] font-medium text-red bg-red-100 border border-red-400 rounded">
            {localError || `API Error: ${error}`}
          </div>
        )}

        <div className="space-y-4">

          {/* Row 1: Airline Code, Direction, Flight Type */}
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel className="text-sm text-text-secondary ">Airline Code</FieldLabel>
              <FieldContent>
                <select
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
                  name="airlineCode"
                  value={formState.airlineCode}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  <option value="WY">WY</option>
                  <option value="OV">OV</option>
                </select>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-secondary ">Direction</FieldLabel>
              <FieldContent>
                <select
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
                  name="direction"
                  value={formState.direction}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  <option value="[O/B]">[O/B]</option>
                  <option value="[I/B]">[I/B]</option>
                </select>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-secondary ">Flight Type</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-4 pt-2">
                  {["J", "P"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="flightType"
                        value={type}
                        checked={formState.flightType === type}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 focus:ring-green-600"
                      />
                      <span className="text-text-secondary">{type}</span>
                    </label>
                  ))}
                </div>
              </FieldContent>
            </Field>
          </div>

          {/* Row 2: Date, Departure Time, Arrival Time */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Date", type: "date", name: "date", value: formState.date },
              { label: "Departure Time", type: "time", name: "departureTime", value: formState.departureTime },
              { label: "Arrival Time", type: "time", name: "arrivalTime", value: formState.arrivalTime },
            ].map((field) => (
              <Field key={field.label}>
                <FieldLabel className="text-sm text-text-secondary ">{field.label}</FieldLabel>
                <FieldContent>
                  <input
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    onChange={handleInputChange}
                    // Increased padding for consistent height
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
                  />
                </FieldContent>
              </Field>
            ))}
          </div>

          {/* Row 3: Flight Number, Departure Airport, Arrival Airport */}
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel className="text-sm text-text-secondary ">Flight Number</FieldLabel>
              <FieldContent>
                <input
                  type="text"
                  name="flightNumber"
                  value={formState.flightNumber}
                  onChange={handleInputChange}
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
                />
              </FieldContent>
            </Field>

            {/* Departure Airport (Searchable Select) */}
            <Field>
              <FieldLabel className="text-sm text-text-secondary ">Departure Airport</FieldLabel>
              <FieldContent className="relative" ref={departureRef}>
                <input
                  type="text"
                  placeholder="Search..."
                  name="departureAirport"
                  value={formState.departureAirport}
                  onChange={handleInputChange}
                  onFocus={() => setShowDepartureOptions(true)}
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
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
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
                      >
                        {airport}
                      </div>
                    ))}
                  </div>
                )}
              </FieldContent>
            </Field>

            {/* Arrival Airport (Searchable Select) */}
            <Field>
              <FieldLabel className="text-sm text-text-secondary ">Arrival Airport</FieldLabel>
              <FieldContent className="relative" ref={arrivalRef}>
                <input
                  type="text"
                  placeholder="Search..."
                  name="arrivalAirport"
                  value={formState.arrivalAirport}
                  onChange={handleInputChange}
                  onFocus={() => setShowArrivalOptions(true)}
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
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
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-text-secondary"
                      >
                        {airport}
                      </div>
                    ))}
                  </div>
                )}
              </FieldContent>
            </Field>
          </div>

          {/* Row 4: Aircraft Reg and PAX Count */}
          <div className="grid grid-cols-3 gap-4">
            <Field className="col-span-1">
              <FieldLabel className="text-sm text-text-secondary ">Aircraft Reg</FieldLabel>
              <FieldContent>
                <select
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
                  name="aircraftReg"
                  value={formState.aircraftReg}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {AIRCRAFT_REG_OPTIONS.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </FieldContent>
            </Field>

            <Field className="col-span-2">
              <FieldLabel className="text-sm text-text-secondary ">PAX Count</FieldLabel>
              <FieldContent>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Business Studio", key: "businessStudio" as keyof AddFormState['pax'] },
                    { label: "Business", key: "business" as keyof AddFormState['pax'] },
                    { label: "Economy", key: "economy" as keyof AddFormState['pax'] },
                    { label: "Crew", key: "crew" as keyof AddFormState['pax'] },
                  ].map((type) => (
                    <div key={type.key} className="flex flex-col items-center">
                      <input
                        type="number"
                        name={`pax.${type.key}`}
                        value={formState.pax[type.key] === 0 ? '' : formState.pax[type.key]}
                        onChange={(e) => handlePaxChange(type.key, e.target.value)}
                        className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-secondary bg-bg-surface focus:outline-none   focus:border-bg-button  "
                        min="0"
                      />
                      <span className="text-[0.65rem] text-text-secondary text-center mt-1">
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FieldContent>
            </Field>
          </div>

          {/* Row 5: Manual toggles (Retaining original toggle style) */}
          <div className="space-y-3 pt-2">
            {[
              { label: "Manual Pairing", checked: formState.manualPairing, name: 'manualPairing' as keyof AddFormState },
              { label: "Manual Loading Plan Selection", checked: formState.manualLoadingPlanSelection, name: 'manualLoadingPlanSelection' as keyof AddFormState },
              { label: "Manual Meal Plan Selection", checked: formState.manualMealPlanSelection, name: 'manualMealPlanSelection' as keyof AddFormState },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between" >
                <label className="text-text-secondary">{item.label}</label>
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
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border-muted">
            <Button
              onClick={onClose}
              className="px-6 py-2 bg-bg-button-gray text-text-secondary rounded hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit(true)} // Save and Close
              className={`px-6 py-2 text-white rounded transition-opacity 
                ${isLoading ? 'bg-bg-button-gray cursor-not-allowed' : 'bg-bg-button hover:bg-bg-button-hover'} `}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={() => handleSubmit(false)} // Save and Add Next
              className={`px-6 py-2 text-white rounded transition-opacity 
                ${isLoading ? 'bg-bg-button-gray cursor-not-allowed' : 'bg-bg-button hover:bg-bg-button-hover'} `}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save and Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, type JSX } from "react";
import Button from "../Button";
import { Field, FieldLabel, FieldContent } from "../Field";
import type { FlightData } from "../../types/Flight";
import { formatDateToDDMonYYYY, formatLocalTimeFromISO } from "../../lib/utils";
import { getAirlines, getAirports, getAircrafts } from "../../services/flightLookups";
import SearchableDropdown from "../common/SearchableDropdown";

interface EditFlightModalProps {
  isEditFlightModalOpen: boolean;
  selectedLegForEdit: number | null;
  setIsEditFlightModalOpen: (open: boolean) => void;
  setSelectedLegForEdit: (value: number | null) => void;
  legData: FlightData;
}

export const EditFlightModal = ({
  isEditFlightModalOpen,
  setIsEditFlightModalOpen,
  legData,
}: EditFlightModalProps): JSX.Element | null => {
  if (!isEditFlightModalOpen) return null;


  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  const [selectedAirline, setSelectedAirline] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState("");

  useEffect(() => {
    getAirlines().then(setAirlines);
    getAirports().then(setAirports);
    getAircrafts().then(setAircrafts);

    setSelectedAirline(legData.flightNumber.substring(0, 2));
    setSelectedDeparture(legData.departureDestination);
    setSelectedArrival(legData.arrivalDestination);
    setSelectedAircraft(legData.aircraft?.registration || "");
  }, [legData]);



  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-surface rounded-lg shadow-xl w-full max-w-xl mx-4">
        {/* Header */}
        <div className="bg-orange-400 text-white px-6 py-2 rounded-t-lg">
          <h2 className="text-sm font-semibold text-center">Edit Mode</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Row 1: Airline Code, Direction, Flight Type */}
          <div className="grid grid-cols-3 gap-2">
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Airline Code
              </FieldLabel>
              <FieldContent>
                <SearchableDropdown
                  id="airport"
                  label="code"
                  options={airlines}
                  selectedVal={selectedAirline}
                  handleChange={(value) => setSelectedAirline(value)}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Direction
              </FieldLabel>
              <FieldContent>
                <select className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent">
                  <option value="">Select</option>
                  <option value="Inbound">Inbound</option>
                  <option value="Outbound">Outbound</option>
                </select>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Flight Type
              </FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="flightType"
                      value="J"
                      defaultChecked
                      className="text-bg-button focus:ring-bg-button"
                    />
                    <span className="text-text-primary">J</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="flightType"
                      value="P"
                      className="text-bg-button focus:ring-bg-button"
                    />
                    <span className="text-text-primary">P</span>
                  </label>
                </div>
              </FieldContent>
            </Field>
          </div>

          {/* Row 2: Date, Departure Time, Arrival Time */}
          <div className="grid grid-cols-3 gap-2">
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Date
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={formatDateToDDMonYYYY(legData.estimatedDeparture)}
                    className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                    📅
                  </span>
                </div>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Departure Time
              </FieldLabel>
              <FieldContent>
                <input
                  type="text"
                  defaultValue={formatLocalTimeFromISO(legData.estimatedDeparture)}
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Arrival Time
              </FieldLabel>
              <FieldContent>
                <input
                  type="text"
                  defaultValue={formatLocalTimeFromISO(legData.estimatedArrival)}
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                />
              </FieldContent>
            </Field>
          </div>

          {/* Row 3: Flight Number, Departure Airport, Arrival Airport */}
          <div className="grid grid-cols-3 gap-2">
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Flight Number
              </FieldLabel>
              <FieldContent>
                <input
                  type="text"
                  defaultValue={legData?.flightNumber.substring(2)}
                  className="w-full border border-border-muted rounded px-3 py-2 text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Departure Airport
              </FieldLabel>
              <SearchableDropdown
                id="airport"
                label="code"
                options={airports}
                selectedVal={selectedDeparture}
                handleChange={(value) => setSelectedDeparture(value)}
              />
            </Field>
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Arrival Airport
              </FieldLabel>
              <SearchableDropdown
                id="airport"
                label="code"
                options={airports}
                selectedVal={selectedArrival}
                handleChange={(value) => setSelectedArrival(value)}
              />
            </Field>
          </div>

          {/* Row 4: Aircraft Reg and PAX Count */}
          <div className="grid grid-cols-3 gap-2">
            <Field>
              <FieldLabel className="text-sm text-text-tertiary">
                Aircraft Reg
              </FieldLabel>
              <SearchableDropdown
                id="airport"
                label="registration"
                options={aircrafts}
                selectedVal={selectedAircraft}
                handleChange={(value) => setSelectedAircraft(value)}
              />
            </Field>
            <Field className="col-span-2">
              <FieldLabel className="text-sm text-text-tertiary">
                PAX Count
              </FieldLabel>
              <FieldContent>
                <div className="w-75 grid grid-cols-4 gap-1">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={legData?.passengers?.businessStudioCount || "2"}
                      className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                    />
                    <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                      Business Studio
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={legData?.passengers?.businessCount || "153"}
                      className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                    />
                    <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                      Business
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={legData?.passengers?.economyCount || "0"}
                      className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                    />
                    <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                      Economy
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={legData?.passengers?.crewCount || "0"}
                      className="w-full border border-border-muted rounded px-3 py-2 text-center text-text-primary bg-bg-surface focus:outline-none focus:ring-2 focus:ring-border-accent"
                    />
                    <span className="text-[0.6rem] text-text-tertiary text-center mt-1">
                      Crew
                    </span>
                  </div>
                </div>
              </FieldContent>
            </Field>
          </div>

          {/* Row 5: Manual Options */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-text-secondary">Manual Pairing</label>
              <input
                type="radio"
                className="w-5 h-5 text-bg-button focus:ring-bg-button"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-text-secondary">
                Manual Loading Plan Selection
              </label>
              <input
                type="radio"
                className="w-5 h-5 text-bg-button focus:ring-bg-button"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-text-secondary">
                Manual Meal Plan Selection
              </label>
              <input
                type="radio"
                className="w-5 h-5 text-bg-button focus:ring-bg-button"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border-muted">
          <Button
            onClick={() => setIsEditFlightModalOpen(false)}
            className="px-6 py-2 bg-bg-secondary rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("Save clicked");
              setIsEditFlightModalOpen(false);
            }}
            className="px-6 py-2 bg-bg-button text-white rounded hover:opacity-90 transition-opacity"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
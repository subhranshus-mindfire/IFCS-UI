import { useState } from "react";

export const AddFlightModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [flightType, setFlightType] = useState("J");

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-bgSecondary rounded-lg shadow-md w-full max-w-md p-3 border border-borderLight">
        <div className="space-y-3 text-xs">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-textTertiary mb-0.5 text-[11px]">
                Airline Code
              </label>
              <select className="w-full border border-borderLight rounded px-1.5 py-1 text-textPrimary bg-surface focus:outline-none focus:border-accentPrimary">
                <option value=""></option>
              </select>
            </div>
            <div>
              <label className="block text-textTertiary mb-0.5 text-[11px]">
                Direction
              </label>
              <select className="w-full border border-borderLight rounded px-1.5 py-1 text-textPrimary bg-surface focus:outline-none focus:border-accentPrimary">
                <option value=""></option>
              </select>
            </div>
            <div>
              <label className="block text-textTertiary mb-0.5 text-[11px]">
                Flight Type
              </label>
              <div className="flex gap-1">
                {["J", "P"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-0.5 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="flightType"
                      value={type}
                      checked={flightType === type}
                      onChange={(e) => setFlightType(e.target.value)}
                      className="w-3 h-3 bg-surface accent-accentPrimary"
                    />
                    <span className="text-[11px] text-textPrimary">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Date", type: "date" },
              { label: "Departure", type: "time" },
              { label: "Arrival", type: "time" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-textTertiary mb-0.5 text-[11px]">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="w-full border border-borderLight rounded px-1.5 py-1 text-textPrimary bg-surface focus:outline-none focus:border-accentPrimary"
                />
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-2">
            {["Flight No.", "Dep. Airport", "Arr. Airport"].map((label) => (
              <div key={label}>
                <label className="block text-textTertiary mb-0.5 text-[11px]">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full border border-borderLight rounded px-1.5 py-1 text-textPrimary bg-surface focus:outline-none focus:border-accentPrimary"
                />
              </div>
            ))}
          </div>

          {/* Row 4 */}
          <div className="flex items-start gap-1">
            <div className="w-1/3">
              <label className="block text-textTertiary mb-0.5 text-[11px]">
                Aircraft Reg
              </label>
              <select className="w-[90%] border border-borderLight rounded px-1 py-1 text-textPrimary bg-surface focus:outline-none focus:border-accentPrimary">
                <option value=""></option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-textTertiary mb-0.5 text-[11px]">
                PAX Count
              </label>
              <div className="flex items-start">
                {["Business studio", "Business", "Economy", "Crew"].map(
                  (type) => (
                    <div
                      key={type}
                      className="flex flex-col items-center justify-start min-h-[44px] px-0"
                      style={{ width: 35 }}
                    >
                      <input
                        type="number"
                        className="w-[30px] border border-borderLight rounded py-0.5 text-xs text-textPrimary text-center bg-surface focus:outline-none focus:border-accentPrimary"
                      />
                      <label className="mt-1 text-[7px] text-textTertiary leading-tight text-center break-words w-full">
                        {type}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Manual toggles */}
          <div className="space-y-0.5 pt-1">
            {[
              "Manual Pairing",
              "Manual Loading Plan Selection",
              "Manual Meal Plan Selection",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between pe-6 gap-1 cursor-pointer text-[11px] text-textPrimary"
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  className="w-3 h-3 border-borderLight bg-surface accent-accentPrimary"
                />
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 pt-2">
            {["Cancel", "Save", "Save & Add"].map((btn, i) => (
              <button
                key={btn}
                onClick={btn === "Cancel" ? onClose : undefined}
                className={`px-3 py-1 rounded-full transition-colors text-xs font-medium ${
                  i === 0
                    ? "bg-surface text-textSecondary hover:bg-borderLight"
                    : "bg-accentPrimary text-white hover:bg-accentPrimaryHover"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

export const AddFlightModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [flightType, setFlightType] = useState("J");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* slightly gray modal background */}
      <div className="bg-[#EFF2F4] rounded-lg shadow-md w-full max-w-md p-3 border border-gray-300">
        <div className="space-y-3 text-xs">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-gray-500 mb-0.5 text-[11px]">
                Airline Code
              </label>
              <select className="w-full border border-gray-300 rounded px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-blue-400">
                <option value=""></option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 mb-0.5 text-[11px]">
                Direction
              </label>
              <select className="w-full border border-gray-300 rounded px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-blue-400">
                <option value=""></option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 mb-0.5 text-[11px]">
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
                      className="w-3 h-3 bg-white"
                    />
                    <span className="text-[11px]">{type}</span>
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
                <label className="block text-gray-500 mb-0.5 text-[11px]">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="w-full border border-gray-300 rounded px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-2">
            {["Flight No.", "Dep. Airport", "Arr. Airport"].map((label) => (
              <div key={label}>
                <label className="block text-gray-500 mb-0.5 text-[11px]">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Row 4 */}
          <div className="flex items-start gap-1">
            <div className="w-1/3">
              <label className="block text-gray-500 mb-0.5 text-[11px]">
                Aircraft Reg
              </label>
              <select className="w-[90%] border border-gray-300 rounded px-1 py-1 text-gray-700 bg-white focus:outline-none focus:border-blue-400">
                <option value=""></option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-500 mb-0.5 text-[11px]">
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
                        className="w-[30px] border border-gray-300 rounded py-0.5 text-xs text-gray-700 text-center bg-white focus:outline-none focus:border-blue-400"
                      />
                      <label className="mt-1 text-[7px] text-gray-400 leading-tight text-center break-words w-full">
                        {type}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="space-y-0.5 pt-1">
            {[
              "Manual Pairing",
              "Manual Loading Plan Selection",
              "Manual Meal Plan Selection",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between pe-6 gap-1 cursor-pointer text-[11px]"
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  className="w-3 h-3 border-gray-300 bg-white"
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
                className={`px-3 py-1 rounded-full transition-colors text-xs ${
                  i === 0
                    ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    : "bg-gray-300 text-gray-900"
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

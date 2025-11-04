import { useState } from "react";

export const AddFlightModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [flightType, setFlightType] = useState("J");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-4">
        <div className="space-y-4 text-sm">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-500 mb-1">Airline Code</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400">
                <option value=""></option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Direction</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400">
                <option value=""></option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Flight Type</label>
              <div className="flex gap-2">
                {["J", "P"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="flightType"
                      value={type}
                      checked={flightType === type}
                      onChange={(e) => setFlightType(e.target.value)}
                      className="w-3.5 h-3.5"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-500 mb-1">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Departure</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Arrival</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-500 mb-1">Flight No.</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Dep. Airport</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Arr. Airport</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-500 mb-1">Aircraft Reg</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-400">
                <option value=""></option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-500 mb-1">PAX Count</label>
              <div className="grid grid-cols-4 gap-2">
                {["Business", "Premium", "Economy", "Crew"].map((type) => (
                  <div key={type}>
                    <label className="block text-xs text-gray-400 mb-0.5">
                      {type}
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-1 pt-1">
            {[
              "Manual Pairing",
              "Manual Loading Plan Selection",
              "Manual Meal Plan Selection",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between pe-10 gap-2 cursor-pointer"
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 border-gray-300"
                />
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-1.5 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors">
              Save
            </button>
            <button className="px-4 py-1.5 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors">
              Save & Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

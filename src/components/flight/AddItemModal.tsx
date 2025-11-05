import React, { useState, useMemo } from "react";
import { items } from "../../const/itemData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { BowlIcon, UtensilIcon } from "../../assets/icons";

type ItemQuantities = Record<string, number>;

interface AddItemModalProps {
  onClose: () => void;
  onSave: (quantities: ItemQuantities) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  onClose,
  onSave,
}) => {
  const [selectedType, setSelectedType] = useState<string>("meal");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [quantities, setQuantities] = useState<ItemQuantities>({});

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => item.type === selectedType)
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [selectedType, searchTerm]);

  const handleQuantityChange = (code: string, delta: number) => {
    setQuantities((prev) => {
      const currentQty = prev[code] || 0;
      const newQty = Math.max(0, currentQty + delta);
      const newQuantities = { ...prev };
      if (newQty === 0) delete newQuantities[code];
      else newQuantities[code] = newQty;
      return newQuantities;
    });
  };

  const handleSaveClick = () => {
    const finalQuantities = Object.entries(quantities).reduce(
      (acc, [code, qty]) => {
        if (qty > 0) acc[code] = qty;
        return acc;
      },
      {} as ItemQuantities
    );
    onSave(finalQuantities);
  };

  const formatQuantity = (code: string) =>
    (quantities[code] || 0).toString().padStart(2, "0");

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-3xl font-rubik">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add Item <span className="font-light">or</span> Packing Standard
          </h2>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" // Added pl-10 for icon
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/3">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Select Equipment Type
              </h3>
              <div className="flex flex-row md:flex-col gap-2">
                <button
                  onClick={() => setSelectedType("meal")}
                  className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-all ${
                    selectedType === "meal"
                      ? "bg-purple-100 text-gray-900 shadow-sm"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <img src={BowlIcon} alt="Meal" className="w-5 h-5" />
                  <span>Meal</span>
                </button>
                <button
                  onClick={() => setSelectedType("provision")}
                  className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-all ${
                    selectedType === "provision"
                      ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <img src={UtensilIcon} alt="Provision" className="w-5 h-5" />
                  <span>Provision</span>
                </button>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Select Item
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  <span className="flex-[1]">Code</span>
                  <span className="flex-[2]">Name</span>
                  <span className="flex-[1] text-center">Qty.</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-200">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                      const hasQuantity = (quantities[item.code] || 0) > 0;
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between px-4 py-3 transition-all ${
                            hasQuantity
                              ? "bg-purple-50"
                              : "bg-white hover:bg-gray-50"
                          }`}
                        >
                          <span className="flex-[1] text-sm font-medium text-gray-800">
                            {item.code}
                          </span>
                          <span className="flex-[2] text-sm text-gray-700 truncate">
                            {item.name}
                          </span>
                          <div className="flex-[1] flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.code, -1)
                              }
                              className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
                              disabled={!hasQuantity}
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </button>
                            <span
                              className={`text-sm font-semibold w-6 text-center ${
                                hasQuantity
                                  ? "text-purple-700"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatQuantity(item.code)}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.code, 1)}
                              className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition"
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No items found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end items-center gap-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="py-2 px-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="py-2 px-5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

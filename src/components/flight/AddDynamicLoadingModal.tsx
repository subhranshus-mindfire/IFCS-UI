import React, { useState } from "react";
import {
  BowlIcon,
  InfoIcon,
  PositionIcon,
  UtensilIcon,
} from "../../assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  mealItems,
  provisionItems,
  positionItems,
  bulkItems,
} from "../../const/dynamicLoadingData";
import HollowBtn from "../common/HollowBtn";

interface DynamicLoadingModalProps {
  onClose: () => void;
}

const DynamicLoadingModal: React.FC<DynamicLoadingModalProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [activeType, setActiveType] = useState<"Meal" | "Provision">("Meal");
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedProvision, setSelectedProvision] = useState<string | null>(
    null
  );
  const [loadType, setLoadType] = useState<"Positions" | "Bulk">("Positions");
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "001-024": 2,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const itemsData = activeType === "Meal" ? mealItems : provisionItems;
  const selectedItem = activeType === "Meal" ? selectedMeal : selectedProvision;
  const selectedData =
    itemsData.find((i) => i.code === selectedItem) ||
    mealItems.find((i) => i.code === selectedMeal) ||
    provisionItems.find((i) => i.code === selectedProvision);
  const handleSelect = (code: string) => {
    if (activeType === "Meal") setSelectedMeal(code);
    else setSelectedProvision(code);
  };

  const handleNext = () => {
    if (selectedItem) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const updateQuantity = (code: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [code]: Math.max(0, (prev[code] || 0) + delta),
    }));
  };

  const filteredPositionItems = positionItems.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.avalPos.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Step 1: Select Item
  if (step === 1) {
    return (
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-3 font-rubik"
        onClick={onClose}
      >
        <div
          className="bg-bg-surface rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="mb-3">
            <h1 className="text-base font-normal text-text-tertiary mb-2">
              Add Dynamic Loading
            </h1>
            <h2 className="text-md font-medium text-text-secondary mb-3">
              TS296 / YUL-BSL / Jul16, 2025
            </h2>

            <div className="w-full border border-border-muted rounded-2xl overflow-hidden text-xs bg-bg-surface">
              <div className="grid grid-cols-2 divide-x divide-y divide-border-muted">
                <div className="grid grid-cols-2 p-2 px-4">
                  <span className="text-text-tertiary">Aircraft</span>
                  <span className="text-text-primary">TS296</span>
                </div>
                <div className="grid grid-cols-2 p-2 px-4">
                  <span className="text-text-tertiary">AC Reg.</span>
                  <span className="text-text-primary">C-GOIX</span>
                </div>
                <div className="grid grid-cols-2 p-2 px-4">
                  <span className="text-text-tertiary">Destination</span>
                  <span className="text-text-primary">BSL</span>
                </div>
                <div className="grid grid-cols-2 p-2 px-4">
                  <span className="text-text-tertiary">Loading Plan</span>
                  <span className="text-text-primary">Global</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Item Display */}
          {selectedItem && (
            <div className="mb-3">
              <h3 className="text-xs text-text-tertiary mb-1">
                Selected Item:
              </h3>
              <div className="w-full border border-border-muted rounded-2xl overflow-hidden text-xs bg-bg-surface">
                <div className="grid grid-cols-2 divide-x divide-border-muted">
                  <div className="grid grid-cols-2 p-2 px-4">
                    <span className="text-text-tertiary">Code</span>
                    <span className="text-text-primary">
                      {itemsData.find((i) => i.code === selectedItem)?.code}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 p-2 px-4">
                    <span className="text-text-tertiary">Name</span>
                    <span className="text-text-primary">
                      {itemsData.find((i) => i.code === selectedItem)?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-4">
            <h3 className="text-xs text-text-tertiary mb-1">Search</h3>
            <input
              type="text"
              placeholder={`Search ${activeType.toLowerCase()} items`}
              className="w-full px-3 py-2 border rounded-2xl border-border-muted text-xs focus:outline-none focus:border-bg-button"
            />
          </div>

          <div className="flex flex-1 overflow-hidden gap-4">
            {/* Sidebar */}
            <div className="w-[25%]">
              <h3 className="text-xs text-text-tertiary mb-2">
                Select Item Type
              </h3>
              <div className="flex flex-col gap-2">
                <HollowBtn
                  icon={UtensilIcon}
                  label="Meal"
                  isActive={activeType === "Meal"}
                  handleClick={() => setActiveType("Meal")}
                />

                <HollowBtn
                  icon={BowlIcon}
                  label="Provision"
                  isActive={activeType === "Provision"}
                  handleClick={() => setActiveType("Provision")}
                />
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-hidden">
              <h3 className="text-xs text-text-tertiary mb-2">
                Select {activeType} Item
              </h3>
              <div className="h-full overflow-y-auto border border-border-muted rounded-lg">
                <table className="min-w-full text-xs border-collapse">
                  <thead className="bg-bg-secondary text-text-secondary sticky top-0">
                    <tr>
                      <th className="px-2 py-2 text-left">Code</th>
                      <th className="px-2 py-2 text-left">Name</th>
                      <th className="px-2 py-2 text-left">Category</th>
                      <th className="px-2 py-2 text-center w-10">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsData.map((item, index) => {
                      const isSelected = item.code === selectedItem;
                      return (
                        <tr
                          key={index}
                          onClick={() => handleSelect(item.code)}
                          className={`cursor-pointer ${
                            isSelected
                              ? "bg-bg-accent text-text-secondary border border-border-accent"
                              : "bg-bg-surface text-text-muted hover:bg-bg-secondary"
                          } border-b border-border-muted transition`}
                        >
                          <td className="px-2 py-2">{item.code}</td>
                          <td className="px-2 py-2">{item.name}</td>
                          <td className="px-2 py-2">{item.category}</td>
                          <td className="px-2 py-2 text-center">
                            <img src={InfoIcon} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border-muted mt-4">
            <button
              className="px-4 py-2 text-text-secondary text-xs border border-border-muted rounded-lg hover:bg-bg-secondary transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-bg-button text-bg-surface text-xs rounded-lg shadow-md hover:bg-bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={!selectedItem}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-3 font-rubik"
      onClick={onClose}
    >
      <div
        className="bg-bg-surface rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="mb-3">
          <h1 className="text-base font-normal text-text-tertiary mb-2">
            Add Dynamic Loading
          </h1>
          <h2 className="text-md font-medium text-text-secondary mb-3">
            TS296 / YUL-BSL / Jul16, 2025
          </h2>

          <div className="w-full border border-border-muted rounded-2xl overflow-hidden text-xs bg-bg-surface">
            <div className="grid grid-cols-2 divide-x divide-y divide-border-muted">
              <div className="grid grid-cols-2 p-2 px-4">
                <span className="text-text-tertiary">Aircraft</span>
                <span className="text-text-primary">TS296</span>
              </div>
              <div className="grid grid-cols-2 p-2 px-4">
                <span className="text-text-tertiary">AC Reg.</span>
                <span className="text-text-primary">C-GOIX</span>
              </div>
              <div className="grid grid-cols-2 p-2 px-4">
                <span className="text-text-tertiary">Destination</span>
                <span className="text-text-primary">BSL</span>
              </div>
              <div className="grid grid-cols-2 p-2 px-4">
                <span className="text-text-tertiary">Loading Plan</span>
                <span className="text-text-primary">Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Item Display */}
        {selectedData && (
          <div className="mb-3">
            <h3 className="text-xs text-text-tertiary mb-1">Selected Item:</h3>
            <div className="w-full border border-border-muted rounded-2xl overflow-hidden text-xs bg-bg-surface">
              <div className="grid grid-cols-2 divide-x divide-border-muted">
                <div className="grid grid-cols-2 p-2 px-4">
                  <span className="text-text-tertiary">Code</span>
                  <span className="text-text-primary">{selectedData.code}</span>
                </div>
                <div className="grid grid-cols-2 p-2 px-4">
                  <span className="text-text-tertiary">Name</span>
                  <span className="text-text-primary">{selectedData.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-4">
          <h3 className="text-xs text-text-tertiary mb-1">Search</h3>
          <input
            type="text"
            placeholder={
              loadType === "Bulk"
                ? "Search by Location, Container"
                : "Search by Position, Name, Aval Pos"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-2xl border-border-muted text-xs focus:outline-none focus:border-bg-button"
          />
        </div>

        <div className="flex flex-1 overflow-hidden gap-4">
          {/* Sidebar */}
          <div className="w-[25%]">
            <h3 className="text-xs text-text-tertiary mb-2">Select Type</h3>
            <div className="flex flex-col gap-2">
              <HollowBtn
                icon={PositionIcon}
                label="Positions"
                isActive={loadType === "Positions"}
                handleClick={() => setLoadType("Positions")}
              />

              <HollowBtn
                icon={InfoIcon}
                label="Bulk"
                isActive={loadType === "Bulk"}
                handleClick={() => setLoadType("Bulk")}
              />
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-xs text-text-tertiary mb-2">
              {loadType === "Bulk"
                ? "Select Bulk Load Details"
                : "Select Position to Load"}
            </h3>

            <div className="h-full overflow-y-auto border border-border-muted rounded-lg">
              {loadType === "Positions" ? (
                <table className="min-w-full text-xs border-collapse">
                  <thead className="bg-bg-secondary text-text-secondary sticky top-0">
                    <tr>
                      <th className="px-2 py-2 text-left">Code</th>
                      <th className="px-2 py-2 text-left">Name</th>
                      <th className="px-2 py-2 text-left">Category</th>
                      <th className="px-2 py-2 text-center">Aval Pos</th>
                      <th className="px-2 py-2 text-center" colSpan={3}>
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPositionItems.map((item, index) => {
                      const quantity = quantities[item.code] || 0;
                      const isSelected = quantity > 0;
                      return (
                        <tr
                          key={index}
                          className={`${
                            isSelected
                              ? "bg-bg-accent border border-border-accent"
                              : "bg-bg-surface hover:bg-bg-secondary"
                          } border-b border-border-muted transition`}
                        >
                          <td className="px-2 py-2">{item.code}</td>
                          <td className="px-2 py-2">{item.name}</td>
                          <td className="px-2 py-2">{item.category}</td>
                          <td className="px-2 py-2 text-center">
                            {item.avalPos}
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button
                              onClick={() => updateQuantity(item.code, -1)}
                              className="w-6 h-6 rounded-full bg-bg-secondary hover:bg-border-muted flex items-center justify-center"
                              disabled={quantity === 0}
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </button>
                          </td>
                          <td className="px-2 py-2 text-center font-medium text-text-primary">
                            {quantity.toString().padStart(2, "0")}
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button
                              onClick={() => updateQuantity(item.code, 1)}
                              className="w-6 h-6 rounded-full bg-bg-secondary hover:bg-border-muted flex items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                // Bulk Table
                <table className="min-w-full text-xs border-collapse">
                  <thead className="bg-bg-secondary text-text-secondary sticky top-0">
                    <tr>
                      <th className="px-2 py-2 text-left">Location</th>
                      <th className="px-2 py-2 text-center">Qty</th>
                      <th className="px-2 py-2 text-left">Container</th>
                      <th className="px-2 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkItems.map((bulk, index) => (
                      <tr
                        key={index}
                        className="bg-bg-surface hover:bg-bg-secondary border-b border-border-muted transition"
                      >
                        <td className="px-2 py-2">{bulk.location}</td>
                        <td className="px-2 py-2 text-center">{bulk.qty}</td>
                        <td className="px-2 py-2">{bulk.container}</td>
                        <td className="px-2 py-2 text-center flex items-center justify-center gap-2">
                          <img
                            src={InfoIcon}
                            alt="Info"
                            className="cursor-pointer"
                          />
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="cursor-pointer text-text-tertiary"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border-muted mt-4">
          <button
            className="px-4 py-2 text-text-secondary text-xs border border-border-muted rounded-lg hover:bg-bg-secondary transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-text-secondary text-xs border border-border-muted rounded-lg hover:bg-bg-secondary transition"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-bg-button text-bg-surface text-xs rounded-lg shadow-md hover:bg-bg-primary transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicLoadingModal;

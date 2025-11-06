import React, { useState, useMemo } from "react";
import { items } from "../../const/itemData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
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
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-3 font-rubik"
      onClick={onClose}
    >
      <div
        className="bg-bg-surface rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-base font-normal text-text-tertiary mb-2">
            Add Item or Packing Standard
          </h1>
          <p className="text-xs text-text-secondary">
            Select equipment type and add required quantities.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <h3 className="text-xs text-text-tertiary mb-1">Search</h3>
          <input
            type="text"
            placeholder="Search by code or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-2xl border-border-muted text-xs focus:outline-none focus:border-bg-button"
          />
        </div>

        <div className="flex flex-1 overflow-hidden gap-4">
          {/* Sidebar */}
          <div className="w-[25%]">
            <h3 className="text-xs text-text-tertiary mb-2">
              Select Equipment Type
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedType("meal")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition ${
                  selectedType === "meal"
                    ? "bg-bg-accent text-text-primary shadow-sm border border-border-accent"
                    : "text-text-tertiary bg-bg-secondary"
                }`}
              >
                <img src={BowlIcon} alt="Meal" className="w-4 h-4" />
                Meal
              </button>

              <button
                onClick={() => setSelectedType("provision")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition ${
                  selectedType === "provision"
                    ? "bg-bg-accent text-text-primary shadow-sm border border-border-accent"
                    : "text-text-tertiary bg-bg-secondary"
                }`}
              >
                <img src={UtensilIcon} alt="Provision" className="w-4 h-4" />
                Provision
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-xs text-text-tertiary mb-2">Select Item</h3>
            <div className="h-full overflow-y-auto border border-border-muted rounded-lg">
              <table className="min-w-full text-xs border-collapse">
                <thead className="bg-bg-secondary text-text-secondary sticky top-0">
                  <tr>
                    <th className="px-2 py-2 text-left">Code</th>
                    <th className="px-2 py-2 text-left">Name</th>
                    <th className="px-2 py-2 text-center" colSpan={3}>
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                      const quantity = quantities[item.code] || 0;
                      const isSelected = quantity > 0;
                      return (
                        <tr
                          key={item.id}
                          className={`${
                            isSelected
                              ? "bg-bg-accent border border-border-accent"
                              : "bg-bg-surface hover:bg-bg-secondary"
                          } border-b border-border-muted transition`}
                        >
                          <td className="px-2 py-2 text-text-muted">
                            {item.code}
                          </td>
                          <td className="px-2 py-2 text-text-muted">
                            {item.name}
                          </td>
                          <td className="py-2 w-0  text-text-muted text-center">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.code, -1)
                              }
                              className="w-6 h-6 rounded-full bg-bg-secondary hover:bg-border-muted flex items-center justify-center"
                              disabled={quantity === 0}
                            >
                              <FontAwesomeIcon icon={faMinus} size="xs" />
                            </button>
                          </td>
                          <td className="px-2 py-2 text-center font-medium text-text-primary">
                            {formatQuantity(item.code)}
                          </td>
                          <td className=" py-2 w-0 text-center">
                            <button
                              onClick={() => handleQuantityChange(item.code, 1)}
                              className="w-6 h-6 rounded-full bg-bg-secondary hover:bg-border-muted flex items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faPlus} size="xs" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-3 text-center text-text-tertiary"
                      >
                        No items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
            onClick={handleSaveClick}
            className="px-4 py-2 bg-bg-button text-bg-surface text-xs rounded-lg shadow-md hover:bg-bg-primary transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

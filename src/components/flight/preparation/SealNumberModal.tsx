import { useState } from "react";

interface SealNumberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (sealNumber: string) => void;
    title?: string;
}

const SealNumberModal: React.FC<SealNumberModalProps> = ({
    isOpen,
    onClose,
    onSave,
    title = "Enter Seal Number"
}) => {
    const [sealNumber, setSealNumber] = useState("");
    const [error, setError] = useState("");

    const handleSave = () => {
        if (!sealNumber.trim()) {
            setError("Seal number is required");
            return;
        }
        onSave(sealNumber);
        setSealNumber("");
        setError("");
    };

    const handleClose = () => {
        setSealNumber("");
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                    {title}
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                        Seal Number
                    </label>
                    <input
                        type="text"
                        value={sealNumber}
                        onChange={(e) => {
                            setSealNumber(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter seal number"
                        className="w-full px-3 py-2 border border-border-secondary rounded focus:outline-none focus:border-bg-button"
                        autoFocus
                    />
                    {error && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 border border-border-muted rounded hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-bg-button text-white rounded hover:bg-bg-button-hover transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SealNumberModal;
import { useState } from "react";
import type { TSACompliance } from "../../../types/delivery";
import SignatureModal from "./SignatureModal";

interface TSAComplianceTabProps {
  tsaCompliance: TSACompliance | null;
  onUpdateCompliance: (compliance: TSACompliance) => void;
  onAddPreparer: (preparer: { fullName: string; type: "Airline Representative" | "Third Party Security Guard"; raicNumber: string; note?: string }) => void;
}

const TSAComplianceTab: React.FC<TSAComplianceTabProps> = ({
  tsaCompliance,
  onUpdateCompliance,
  onAddPreparer,
}) => {
  const [isCompliant, setIsCompliant] = useState(tsaCompliance?.isCompliant ?? false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  // Additional Requirement form state
  const [selectedType, setSelectedType] = useState<"Airline Representative" | "Third Party Security Guard">("Airline Representative");
  const [fullName, setFullName] = useState("");
  const [raicNumber, setRaicNumber] = useState("");
  const [note, setNote] = useState("");

  const handleToggleCompliance = (value: boolean) => {
    setIsCompliant(value);
    if (tsaCompliance) {
      onUpdateCompliance({
        ...tsaCompliance,
        isCompliant: value,
      });
    } else {
      onUpdateCompliance({
        isCompliant: value,
        confirmationText: "I confirm that all TSA catering security measures are compliant",
        signature: null,
        signedAt: null,
      });
    }
  };

  const handleSaveSignature = (signature: string) => {
    const updatedCompliance: TSACompliance = {
      isCompliant,
      confirmationText: "I confirm that all TSA catering security measures are compliant",
      signature,
      signedAt: new Date(),
    };
    onUpdateCompliance(updatedCompliance);
  };

  const handleAddPreparer = () => {
    if (!fullName.trim() || !raicNumber.trim()) return;

    onAddPreparer({
      fullName: fullName.trim(),
      type: selectedType,
      raicNumber: raicNumber.trim(),
      note: note.trim() || undefined,
    });

    // Reset form
    setFullName("");
    setRaicNumber("");
    setNote("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Additional Requirement Section */}
      <div className="bg-bg-surface rounded-2xl border border-border-muted p-4">
        <h3 className="text-base text-text-secondary mb-4">
          Additional Requirement for Flight to the USA
        </h3>

        <div className="mb-6 grid grid-cols-2 gap-6">
          <label className="inline-flex items-center gap-2 cursor-pointer border border-border-muted rounded-2xl p-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedType === "Airline Representative"}
                onChange={(e) =>
                  setSelectedType(
                    e.target.checked ? "Airline Representative" : "Third Party Security Guard"
                  )
                }
                className="appearance-none w-5 h-5 rounded border-2 border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition-colors"
              />
              {selectedType === "Airline Representative" && (
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-text-secondary">Airline Representative</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer border border-border-muted rounded-2xl p-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedType === "Third Party Security Guard"}
                onChange={(e) =>
                  setSelectedType(
                    e.target.checked ? "Third Party Security Guard" : "Airline Representative"
                  )
                }
                className="appearance-none w-5 h-5 rounded border-2 border-gray-300 checked:bg-green-500 checked:border-green-500 focus:outline-none transition-colors"
              />
              {selectedType === "Third Party Security Guard" && (
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-text-secondary">Third Party Security Guard</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Name"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">RAIC #</label>
            <input
              type="text"
              value={raicNumber}
              onChange={(e) => setRaicNumber(e.target.value)}
              placeholder="RAIC #"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note here"
              rows={3}
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent resize-none"
            />
          </div>

          <button
            onClick={handleAddPreparer}
            disabled={!fullName.trim() || !raicNumber.trim()}
            className={`px-6 py-2 rounded-2xl transition-colors ${
              fullName.trim() && raicNumber.trim()
                ? "bg-bg-button text-white hover:opacity-90"
                : "bg-gray-300 text-text-tertiary cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>

      {/* Right Side - TSA Compliance Section */}
      <div className="bg-bg-surface rounded-2xl border border-border-muted p-4">
        <div className="flex items-center justify-between mb-6 border border-border-muted p-2 rounded-2xl">
          <h3 className="text-base text-text-secondary">
            TSA Catering Security Measures Compliance
          </h3>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isCompliant}
              onChange={(e) => handleToggleCompliance(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 border border-border-muted p-3 rounded-2xl">
              <input
                type="checkbox"
                checked={true}
                readOnly
                className="mt-1 w-4 h-4 text-bg-button accent-bg-button rounded"
              />
              <p className="text-sm text-text-primary">
                I confirm that all TSA catering security measures are compliant
              </p>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Signature</label>
              {tsaCompliance?.signature ? (
                <div className="space-y-3">
                  <div className="border-2 border-border-muted rounded-2xl overflow-hidden bg-white p-4 inline-block">
                    <img
                      src={tsaCompliance.signature}
                      alt="TSA Compliance Signature"
                      className="h-82"
                    />
                  </div>
                  {tsaCompliance.signedAt && (
                    <p className="text-sm text-text-tertiary flex justify-end">
                      Signed on Date & Time:{" "}
                      <span className="font-medium">
                        {new Date(tsaCompliance.signedAt).toLocaleString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="border-2 border-border-muted rounded-2xl bg-bg-secondary h-82 flex items-center justify-center cursor-pointer"
                onClick={() => setShowSignatureModal(true)}>
                  <button
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Click here to sign
                  </button>
                </div>
              )}
            </div>
          </div>
      </div>

      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={handleSaveSignature}
        title="Signature"
      />
    </div>
  );
};

export default TSAComplianceTab;

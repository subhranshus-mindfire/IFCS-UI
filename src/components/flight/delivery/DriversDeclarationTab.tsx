import { useState } from "react";
import type { DriversDeclaration } from "../../../types/delivery";
import SignatureModal from "../SignatureModal";

interface DriversDeclarationTabProps {
  driversDeclaration: DriversDeclaration | null;
  onUpdateDeclaration: (declaration: DriversDeclaration) => void;
}

const DriversDeclarationTab: React.FC<DriversDeclarationTabProps> = ({
  driversDeclaration,
  onUpdateDeclaration,
}) => {
  const [driverName, setDriverName] = useState(
    driversDeclaration?.driverName ?? ""
  );
  const [raicNumber, setRaicNumber] = useState(
    driversDeclaration?.raicNumber ?? ""
  );
  const [truckSeal, setTruckSeal] = useState(
    driversDeclaration?.truckSeal ?? ""
  );
  const [company, setCompany] = useState(driversDeclaration?.company ?? "");
  const [sealIntact, setSealIntact] = useState(
    driversDeclaration?.sealIntact ?? false
  );
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  const handleSaveSignature = (signature: string) => {
    const updatedDeclaration: DriversDeclaration = {
      driverName,
      raicNumber,
      truckSeal,
      company,
      sealIntact,
      confirmationText: "I (the driver) confirm the SEAL is intact",
      signature,
      signedAt: new Date(),
    };
    onUpdateDeclaration(updatedDeclaration);
  };

  const handleToggleSealIntact = (value: boolean) => {
    setSealIntact(value);
    if (driversDeclaration) {
      onUpdateDeclaration({
        ...driversDeclaration,
        sealIntact: value,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Driver Form */}
      <div className="bg-bg-surface rounded-2xl border border-border-muted p-4">

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Driver*
            </label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="Driver"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              RAIC #*
            </label>
            <input
              type="text"
              value={raicNumber}
              onChange={(e) => setRaicNumber(e.target.value)}
              placeholder="RAIC #"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Truck Seal*
            </label>
            <input
              type="text"
              value={truckSeal}
              onChange={(e) => setTruckSeal(e.target.value)}
              placeholder="Truck Seal"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Company*
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Seal Intact and Signature */}
      <div className="bg-bg-surface rounded-2xl border border-border-muted p-4">
        <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-2xl border border-border-muted mb-6">
          <span className="text-sm text-text-secondary">
            Security Seal is Intact
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sealIntact}
              onChange={(e) => handleToggleSealIntact(e.target.checked)}
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
              I (the driver) confirm the SEAL is intact
            </p>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Signature
            </label>
            {driversDeclaration?.signature ? (
              <div className="space-y-3">
                <div className="border-2 border-border-muted rounded-2xl overflow-hidden bg-white p-4 inline-block">
                  <img
                    src={driversDeclaration.signature}
                    alt="Driver's Signature"
                    className="h-82"
                  />
                </div>
                {driversDeclaration.signedAt && (
                  <p className="text-sm text-text-tertiary flex justify-end">
                    Signed on Date & Time:{" "}
                    <span className="font-medium">
                      {new Date(driversDeclaration.signedAt).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </p>
                )}
              </div>
            ) : (
              <div
                className="border-2 border-border-muted rounded-2xl bg-bg-secondary h-82 flex items-center justify-center cursor-pointer"
                onClick={() => setShowSignatureModal(true)}
              >
                <button className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
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
        title="Driver's Declaration Signature"
      />
    </div>
  );
};

export default DriversDeclarationTab;

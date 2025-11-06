import { useState } from "react";
import type { SecurityDeclaration } from "../../../types/delivery";
import SignatureModal from "./SignatureModal";

interface SecurityDeclarationTabProps {
  securityDeclaration: SecurityDeclaration | null;
  onUpdateDeclaration: (declaration: SecurityDeclaration) => void;
}

const SecurityDeclarationTab: React.FC<SecurityDeclarationTabProps> = ({
  securityDeclaration,
  onUpdateDeclaration,
}) => {
  const [section, setSection] = useState<"Single" | "Double">(
    securityDeclaration?.section ?? "Single"
  );
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signingPerson, setSigningPerson] = useState<"provider" | "handler" | null>(null);

  // Provider state
  const [providerName, setProviderName] = useState(securityDeclaration?.provider?.name ?? "");
  const [providerStaffName, setProviderStaffName] = useState(securityDeclaration?.provider?.staffName ?? "");
  const [providerStaffNumber, setProviderStaffNumber] = useState(securityDeclaration?.provider?.staffNumber ?? "");
  const [providerPosition, setProviderPosition] = useState(securityDeclaration?.provider?.position ?? "");

  // Handler state
  const [handlerName, setHandlerName] = useState(securityDeclaration?.handler?.name ?? "");
  const [handlerStaffName, setHandlerStaffName] = useState(securityDeclaration?.handler?.staffName ?? "");
  const [handlerStaffNumber, setHandlerStaffNumber] = useState(securityDeclaration?.handler?.staffNumber ?? "");
  const [handlerPosition, setHandlerPosition] = useState(securityDeclaration?.handler?.position ?? "");
  setHandlerStaffName("Handler Staff Name");
  const handleSectionChange = (newSection: "Single" | "Double") => {
    setSection(newSection);
    const updatedDeclaration: SecurityDeclaration = {
      section: newSection,
      provider: securityDeclaration?.provider ?? null,
      handler: newSection === "Double" ? (securityDeclaration?.handler ?? null) : null,
    };
    onUpdateDeclaration(updatedDeclaration);
  };

  const handleSignClick = (person: "provider" | "handler") => {
    setSigningPerson(person);
    setShowSignatureModal(true);
  };

  const handleSaveSignature = (signature: string) => {
    if (!signingPerson) return;

    const updatedDeclaration: SecurityDeclaration = {
      section,
      provider:
        signingPerson === "provider"
          ? {
              name: providerName,
              staffName: providerStaffName,
              staffNumber: providerStaffNumber,
              position: providerPosition,
              signature,
              signedAt: new Date(),
            }
          : securityDeclaration?.provider ?? null,
      handler:
        signingPerson === "handler" && section === "Double"
          ? {
              name: handlerName,
              staffName: handlerStaffName,
              staffNumber: handlerStaffNumber,
              position: handlerPosition,
              signature,
              signedAt: new Date(),
            }
          : securityDeclaration?.handler ?? null,
    };

    onUpdateDeclaration(updatedDeclaration);
    setSigningPerson(null);
  };

  return (
    <div className="space-y-6">
      {/* Section Toggle */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-text-primary">Section:</span>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={section === "Single"}
              onChange={() => handleSectionChange("Single")}
              className="w-4 h-4 text-bg-button accent-bg-button"
            />
            <span className="text-sm text-text-primary">Single</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={section === "Double"}
              onChange={() => handleSectionChange("Double")}
              className="w-4 h-4 text-bg-button accent-bg-button"
            />
            <span className="text-sm text-text-primary">Double</span>
          </label>
        </div>
      </div>

      {/* Provider Section */}
      <div className="bg-bg-surface rounded-2xl border border-border-muted p-6">
        <h3 className="text-base font-medium text-text-primary mb-6">
          Flight Supplies Provider
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Provider</label>
            <input
              type="text"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              placeholder="Provider"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Staff Name</label>
            <input
              type="text"
              value={providerStaffName}
              onChange={(e) => setProviderStaffName(e.target.value)}
              placeholder="Staff Name"
              className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Staff Number</label>
              <input
                type="text"
                value={providerStaffNumber}
                onChange={(e) => setProviderStaffNumber(e.target.value)}
                placeholder="Staff Number"
                className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Position</label>
              <input
                type="text"
                value={providerPosition}
                onChange={(e) => setProviderPosition(e.target.value)}
                placeholder="Position"
                className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Signature</label>
            {securityDeclaration?.provider?.signature ? (
              <div className="space-y-3">
                <div className="border-2 border-border-muted rounded-2xl overflow-hidden bg-white p-4 inline-block">
                  <img
                    src={securityDeclaration.provider.signature}
                    alt="Provider Signature"
                    className="h-32"
                  />
                </div>
                {securityDeclaration.provider.signedAt && (
                  <p className="text-sm text-text-tertiary">
                    Signed on Date & Time:{" "}
                    <span className="font-medium">
                      {new Date(securityDeclaration.provider.signedAt).toLocaleString('en-US', {
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
              <div className="border-2 border-border-muted rounded-2xl bg-bg-surface h-40 flex items-center justify-center">
                <button
                  onClick={() => handleSignClick("provider")}
                  className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                >
                  Click here to sign
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Handler Section (only shown when Double is selected) */}
      {section === "Double" && (
        <div className="bg-bg-surface rounded-2xl border border-border-muted p-6">
          <h3 className="text-base font-medium text-text-primary mb-6">
            Flight Supplies Handler
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Handler Name</label>
              <input
                type="text"
                value={handlerName}
                onChange={(e) => setHandlerName(e.target.value)}
                placeholder="Handler Name"
                className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Handler Number</label>
                <input
                  type="text"
                  value={handlerStaffNumber}
                  onChange={(e) => setHandlerStaffNumber(e.target.value)}
                  placeholder="Handler Number"
                  className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Position</label>
                <input
                  type="text"
                  value={handlerPosition}
                  onChange={(e) => setHandlerPosition(e.target.value)}
                  placeholder="Position"
                  className="w-full px-4 py-2 bg-bg-surface border border-border-muted rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Signature</label>
              {securityDeclaration?.handler?.signature ? (
                <div className="space-y-3">
                  <div className="border-2 border-border-muted rounded-2xl overflow-hidden bg-white p-4 inline-block">
                    <img
                      src={securityDeclaration.handler.signature}
                      alt="Handler Signature"
                      className="h-32"
                    />
                  </div>
                  {securityDeclaration.handler.signedAt && (
                    <p className="text-sm text-text-tertiary">
                      Signed on Date & Time:{" "}
                      <span className="font-medium">
                        {new Date(securityDeclaration.handler.signedAt).toLocaleString('en-US', {
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
                <div className="border-2 border-border-muted rounded-2xl bg-bg-surface h-40 flex items-center justify-center">
                  <button
                    onClick={() => handleSignClick("handler")}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                  >
                    Click here to sign
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => {
          setShowSignatureModal(false);
          setSigningPerson(null);
        }}
        onSave={handleSaveSignature}
        title={signingPerson === "provider" ? "Provider Signature" : "Handler Signature"}
      />
    </div>
  );
};

export default SecurityDeclarationTab;

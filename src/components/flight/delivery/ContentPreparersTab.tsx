import { useState } from "react";
import type { ContentPreparer } from "../../../types/delivery";
import SignatureModal from "./SignatureModal";
import { DeleteIcon } from "../../../assets/icons";

interface ContentPreparersTabProps {
  preparers: ContentPreparer[];
  onDeletePreparer: (id: string) => void;
  onUpdateSignature: (id: string, signature: string) => void;
}

const ContentPreparersTab: React.FC<ContentPreparersTabProps> = ({
  preparers,
  onDeletePreparer,
  onUpdateSignature,
}) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signingPreparerId, setSigningPreparerId] = useState<string | null>(null);

  const handleSignClick = (preparerId: string) => {
    setSigningPreparerId(preparerId);
    setShowSignatureModal(true);
  };

  const handleSaveSignature = (signature: string) => {
    if (signingPreparerId) {
      onUpdateSignature(signingPreparerId, signature);
      setSigningPreparerId(null);
    }
  };

  return (
    <div>
      {/* Content Preparers Table */}
      {preparers.length > 0 ? (
        <div className="bg-bg-surface rounded-2xl border border-border-muted overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-muted bg-bg-secondary">
                  <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Full Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">RAIC #</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Signature</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {preparers.map((preparer, index) => (
                  <tr key={preparer.id} className={index !== preparers.length - 1 ? "border-b border-border-muted" : ""}>
                    <td className="px-6 py-4 text-sm text-text-primary">{preparer.fullName}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{preparer.type}</td>
                    <td className="px-6 py-4 text-sm text-text-primary">{preparer.raicNumber}</td>
                    <td className="px-6 py-4">
                      {preparer.signature ? (
                        <div className="space-y-2">
                          <img
                            src={preparer.signature}
                            alt="Signature"
                            className="h-16 border border-border-muted rounded-2xl bg-white p-2"
                          />
                          {preparer.signedAt && (
                            <p className="text-xs text-text-tertiary">
                              Signed on Date & Time: {new Date(preparer.signedAt).toLocaleString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSignClick(preparer.id)}
                          className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                        >
                          Click here to sign
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onDeletePreparer(preparer.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <img src={DeleteIcon} alt="Delete" className="w-6 h-6"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-bg-surface rounded-2xl border border-border-muted p-6">
        <p className="text-sm text-text-tertiary">No Content Preparers found</p>
      </div>      )}

      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => {
          setShowSignatureModal(false);
          setSigningPreparerId(null);
        }}
        onSave={handleSaveSignature}
        title="Sign Here"
      />
    </div>
  );
};

export default ContentPreparersTab;

import { useState } from "react";
import type {
  Delivery,
  ContentPreparer,
  TSACompliance,
  DriversDeclaration,
} from "../../../types/delivery";
import ContentPreparersTab from "./ContentPreparersTab";
import TSAComplianceTab from "./TSAComplianceTab";
import DriversDeclarationTab from "./DriversDeclarationTab";
import DispatcherCommentsTab from "./DispatcherCommentsTab";
import { AddIcon } from "../../../assets/icons";

type TabType = "dispatcher" | "preparers" | "tsa" | "driver";

const FlightDeliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<TabType>("dispatcher");

  const selectedDelivery = deliveries.find((d) => d.id === selectedDeliveryId);

  const handleAddNewDelivery = () => {
    const newDelivery: Delivery = {
      id: crypto.randomUUID(),
      deliveryNumber: deliveries.length + 1,
      contentPreparers: [],
      tsaCompliance: null,
      driversDeclaration: null,
      securityDeclaration: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDeliveries([...deliveries, newDelivery]);
    setSelectedDeliveryId(newDelivery.id);
  };

  const handleAddPreparer = (
    preparer: Omit<ContentPreparer, "id" | "signature" | "signedAt">
  ) => {
    if (!selectedDeliveryId) return;

    const newPreparer: ContentPreparer = {
      ...preparer,
      id: crypto.randomUUID(),
      signature: null,
      signedAt: null,
    };

    setDeliveries(
      deliveries.map((d) =>
        d.id === selectedDeliveryId
          ? {
              ...d,
              contentPreparers: [...d.contentPreparers, newPreparer],
              updatedAt: new Date(),
            }
          : d
      )
    );
  };

  const handleDeletePreparer = (preparerId: string) => {
    if (!selectedDeliveryId) return;

    setDeliveries(
      deliveries.map((d) =>
        d.id === selectedDeliveryId
          ? {
              ...d,
              contentPreparers: d.contentPreparers.filter(
                (p) => p.id !== preparerId
              ),
              updatedAt: new Date(),
            }
          : d
      )
    );
  };

  const handleUpdatePreparerSignature = (
    preparerId: string,
    signature: string
  ) => {
    if (!selectedDeliveryId) return;

    setDeliveries(
      deliveries.map((d) =>
        d.id === selectedDeliveryId
          ? {
              ...d,
              contentPreparers: d.contentPreparers.map((p) =>
                p.id === preparerId
                  ? { ...p, signature, signedAt: new Date() }
                  : p
              ),
              updatedAt: new Date(),
            }
          : d
      )
    );
  };

  const handleUpdateTSACompliance = (compliance: TSACompliance) => {
    if (!selectedDeliveryId) return;

    setDeliveries(
      deliveries.map((d) =>
        d.id === selectedDeliveryId
          ? { ...d, tsaCompliance: compliance, updatedAt: new Date() }
          : d
      )
    );
  };

  const handleUpdateDriversDeclaration = (declaration: DriversDeclaration) => {
    if (!selectedDeliveryId) return;

    setDeliveries(
      deliveries.map((d) =>
        d.id === selectedDeliveryId
          ? { ...d, driversDeclaration: declaration, updatedAt: new Date() }
          : d
      )
    );
  };

  return (
    <div className="flex font-rubik">
      {/* Sidebar */}
      <div className="w-64 min-h-96 bg-bg-surface border border-border-muted rounded-2xl p-4 flex flex-col">
        <div className="mb-4 border-b border-border-muted pb-4">
          <h2 className="text-lg text-text-primary mb-3">
            Deliveries ({deliveries.length})
          </h2>
          <button
            onClick={handleAddNewDelivery}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-bg-secondary text-text-primary rounded-lg hover:bg-gray-200 transition-colors"
          >
            <img src={AddIcon} alt="Sort" className="w-4 h-4" />
            <span>Add New Delivery</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {deliveries.map((delivery) => (
            <button
              key={delivery.id}
              onClick={() => setSelectedDeliveryId(delivery.id)}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                selectedDeliveryId === delivery.id
                  ? "bg-purple-200 text-text-primary border border-border-accent"
                  : "bg-bg-secondary text-text-primary hover:bg-gray-200"
              }`}
            >
              Delivery {delivery.deliveryNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedDelivery ? (
          <>
            {/* Tabs */}
            <div className="bg-bg-surface px-6 pt-6 pb-2">
              <div className="bg-bg-secondary rounded-full inline-flex gap-2 overflow-x-auto w-full">
                <button
                  onClick={() => setActiveTab("dispatcher")}
                  className={`px-6 py-3 text-sm whitespace-nowrap rounded-full transition-colors ${
                    activeTab === "dispatcher"
                      ? "bg-gray-300 text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Dispatcher Comments
                </button>
                <button
                  onClick={() => setActiveTab("preparers")}
                  className={`px-6 py-3 text-sm whitespace-nowrap rounded-full transition-colors ${
                    activeTab === "preparers"
                      ? "bg-gray-300 text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Content Preparers
                </button>
                <button
                  onClick={() => setActiveTab("tsa")}
                  className={`px-6 py-3 text-sm whitespace-nowrap rounded-full transition-colors ${
                    activeTab === "tsa"
                      ? "bg-gray-300 text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  TSA Compliance
                </button>
                <button
                  onClick={() => setActiveTab("driver")}
                  className={`px-6 py-3 text-sm whitespace-nowrap rounded-full transition-colors ${
                    activeTab === "driver"
                      ? "bg-gray-300 text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Driver's Declaration
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto bg-bg-surface px-6 py-2">
              {activeTab === "dispatcher" && <DispatcherCommentsTab />}
              {activeTab === "preparers" && (
                <ContentPreparersTab
                  preparers={selectedDelivery.contentPreparers}
                  onDeletePreparer={handleDeletePreparer}
                  onUpdateSignature={handleUpdatePreparerSignature}
                />
              )}
              {activeTab === "tsa" && (
                <TSAComplianceTab
                  onAddPreparer={handleAddPreparer}
                  tsaCompliance={selectedDelivery.tsaCompliance}
                  onUpdateCompliance={handleUpdateTSACompliance}
                />
              )}
              {activeTab === "driver" && (
                <DriversDeclarationTab
                  driversDeclaration={selectedDelivery.driversDeclaration}
                  onUpdateDeclaration={handleUpdateDriversDeclaration}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-bg-surface">
            <div className="text-center">
              <p className="text-lg text-text-tertiary mb-4">
                No delivery selected
              </p>
              <p className="text-sm text-text-tertiary">
                Add a new delivery or select one from the sidebar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDeliveries;

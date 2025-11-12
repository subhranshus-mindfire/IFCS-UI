import { useState } from "react";
import type { Flight } from "../../const/flightData";
import PDFPreview from "../pdf/PDFPreview.tsx";
import PDFModalViewer from "../pdf/PDFModalViewer.tsx";

type PreparationData = {
  stowage: string;
  carrier: string;
  equipment: string;
  preparedBy: string;
  pdfUrl: string;
};

const FlightLabels = () => {
  const [activeTab, setActiveTab] = useState("LABELS");

  const [selectedLabel, setSelectedLabel] = useState<null | {
    preparation: PreparationData;
    flight: Flight;
  }>(null);

  const sampleFlight: Flight = {
    airlineCode: "WY",
    route: "MCT-MNL-MCT",
    flightNumber: "WY843",
    type: "A40SK",
    date: "SEP8 [NA]",
    departure: "10:30",
    arrival: "18:45",
    depStation: "MCT",
    arrStation: "MNL",
    status: "Active",
    acType: "A40SK",
    acReg: "A40SK",
    groundTime: "2h 15m",
    plan: "ATLAS",
    mealPlan: null,
    paxTotal: 180,
    pax: { first: "12", business: "24", premium: "36", economy: "108" },
    departureType: "scheduled",
    arrivalType: "scheduled",
  };

  const outboundGroups: Record<string, PreparationData[]> = {
    Commissary: [
      {
        stowage: "1202A",
        carrier: "PURSER KIT",
        equipment: "Commissary",
        preparedBy: "John Doe",
        pdfUrl: "/pdfs/purser-kit.pdf"
      },
    ],
    "Duty Free": [
      {
        stowage: "5202F",
        carrier: "HHC",
        equipment: "Duty Free",
        preparedBy: "John Doe",
        pdfUrl: "/pdfs/hhc-dutyfree.pdf"
      },
    ],
    Meals: [
      {
        stowage: "1201F",
        carrier: "PILOT TSU / SNX OB",
        equipment: "Meals",
        preparedBy: "John Doe",
        pdfUrl: "/pdfs/pilot-meals.pdf"
      },
    ],
    Kitchen: [
      {
        stowage: "1203F",
        carrier: "CLUB DAIRY EUROPE",
        equipment: "Kitchen",
        preparedBy: "John Doe",
        pdfUrl: "/pdfs/kitchen-europe.pdf"
      },
    ],
  };

  const inboundGroups: Record<string, PreparationData[]> = {
    Title: [
      {
        stowage: "1202",
        carrier: "PURSER KIT",
        equipment: "Title",
        preparedBy: "John Doe",
        pdfUrl: "../../assets/pdfs/WY407_11_06_2025_Tray Set Up_IB.pdf"
      },
    ],
    Meals: [
      {
        stowage: "1201F",
        carrier: "PILOT TSU / SNX OB",
        equipment: "Meals",
        preparedBy: "John Doe",
        pdfUrl: "/pdfs/inbound-meals.pdf"
      },
    ],
  };

  return (
    <div className="min-h-screen font-rubik">

      <div className="flex gap-2 mb-6 bg-bg-secondary p-1 rounded-full w-full">
        {["LABELS", "REPORTS"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${activeTab === tab
              ? "bg-bg-accent shadow text-gray-900"
              : "text-gray-500 hover:bg-white/70"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "LABELS" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* OUTBOUND CARD */}
          <div className="bg-white p-5 rounded-2xl border border-bg-secondary">
            <h2 className="text-gray-700 font-regular mb-4 text-lg">
              Print Outbound Labels
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(outboundGroups).map(([title, items]) => (
                <div key={title}>
                  <h3 className="text-gray-600 font-regular mb-2">{title}</h3>

                  <div className="bg-bg-tertiary py-6 rounded-lg">
                    {items.map((prep, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl mx-0 2xl:mx-10 flex justify-center cursor-pointer active:scale-[0.98] transition"
                        onClick={() =>
                          setSelectedLabel({ preparation: prep, flight: sampleFlight })
                        }
                      >
                        <PDFPreview file={prep.pdfUrl} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INBOUND CARD */}
          <div className="bg-white p-5 rounded-2xl border border-bg-secondary">
            <h2 className="text-gray-700 font-regular mb-4 text-lg">
              Print Inbound Labels
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(inboundGroups).map(([title, items]) => (
                <div key={title}>
                  <h3 className="text-gray-600 font-regular mb-2">{title}</h3>

                  <div className="bg-bg-tertiary py-6 rounded-lg">
                    {items.map((prep, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl mx-0 2xl:mx-10 flex justify-center cursor-pointer active:scale-[0.98] transition"
                        onClick={() =>
                          setSelectedLabel({ preparation: prep, flight: sampleFlight })
                        }
                      >
                        <PDFPreview file={prep.pdfUrl} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === "REPORTS" && (
        <div className="bg-white rounded-xl p-10 shadow text-center">
          <h3 className="text-gray-700 font-semibold text-xl mb-2">Reports</h3>
          <p className="text-gray-500">Reports will appear here.</p>
        </div>
      )}

      {/* MODAL */}
      {selectedLabel && (
        <PDFModalViewer
          file={selectedLabel.preparation.pdfUrl}
          onClose={() => setSelectedLabel(null)}
        />
      )}
    </div>
  );
};

export default FlightLabels;

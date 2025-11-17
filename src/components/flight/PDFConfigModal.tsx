import React, { useState } from "react";

interface PDFConfigModalProps {
    flightNumber: string;
    onClose: () => void;
    onView: (config: PDFConfig) => void;
}

export interface PDFConfig {
    numberPagesFrom: string;
    recordRange: string;
    paperSize: string;
    orientation: "portrait" | "landscape";
    scalePercentage: string;
}

export const PDFConfigModal: React.FC<PDFConfigModalProps> = ({
    flightNumber,
    onClose,
    onView,
}) => {
    const [config, setConfig] = useState<PDFConfig>({
        numberPagesFrom: "1",
        recordRange: "Records being browsed",
        paperSize: "US Letter",
        orientation: "portrait",
        scalePercentage: "100",
    });

    const handleView = () => {
        onView(config);
    };

    return (
        <>
            {/* PDF Preview in Background */}
            <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div className="w-[30%] h-[70%] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden p-4 border border-gray-200">
                    <div className="w-full h-full overflow-hidden relative">
                        <iframe
                            src={`/meal-count-pdf/${flightNumber}?preview=true`}
                            className="absolute top-0 left-0 border-0"
                            style={{
                                pointerEvents: 'none',
                                width: '280%',
                                height: '280%',
                                transform: 'scale(0.357)',
                                transformOrigin: 'top left',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Dark Overlay with Blur */}
            <div className="fixed inset-0 z-45 bg-black/50 "></div>

            {/* Modal Form */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-[400px] shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2  bg-linear-to-b from-[#575656] to-[#000000] text-white">
                        <h3 className="text-sm font-medium">View as PDF</h3>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-300 text-xl leading-none font-normal"
                        >
                            ×
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-4 space-y-3">
                        <div className="flex items-center gap-4">
                            <label className="text-xs  w-32">
                                Number Pages From
                            </label>
                            <input
                                type="text"
                                value={config.numberPagesFrom}
                                onChange={(e) =>
                                    setConfig({ ...config, numberPagesFrom: e.target.value })
                                }
                                className="w-20 px-1 py-1 border border-gray-300 text-xs  focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-xs  w-32">
                                Record Range
                            </label>
                            <select
                                value={config.recordRange}
                                onChange={(e) =>
                                    setConfig({ ...config, recordRange: e.target.value })
                                }
                                className="flex-1 px-1 py-1 border border-gray-300 text-xs bg-white focus:outline-none focus:border-blue-400"
                            >
                                <option value="Records being browsed">
                                    Records being browsed
                                </option>
                                <option value="All records">All records</option>
                                <option value="Current record">Current record</option>
                            </select>
                        </div>

                        <div className="flex items-start gap-4">
                            <label className="text-xs  w-32 pt-1">
                                Paper Size
                            </label>
                            <div className="flex flex-col flex-1">
                                <select
                                    value={config.paperSize}
                                    onChange={(e) =>
                                        setConfig({ ...config, paperSize: e.target.value })
                                    }
                                    className="px-1 py-1 border border-gray-300 text-xs bg-white focus:outline-none focus:border-blue-400"
                                >
                                    <option value="US Letter">US Letter</option>8.5 x 11 inches
                                    <option value="Tabloid">Tabloid</option> 11 x 17inches
                                    <option value="US Legal">US Legal</option>8.5x14inches
                                    <option value="Statement">Statement</option>5.5x8.5inches
                                    <option value="Executive">Executive</option>7.25x10.5inches
                                    <option value="Folio">Folio</option>8.5x13inches
                                    <option value="A3">A3</option>297x420mm
                                    <option value="A4">A4</option>210x297mm
                                    <option value="A5">A5</option>148x210mm
                                    <option value="B4">B4</option>250x353mm
                                    <option value="B5">B5</option>176x250mm
                                </select>
                                <span className="text-[10px]  mt-1">
                                    {config.paperSize === "Tabloid" && "11 x 17 inches"}
                                    {config.paperSize === "US Legal" && "8.5 x 14 inches"}
                                    {config.paperSize === "Folio" && "8.5 x 13 inches"}
                                    {config.paperSize === "Executive" && "7.25 x 10.5 inches"}
                                    {config.paperSize === "Statement" && "5.5 x 8.5 inches"}
                                    {config.paperSize === "US Letter" && "8.5 x 11 inches"}
                                    {config.paperSize === "A3" && "297 x 420 mm"}
                                    {config.paperSize === "A4" && "210 x 297 mm"}
                                    {config.paperSize === "A5" && "148 x 210 mm"}
                                    {config.paperSize === "B4" && "250 x 353 mm"}
                                    {config.paperSize === "B5" && "176 x 250 mm"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-xs  w-32">
                                Orientation
                            </label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setConfig({ ...config, orientation: "portrait" })}
                                    className={`p-2 border rounded transition-colors ${config.orientation === "portrait"
                                        ? "border-gray-400 bg-gray-100"
                                        : "border-gray-300 bg-white hover:border-gray-400"
                                        }`}
                                >
                                    <svg width="18" height="24" viewBox="0 0 18 24" className="">
                                        <rect x="0" y="0" width="18" height="24" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                                        <rect x="2" y="2" width="4" height="2" fill="white" />
                                        <rect x="2" y="5" width="4" height="2" fill="white" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setConfig({ ...config, orientation: "landscape" })
                                    }
                                    className={`p-2 border rounded transition-colors ${config.orientation === "landscape"
                                        ? "border-gray-400 bg-gray-100"
                                        : "border-gray-300 bg-white hover:border-gray-400"
                                        }`}
                                >
                                    <svg width="24" height="18" viewBox="0 0 24 18" className="">
                                        <rect x="0" y="0" width="24" height="18" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                                        <rect x="2" y="2" width="4" height="2" fill="white" />
                                        <rect x="2" y="5" width="4" height="2" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-xs  w-32">
                                Scale Percentage
                            </label>
                            <input
                                type="text"
                                value={config.scalePercentage}
                                onChange={(e) =>
                                    setConfig({ ...config, scalePercentage: e.target.value })
                                }
                                className="w-20 px-1 py-1 border border-gray-300 text-xs  focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 px-6 pb-4 pt-8">
                        <button
                            onClick={onClose}
                            className="px-6 py-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300   text-xs font-medium rounded border border-gray-300  transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleView}
                            className="px-8 py-1.5 bg-linear-to-b from-[#5e98cf] to-[#0d75d5] text-white text-xs font-medium rounded hover:bg-[#4a8bc2] transition-colors"
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
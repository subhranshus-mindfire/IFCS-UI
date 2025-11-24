import React from "react";

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    // qrCodeUrl will now be the path to the PDF file
    pdfUrl: string;
    title?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
    isOpen,
    onClose,
    // Renamed qrCodeUrl to pdfUrl for clarity
    pdfUrl,
    title = ""
}) => {
    if (!isOpen) return null;

    // Use a default title or a specific PDF viewer title
    const modalTitle = title === "QR Code" ? "Document Preview" : title;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            {/* 1. CORRECTED: Removed Markdown bolding from className */}
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">
                        {modalTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                    {pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            title="Embedded Document"
                            // 2. CORRECTED: Removed Markdown bolding from the style object
                            className="w-full"
                            style={{ height: "40vh", border: 'none' }}
                        // The type="application/pdf" attribute is optional but good for context
                        />
                    ) : (
                        <div className="text-gray-500 py-20">
                            No PDF document available
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default QRCodeModal;
import React from "react";

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrCodeUrl: string;
    title?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
    isOpen,
    onClose,
    qrCodeUrl,
    title = "QR Code"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
                    {qrCodeUrl ? (
                        <img
                            src={qrCodeUrl}
                            alt="QR Code"
                            className="max-w-full h-auto"
                            style={{ maxHeight: "400px" }}
                        />
                    ) : (
                        <div className="text-gray-500 py-20">
                            No QR Code available
                        </div>
                    )}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-bg-button text-white rounded hover:bg-bg-button-hover transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;
import { useRef, useState, useEffect } from "react";
import Button from "../../Button";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
  title?: string;
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title = "Sign Here",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-surface rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-muted">
          <h2 className="text-lg font-medium text-text-primary">{title}</h2>
        </div>

        {/* Canvas */}
        <div className="p-6">
          <div className="border-2 border-border-muted rounded-2xl overflow-hidden bg-bg-surface">
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border-muted">
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-bg-secondary text-text-primary rounded-2xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={clearCanvas}
            className="px-6 py-2 bg-bg-secondary text-text-primary rounded-2xl hover:bg-gray-300 transition-colors"
          >
            Clear
          </Button>

          <Button
            onClick={saveSignature}
            disabled={!hasSignature}
            className={`px-6 py-2 rounded-2xl transition-colors ${hasSignature
                ? "bg-bg-button text-white hover:opacity-90"
                : "bg-gray-300 text-text-tertiary cursor-not-allowed"
              }`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;

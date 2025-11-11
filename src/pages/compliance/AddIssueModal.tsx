import { X, Calendar } from "lucide-react";
import { useRef } from "react";

interface ModalProps {
  onClose: () => void;
}

export default function AddIssueModal({ onClose }: ModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Background */}
      <div
        className="absolute inset-0 bg-[rgb(0,0,0,0.5)] backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative max-w-6xl max-h-[90vh] overflow-y-auto 
                      bg-white rounded-2xl shadow-lg p-6 pointer-events-auto">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-normal text-text-secondary">
            Add New Issue
          </h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-5">

          {/* Flight + Date */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-xs text-gray-500">Flight #</label>
              <input
                type="text"
                placeholder="Flight #"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none"
              />
            </div>

            <div className="w-1/2">
              <label className="text-xs text-gray-500">Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Jun"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none"
                />
                <Calendar size={18} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Flight Director */}
          <div>
            <label className="text-xs text-gray-500">Flight Director</label>
            <input
              type="text"
              placeholder="Flight Director"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>

          {/* Category + AC Reg */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-xs text-gray-500">Category</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none">
                <option>Category</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="text-xs text-gray-500">A/C Reg.</label>
              <input
                type="text"
                placeholder="A/C Reg."
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Station */}
          <div>
            <label className="text-xs text-gray-500">Station</label>
            <select className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none">
              <option>Station</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs text-gray-500">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-500">Description</label>
            <textarea
              rows={4}
              placeholder="Description"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="text-xs text-gray-500">Image(s)</label>

            <div
              onClick={handleUploadClick}
              className="mt-2 border-2 border-dashed border-purple-300/60 bg-purple-50/30 
                         rounded-xl p-5 text-center text-sm text-gray-500 cursor-pointer"
            >
              Drag and drop the image here <br />
              Or Click to upload
              <div className="text-xs mt-1 text-gray-400">
                Supported formats: JPG, PNG, WEBP
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-bg-tertiary"
          >
            Cancel
          </button>

          <button className="bg-bg-button hover:bg-[#6c2cf1] 
                             text-(--color-text-surface) px-10 py-2 rounded-xl">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

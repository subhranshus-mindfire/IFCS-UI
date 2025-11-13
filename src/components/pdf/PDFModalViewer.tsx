import { useState } from "react";
import { Document, Page } from "react-pdf";

type Props = {
  file: string;
  onClose: () => void;
};

export default function PDFModalViewer({ file, onClose }: Props) {
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] backdrop-blur-sm flex justify-center items-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-5 max-h-[90vh] overflow-y-auto relative w-[90%] lg:w-[70%]">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>

        <Document
          file={file}
          onLoadSuccess={(pdf) => setTotalPages(pdf.numPages)}
        >
          {Array.from({ length: totalPages }, (_, idx) => (
            <Page
              key={idx}
              pageNumber={idx + 1}
              scale={1.1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mb-6 flex justify-center"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}

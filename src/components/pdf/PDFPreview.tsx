import { useState } from "react";
import { Document, Page } from "react-pdf";

type Props = {
  file: string;
  scale?: number;
};

export default function PDFPreview({ file, scale = 0.8 }: Props) {
  const [ready, setReady] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <Document file={file}>
        <Page
          pageNumber={1}
          scale={scale}
          onRenderSuccess={() => setReady(true)}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      {!ready && (
        <p className="text-gray-400 text-sm">Loading preview...</p>
      )}
    </div>
  );
}

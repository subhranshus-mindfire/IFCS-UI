import type { FC } from "react";
import { QRCodeSVG } from "qrcode.react";

type PreparationData = {
  stowage: string;
  carrier: string;
  equipment: string;
  preparedBy: string;
};

type FlightData = {
  airlineCode: string;
  route: string;
  flightNumber: string;
  type: string;
  date: string;
  departure: string;
  arrival: string;
  depStation: string;
  arrStation: string;
  status: string;
  acType: string;
  acReg: string;
  groundTime: string;
  plan: string;
  paxTotal: number;
  pax: {
    first: string;
    business: string;
    premium: string;
    economy: string;
  };
};

interface LabelProps {
  preparation: PreparationData;
  flight: FlightData;
}

const GalleyLabel: FC<LabelProps> = ({ preparation, flight }) => {
  const qrData = JSON.stringify({
    stowage: preparation.stowage,
    carrier: preparation.carrier,
    preparedBy: preparation.preparedBy,
    flightNumber: flight.flightNumber,
    route: flight.route,
  });

  const airlineLogoUrl = `https://content.airhex.com/content/logos/airlines_${flight.airlineCode}_200_60_r.png`;

  return (
    <div className="border-2 border-black text-black font-sans bg-white w-full max-w-[240px] md:max-w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black px-2 py-2">
        {/* Airline + Flight Number */}
        <div className="flex flex-col items-start w-16 md:w-20">
          <img
            src={airlineLogoUrl}
            alt={`${flight.airlineCode} logo`}
            className="h-6 md:h-8 object-contain mb-2"
          />
          <div className="bg-black text-white px-1 md:px-2 py-1 text-base md:text-lg font-bold w-full text-center">
            {flight.flightNumber}
          </div>
        </div>

        {/* QR Code */}
        <div className="flex-1 flex justify-center">
          <QRCodeSVG value={qrData} size={90} className="md:size-[120px]" />
        </div>

        {/* Date + Stowage */}
        <div className="flex flex-col items-end w-16 md:w-20">
          <span className="text-xs md:text-sm font-bold mb-2">
            {flight.date}
          </span>
          <div className="bg-black text-white px-1 md:px-2 py-1 text-base md:text-lg font-bold w-full text-center">
            {preparation.stowage}
          </div>
        </div>
      </div>

      {/* Flight Info */}
      <div className="border-b-2 border-black px-2 py-1 text-center text-xs md:text-sm">
        <div className="font-medium truncate">
          {flight.acReg} | {flight.route} | {preparation.equipment}
        </div>
        <div className="mt-1 text-[10px] md:text-xs">
          {flight.depStation} / {flight.arrStation}
        </div>
      </div>

      {/* Carrier Big Label */}
      <div className="px-4 py-6 md:py-8 text-center">
        <div className="font-bold text-2xl md:text-4xl leading-tight">
          {preparation.carrier}
        </div>
      </div>
    </div>
  );
};

export default GalleyLabel;

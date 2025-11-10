import { useParams } from "react-router-dom";

const ComplianceTrackingDetails = () => {
  const { cityName, flightNo, date } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Flight {flightNo} - {date} ({cityName})
      </h1>
      <p className="text-gray-600">
        Details for this flight’s compliance record.
      </p>
      {/* Render detailed info here */}
    </div>
  );
};

export default ComplianceTrackingDetails;

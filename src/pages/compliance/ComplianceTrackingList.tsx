import { useParams } from "react-router-dom";

const ComplianceTrackingList = () => {
  const { cityName } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Compliance Tracking - {cityName}
      </h1>
      <p className="text-gray-600">
        List of flights or compliance items for {cityName}
      </p>
      {/* Render your list here */}
    </div>
  );
};

export default ComplianceTrackingList;

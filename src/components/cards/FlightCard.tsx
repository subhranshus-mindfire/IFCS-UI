import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

interface FlightCardProps {
  flightNumber: string;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  totalPassengers: number;
  economyPassengers: number;
  businessPassengers: number;
}

const FlightCard: React.FC<FlightCardProps> = ({
  flightNumber,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  totalPassengers,
  economyPassengers,
  businessPassengers,
}) => {
  return (
    <div className="bg-gray-200 rounded-xl shadow-md p-4 sm:p-6 w-full sm:w-96">
      <div className="flex justify-between text-gray-700 mb-4 text-sm sm:text-base">
        <span>Flight</span>
        <span className="font-semibold">{flightNumber}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">{departureTime}</p>
          <p className="text-2xl sm:text-3xl font-bold">{departureAirport}</p>
        </div>

        <div className="relative flex-1 mx-2 h-8">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 25 Q 50 5 100 25"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>

          <FontAwesomeIcon
            icon={faPlane}
            className="absolute text-gray-700 left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 text-xs sm:text-sm"
          />
        </div>

        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">{arrivalTime}</p>
          <p className="text-2xl sm:text-3xl font-bold">{arrivalAirport}</p>
        </div>
      </div>

      <div className="bg-white mt-6 rounded-lg p-3 sm:p-4 shadow-sm">
        <div className="flex justify-between text-gray-700 mb-3 text-xs sm:text-sm">
          <span>Total passengers:</span>
          <span className="font-bold">{totalPassengers}</span>
        </div>

        <div className="flex justify-around text-gray-700">
          <div className="text-center">
            <p className="text-lg sm:text-xl font-semibold">
              {economyPassengers}
            </p>
            <p className="text-xs sm:text-sm">Economy</p>
          </div>
          <div className="text-center">
            <p className="text-lg sm:text-xl font-semibold">
              {businessPassengers}
            </p>
            <p className="text-xs sm:text-sm">Business</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Delivery = {
  id: number;
  name: string;
};

const FlightDeliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const addDelivery = () => {
    const newDelivery: Delivery = {
      id: deliveries.length + 1,
      name: `Delivery ${deliveries.length + 1}`,
    };
    setDeliveries([...deliveries, newDelivery]);
  };

  return (
    <div className="w-full max-w-full h-full flex flex-col lg:flex-row gap-2 sm:gap-4 p-2 sm:p-0">
      <div className="w-full lg:w-72 bg-white rounded-xl shadow p-3 sm:p-4 flex flex-col">
        <div className="flex items-center justify-between border-b pb-2 mb-2">
          <h2 className="text-blue-400 font-semibold text-sm sm:text-base">
            Delivery:
          </h2>
          <button
            onClick={addDelivery}
            className="text-blue-400 hover:text-blue-800 p-1"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 italic">
          Add new deliveries here
        </p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow p-3 sm:p-4 min-h-64 lg:min-h-0">
        {deliveries.length === 0 ? (
          <div className="h-full min-h-48 lg:min-h-0 flex items-center justify-center text-gray-400 italic text-sm sm:text-base text-center px-4">
            No deliveries yet. Click + to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm"
              >
                <h3 className="text-blue-700 font-bold text-sm sm:text-base">
                  {delivery.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Delivery details here
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDeliveries;

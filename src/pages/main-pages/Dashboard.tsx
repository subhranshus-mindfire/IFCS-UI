import FlightCard from "../../components/cards/FlightCard";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardMetrics from "../../components/DashboardMetrics";

function Dashboard() {
  return (
    <>
      <DashboardHeader userName="Shitanshu" />
      <DashboardMetrics />

      <h1 className="mt-10 md:ms-0 ms-5">Upcoming Flights</h1>
      <div className="mt-10 flex justify-around flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-6 px-4">
        <FlightCard
          flightNumber="WY101"
          departureTime="6:10 PM"
          departureAirport="LHR"
          arrivalTime="10:15 AM"
          arrivalAirport="MCT"
          totalPassengers={525}
          economyPassengers={485}
          businessPassengers={40}
        />
        <FlightCard
          flightNumber="WY101"
          departureTime="6:10 PM"
          departureAirport="LHR"
          arrivalTime="10:15 AM"
          arrivalAirport="MCT"
          totalPassengers={525}
          economyPassengers={485}
          businessPassengers={40}
        />
        <FlightCard
          flightNumber="WY101"
          departureTime="6:10 PM"
          departureAirport="LHR"
          arrivalTime="10:15 AM"
          arrivalAirport="MCT"
          totalPassengers={525}
          economyPassengers={485}
          businessPassengers={40}
        />
      </div>
    </>
  );
}

export default Dashboard;

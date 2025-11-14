import { create } from 'zustand';
import { flights } from '../const/flightData';
import type { FlightStoreState } from '../types/Flight';

export const useFlightStore = create<FlightStoreState>((set) => ({
    flights: [],
    isLoading: false,
    error: null,

    fetchFlights: async (filters) => {
        set({ isLoading: true, error: null });

        try {
            console.log(filters)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Filter the flights based on the filters
            let filteredFlights = flights;
            if (filters) {
                // Filter by date if provided
                if (filters.date) {
                    filteredFlights = filteredFlights.filter(pair =>
                        pair.some(flight => {
                            // Convert flight date format "Nov 03" to match filter format "YYYY-MM-DD"
                            const [month, day] = flight.date.split(' ');
                            const monthMap: { [key: string]: string } = {
                                'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
                                'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
                                'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                            };
                            const year = new Date().getFullYear();
                            const flightDate = `${year}-${monthMap[month]}-${day}`;
                            return flightDate === filters.date;
                        })
                    );
                }

                // Filter by station if provided
                if (filters.station) {
                    console.log("filters")
                    filteredFlights = filteredFlights.filter(pair =>
                        pair.some(flight =>
                            flight.depStation?.toLowerCase().includes(filters.station!.toLowerCase()) ||
                            flight.arrStation?.toLowerCase().includes(filters.station!.toLowerCase())
                        )
                    );
                }

                // Filter by flight number if provided
                if (filters.flight) {
                    filteredFlights = filteredFlights.filter(pair =>
                        pair.some(flight =>
                            flight.flightNumber?.toLowerCase().includes(filters.flight!.toLowerCase())
                        )
                    );
                }

                // Filter by AC Reg if provided
                if (filters.acReg) {
                    filteredFlights = filteredFlights.filter(pair =>
                        pair.some(flight =>
                            flight.acReg?.toLowerCase().includes(filters.acReg!.toLowerCase())
                        )
                    );
                }

                // Filter by AC Type if provided
                if (filters.acType) {
                    filteredFlights = filteredFlights.filter(pair =>
                        pair.some(flight =>
                            flight.acType?.toLowerCase().includes(filters.acType!.toLowerCase())
                        )
                    );
                }

                // Filter by route if provided
                if (filters.route) {
                    filteredFlights = filteredFlights.filter(pair =>
                        pair.some(flight =>
                            flight.route?.toLowerCase().includes(filters.route!.toLowerCase())
                        )
                    );
                }

                // Filter by client if provided
                if (filters.client) {
                    // Add client filtering logic when you have client data in flight objects

                }
            }

            set({ flights: filteredFlights, isLoading: false });

        } catch (err) {
            console.error("Failed to fetch flights:", err);
            let errorMessage = "Failed to load flight data.";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            set({ error: errorMessage, isLoading: false });
        }
    },
}));
export interface Flight {
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
    groundTime?: string;
    plan?: string;
    mealPlan?: string | null;
    paxTotal: number;
    pax: {
        first: string;
        business: string;
        premium: string;
        economy: string;
    };
    departureType: "actual" | "estimated" | "scheduled";
    arrivalType: "actual" | "estimated" | "scheduled";
}

export interface FlightFilters {
    station?: string;
    date?: string;
    flight?: string;
    acReg?: string;
    acType?: string;
    route?: string;
    client?: string;
}
export interface FlightStoreState {
    flights: Flight[][];
    isLoading: boolean;
    error: string | null;
    fetchFlights: (filters?: FlightFilters) => Promise<void>;
}


export interface ChangeRecord {
    field: string;
    previously: string;
    now: string;
}

export interface HistoryEntry {
    timestamp: string;
    label: string;
    changes: ChangeRecord[];
}

export interface FlightHistory {
    [flightId: string]: HistoryEntry[];
}

//****************************MEAL COUNT MODAL****************************************/
export interface PDFConfigModalProps {
    flightNumber: string;
    onClose: () => void;
    onView: (config: PDFConfig) => void;
}

export interface PDFConfig {
    numberPagesFrom: string;
    recordRange: string;
    paperSize: string;
    orientation: "portrait" | "landscape";
    scalePercentage: string;
}


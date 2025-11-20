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
  client: string;
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


// New One

export interface FlightData {
  id: string;
  fmId: string;
  isCancelled: boolean;
  isPrepared: boolean;

  loadingPlanId: string | null;
  menuId: string | null;
  parentId: string;

  aircraftConfigId: string;
  aircraftId: string;
  airlineId: string;

  flightNumber: string;
  flightNumberSuffix: string | null;
  direction: string;

  departureDestination: string;
  departureGate: string;

  scheduledDeparture: string;
  estimatedDeparture: string | null;
  actualDeparture: string | null;

  arrivalDestination: string;
  arrivalGate: string;

  scheduledArrival: string;
  estimatedArrival: string | null;
  actualArrival: string | null;

  flightType: string;
  flightTypeIataCode: string;

  status: string;

  pairPosition: number;
  pairRoute: string;
  pairType: string;

  cutoffTime: string;

  isAutoPairDisabled: boolean;
  isAutoSyncDisabled: boolean;
  isLoadingPlanRulesDisabled: boolean;
  isMealPlanRulesDisabled: boolean;
  isPricingRulesDisabled: boolean;

  rulesProperties: unknown;

  syncKeyWithoutDestination: string;
  syncKeyWithDestination: string;

  ifcsClient: string;

  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;

  scheduledDepartureUtc: string;
  estimatedDepartureUtc: string | null;
  actualDepartureUtc: string | null;

  scheduledArrivalUtc: string;
  estimatedArrivalUtc: string | null;
  actualArrivalUtc: string | null;

  aircraft: {
    id: string;
    type: string;
    registration: string;
    aircraftGroup: string | null;
    designator: string;
  };

  aircraftConfig: {
    id: string;
    fmId: string | null;
    lopa: string;
    name: string;
  };

  airline: {
    id: string;
    fmId: string | null;
    code: string;
    name: string;
    logo: string | null;
    designator: string;
  };

  loadingPlan: {
    id: string;
    fmId?: string | null;
    name: string;
    value?: string;
  } | null;

  mealPlan: {
    id: string;
    fmId?: string | null;
    name: string;
  } | null;

  passengers: {
    id: string;
    fmId: string;
    totalCount: number;
    businessStudioCount: number;
    businessCount: number;
    economyCount: number;
    crewCount: number;
  };

  selectedFlight: boolean;
}

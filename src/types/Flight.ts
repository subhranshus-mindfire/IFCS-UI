export interface FlightInfo {
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
export interface PaxCounts {
  totalCount: number | null;
  businessStudioCount: number | null;
  businessCount: number | null;
  economyCount: number | null;
  crewCount: number | null;
}

export interface Aircraft {
  id: string;
  type: string;
  registration: string;
  aircraftGroup: string | null;
  designator: string;
}

export interface Airline {
  id: string;
  fmId: string | null;
  code: string;
  name: string;
  logo: string | null;
  designator: string;
}

export interface LoadingPlan {
  id: string;
  fmId: string | null;
  value: string;
  name: string;
  isSetupRecord: boolean;
}

export interface MealPlan {
  id: string;
  fmId: string | null;
  name: string;
}

export interface Flight {
  id: string;
  fmId: string | null;
  isCancelled: boolean;
  isPrepared: boolean;
  parentId: string | null;
  flightNumber: string;
  flightNumberSuffix: string | null;
  direction: string;
  departureDestination: string;
  departureGate: string | null;

  scheduledDeparture: string;
  estimatedDeparture: string | null;
  actualDeparture: string | null;
  scheduledArrival: string;
  estimatedArrival: string | null;
  actualArrival: string | null;

  arrivalDestination: string; // IATA code
  arrivalGate: string | null;
  flightType: string;
  flightTypeIataCode: string | null;
  status: string;
  pairPosition: number | null;
  pairRoute: string;
  pairType: string | null;
  cutoffTime: string | null;
  isAutoPairDisabled: boolean;
  isAutoSyncDisabled: boolean;
  isLoadingPlanRulesDisabled: boolean;
  isMealPlanRulesDisabled: boolean;
  isPricingRulesDisabled: boolean;
  rulesProperties: Record<string, unknown> | null;
  syncKeyWithoutDestination: string | null;
  syncKeyWithDestination: string | null;
  ifcsClient: string | null;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;

  scheduledDepartureUtc?: string;
  estimatedDepartureUtc?: string | null;
  actualDepartureUtc?: string | null;
  scheduledArrivalUtc?: string;
  estimatedArrivalUtc?: string | null;
  actualArrivalUtc?: string | null;


  aircraft: Aircraft;
  airline: Airline;
  loadingPlan?: LoadingPlan | null;
  mealPlan?: MealPlan | null;
  paxCounts: PaxCounts;
}


export interface FlightFilters {
  page: number;
  limit: number;
  sortBy: string;
  order: 'asc' | 'desc';
  station?: string;
  date?: string;
  flight?: string;
  acReg?: string;
  acType?: string;
  route?: string;
  isCancelled?: string;
  status?: string;
  search?: string
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


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

export interface FlightList {
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
  flights: FlightList[][];
  isLoading: boolean;
  error: string | null;
  fetchFlights: (filters?: FlightFilters) => Promise<void>;
}

export interface ChangeRecord {
  field: string;
  previously: string;
  now: string;
}

export interface HistoryChange {
  field: string;
  previously: string;
  now: string;
}

export interface HistoryEntryDisplay {
  timestamp: string;
  label: string;
  changes: HistoryChange[];
}

export interface FlightHistoryEntry {
  id: string;
  fmId: string;
  flightId: string;
  flightNumber: string;
  airlineDesignator: string;
  flightUpdateFileId: string | null;
  flightNumberSuffix: string | null;
  flightRouteNumber: string | null;
  syncKeyWithoutDestination: string | null;
  syncKeyWithDestination: string | null;
  sourceData: string | null;
  status: string | null;
  estimatedDeparture: string | null;
  actualDeparture: string | null;
  estimatedArrival: string | null;
  actualArrival: string | null;
  departureDestination: string | null;
  arrivalDestination: string | null;
  dataSource: string | null;
  flightTypeIataCode: string;
  sourceFileName: string;
  updateIndexWithinFile: number;
  updateTimestamp: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  createdAt: string;
  updatedAt: string;

}

export interface FlightHistoryStoreState {
  rawHistory: FlightHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  fetchFlightHistory: (flightNumber: string) => Promise<void>;
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


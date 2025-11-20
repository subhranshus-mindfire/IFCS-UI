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


export interface FlightStats {
  total: number;
  completed: number;
  waiting: number;
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
  search?: string;
  client?: string
}
export interface AddFlightPayload {
  airlineCode: string;
  direction: string;
  flightType: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  aircraftReg: string;
  paxCount: number;
  manualPairing: boolean;
  manualLoadingPlanSelection: boolean;
  manualMealPlanSelection: boolean;
}
export interface AddFlightResponse {
  id: string;
  fmId: string | null;
  isCancelled: boolean;
  isPrepared: boolean;
  loadingPlanId: string | null;
  menuId: string | null;
  parentId: string | null;
  aircraftConfigId: string | null;
  aircraftId: string;
  airlineId: string;
  flightNumber: string;
  flightNumberSuffix: string | null;
  direction: string;
  departureDestination: string;
  departureGate: string | null;
  scheduledDeparture: string;
  estimatedDeparture: string | null;
  actualDeparture: string | null;
  arrivalDestination: string;
  arrivalGate: string | null;
  scheduledArrival: string;
  estimatedArrival: string | null;
  actualArrival: string | null;
  flightType: string;
  flightTypeIataCode: string | null;
  status: string;
  pairPosition: string | null;
  pairRoute: string | null;
  pairType: string | null;
  cutoffTime: string | null;
  isAutoPairDisabled: boolean;
  isAutoSyncDisabled: boolean;
  isLoadingPlanRulesDisabled: boolean;
  isMealPlanRulesDisabled: boolean;
  isPricingRulesDisabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddFormState {
  airlineCode: string;
  direction: string;
  flightType: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  aircraftReg: string;

  pax: {
    businessStudio: number;
    business: number;
    economy: number;
    crew: number;
  };

  manualPairing: boolean;
  manualLoadingPlanSelection: boolean;
  manualMealPlanSelection: boolean;

  departureAirport: string;
  arrivalAirport: string;
}


export interface FlightStoreState {
  flights: FlightList[][];
  flightStats: FlightStats;
  filters: FlightFilters,
  isLoading: boolean;
  error: string | null;
  fetchFlights: (filters?: FlightFilters) => Promise<void>;
  fetchFlightStats: (filters?: FlightFilters) => Promise<void>;
  addFlight: (payload: AddFlightPayload) => Promise<AddFlightResponse>;
  setFilters: (newFilters: FlightFilters) => void;
}
export interface FlightRowProps {
  flight: FlightList;
  onShowHistory: (flightNumber: string) => void;
  hideRoute?: boolean;
  isFirstInPair?: boolean;
  isLastInPair?: boolean;
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


//****************************PREPARATION****************************************/

export interface PreparationItem {
  stowage: string;
  carrier: string;
  equipment: string;
  preparedBy: string;
}

export interface PromptModalState {
  isOpen: boolean;
  rowIndex: number | null;
  actionIndex: number | null;
  actionName: string;
  isBlocked: boolean;
  isCompleted: boolean;
}

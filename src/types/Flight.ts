/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Label } from "../components/Label";

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
// export interface PaxCounts {
//   id: string;
//   fmId: string;
//   totalCount: number | null;
//   businessStudioCount: number | null;
//   businessCount: number | null;
//   economyCount: number | null;
//   crewCount: number | null;
// }

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
  scheduledDepartureUtc: string | null;
  actualDeparture: string | null;
  scheduledArrival: string;
  scheduledArrivalUtc: string | null;
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

  // scheduledDepartureUtc?: string;
  scheduledDepartureUtcUtc?: string | null;
  actualDepartureUtc?: string | null;
  // scheduledArrivalUtc?: string;
  scheduledArrivalUtcUtc?: string | null;
  actualArrivalUtc?: string | null;


  aircraft: Aircraft;
  airline: Airline;
  loadingPlan?: LoadingPlan | null;
  mealPlan?: MealPlan | null;
  passengers: PaxCounts;
}


export interface FlightStats {
  total: number;
  completed: number;
  waiting: number;
}

export interface FieldLabelProps extends React.ComponentProps<typeof Label> {
  require?: boolean;
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
  manualPairing: boolean;
  manualLoadingPlanSelection: boolean;
  manualMealPlanSelection: boolean;
  businessStudioCount: number;
  businessCount: number;
  economyCount: number;
  crewCount: number;
  isPrimary?: boolean;
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
  scheduledDepartureUtc: string | null;
  actualDeparture: string | null;
  arrivalDestination: string;
  arrivalGate: string | null;
  scheduledArrival: string;
  scheduledArrivalUtc: string | null;
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
export interface AirlineOption {
  id: string;
  code: string;
  name: string;
  logo: string | null;
}

export interface AirportOption {
  id: string;
  code: string;
  city: string;
  country: string;
  name: string;
  timezone: string;
}

export interface AircraftOption {
  id: string;
  fmId: string | null;
  aircraftConfigId: string | null;
  type: string;
  registration: string;
  aircraftGroup: string | null;
  designator: string;
}

export interface FlightOptions {
  airlineCodes: AirlineOption[];
  airports: AirportOption[];
  aircraftRegs: AircraftOption[];
}


export interface FlightStoreState {
  flightData: FlightData[] | null;
  flights: FlightList[][];
  flightStats: FlightStats;
  filters: FlightFilters,
  airlineCodeOptions: AirlineOption[];
  airportOptions: AirportOption[];
  aircraftRegOptions: AircraftOption[];
  isLoading: boolean;
  error: string | null;
  fetchFlight: (flightId: string) => Promise<void>;
  fetchFlights: (filters?: FlightFilters) => Promise<void>;
  fetchFlightStats: (filters?: FlightFilters) => Promise<void>;
  addFlight: (payload: AddFlightPayload) => Promise<AddFlightResponse>;
  addBulkFlight: (payload: AddFlightPayload[]) => Promise<AddFlightResponse[]>
  setFilters: (newFilters: FlightFilters) => void;
  fetchFlightOptions: () => Promise<void>;
  updateFlight: (flightId: string, payload: any) => Promise<void>;
  clearFlight: () => void;
}
export interface FlightRowProps {
  flight: FlightList;
  onShowHistory: (flightNumber: string) => void;
  hideRoute?: boolean;
  isFirstInPair?: boolean;
  isLastInPair?: boolean;
  fullPairRoute: string
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
  scheduledDepartureUtc: string | null;
  actualDeparture: string | null;
  scheduledArrivalUtc: string | null;
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
  position: string;
  nameDisplay: string;
  equipment: string;
  preparedBy: string;

  id: string;
  flightId: string;
  storageId: string;
  code: string;
  name: string;
  priority: number;
  date: string;

  isContentPrepared: boolean;
  isDynamicLoadingIncomplete: boolean;
  assemblyProcessFlag: string;
  loadedTruckFlag: string;

  isTrackConsumption: boolean;
  weight: number;
  availableWeight: number;
  quantity: number;
  sealTagNumber: string;

  qrCodeUrl: string;
  dynamicLoadingQrCodeUrl: string;
  labelUrl: string;
  report: string;

  createdAt: string;
  updatedAt: string;

  packingStandardId: string;
  parentStorageId: string;
  galleyConfigurationId: string;
  galleyCode: string;
  galleyPosition: string;
  positionRap: string;
  rotationCode: string;
  direction: string;
  qrCode: string;
  dynamicLoadingQrCode: string;
}

export interface PromptModalState {
  isOpen: boolean;
  rowIndex: number | null;
  actionIndex: number | null;
  actionName: string;
  isBlocked: boolean;
  isCompleted: boolean;
}


export interface PreparationStoreState {
  preparations: PreparationItem[];
  isLoading: boolean;
  error: string | null;
  fetchData: (flightId: string) => Promise<void>;
}


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
  scheduledDepartureUtc: string | null;
  actualDeparture: string | null;

  arrivalDestination: string;
  arrivalGate: string;

  scheduledArrival: string;
  scheduledArrivalUtc: string | null;
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

  // scheduledDepartureUtc: string;
  scheduledDepartureUtcUtc: string | null;
  actualDepartureUtc: string | null;

  // scheduledArrivalUtc: string;
  scheduledArrivalUtcUtc: string | null;
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



export interface FoodOrderItem {
  id: string;
  fmId: string;
  flightId: string;
  mealId: string;
  mealName: string;
  orderCount1: number;
  orderCount2: number;
  isDynamicLoadingIncomplete: boolean;
  seatNumber: string;
  passengerName: string;
  cabinClass: string;
  loadedStatus: string;
  arrivalDate: string;
  departureDate: string;
  arrivalTime: string;
  departureTime: string;
  createdAt: string;
  updatedAt: string;
  flightNumber: string;
  departureStation: string;
  mealCode: string;
}



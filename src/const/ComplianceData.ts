export interface IssueCategory {
  id: string;
  name: string;
  issueCount: number;
  icon: string;
}

export interface Station {
  id: string;
  city: string;
  caterer: string;
  unresolved: number;
  closed: number;
  total: number;
  delays: number;
  quality: number;
  compliance: number;
  provisioning: number;
  unclassified: number;
  safety: number;
  action: boolean;
}

export interface Country {
  name: string;
  stations: Station[];
}

export const ISSUE_CATEGORIES: IssueCategory[] = [
  {
    id: "delays",
    name: "Delays",
    issueCount: 30,
    icon: "fa-solid fa-clock",
  },
  {
    id: "quality",
    name: "Quality",
    issueCount: 41,
    icon: "fa-solid fa-circle-check",
  },
  {
    id: "compliance",
    name: "Compliance",
    issueCount: 50,
    icon: "fa-solid fa-circle-check",
  },
  {
    id: "provisioning",
    name: "Provisioning",
    issueCount: 31,
    icon: "fa-solid fa-chart-simple",
  },
  {
    id: "unclassified",
    name: "Unclassified",
    issueCount: 90,
    icon: "fa-solid fa-circle-question",
  },
  {
    id: "safety",
    name: "Safety",
    issueCount: 186,
    icon: "fa-solid fa-triangle-exclamation",
  },
];

export const COUNTRIES_DATA: Country[] = [
  {
    name: "Canada",
    stations: [
      {
        id: "YVR",
        city: "Vancouver",
        caterer: "---",
        unresolved: 0,
        closed: 0,
        total: 0,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 0,
        unclassified: 0,
        safety: 0,
        action: true,
      },
      {
        id: "YGB",
        city: "Quebec City",
        caterer: "---",
        unresolved: 0,
        closed: 0,
        total: 0,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 0,
        unclassified: 0,
        safety: 0,
        action: true,
      },
      {
        id: "YUL",
        city: "Montreal",
        caterer: "---",
        unresolved: 0,
        closed: 0,
        total: 0,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 0,
        unclassified: 0,
        safety: 0,
        action: true,
      },
      {
        id: "YYZ",
        city: "Toronto",
        caterer: "---",
        unresolved: 0,
        closed: 0,
        total: 0,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 0,
        unclassified: 0,
        safety: 0,
        action: true,
      },
    ],
  },
  {
    name: "France",
    stations: [
      {
        id: "CDG",
        city: "Paris",
        caterer: "Servair",
        unresolved: 1,
        closed: 3,
        total: 4,
        delays: 0,
        quality: 1,
        compliance: 0,
        provisioning: 2,
        unclassified: 1,
        safety: 0,
        action: true,
      },
      {
        id: "ORY",
        city: "Paris",
        caterer: "Newrest",
        unresolved: 0,
        closed: 1,
        total: 1,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 1,
        unclassified: 0,
        safety: 0,
        action: true,
      },
    ],
  },
  {
    name: "Italy",
    stations: [
      {
        id: "FCO",
        city: "Rome",
        caterer: "Autogrill",
        unresolved: 0,
        closed: 0,
        total: 0,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 0,
        unclassified: 0,
        safety: 0,
        action: true,
      },
    ],
  },
  {
    name: "United Kingdom",
    stations: [
      {
        id: "LHR",
        city: "London",
        caterer: "Gate Gourmet",
        unresolved: 0,
        closed: 0,
        total: 0,
        delays: 0,
        quality: 0,
        compliance: 0,
        provisioning: 0,
        unclassified: 0,
        safety: 0,
        action: true,
      },
    ],
  },
];

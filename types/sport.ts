export enum Sport {
  FOOTBALL = "football",
}

export enum SportNames {
  null = "No Sport",
  "football" = "Football",
}

export type FootballEventType = "goal";

export type SportEvent = FootballEventType; // | BasketballEventType | TennisEventType | ...;

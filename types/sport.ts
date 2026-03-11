export enum Sport {
  FOOTBALL = "football",
}

export type FootballEventType = "goal";

export type SportEvent = FootballEventType; // | BasketballEventType | TennisEventType | ...;

import { SportEvent } from "./sport";

export enum MatchStatus {
  SCHEDULED = "scheduled",
  FINISHED = "finished",
}

export type Matchday = {
  id: string;
  matches: Match[];
};

export type MatchEvent = {
  id: string;
  event: SportEvent;
  team_id: string;
  player_id: string | null;
  minute: number;
};

export type Match = {
  id: string;
  teamA: string | null;
  teamB: string | null;
  teamAScore: number;
  teamBScore: number;
  status: MatchStatus;
  events: MatchEvent[];
  winnerId: string | null;
  isDraw: boolean;
};

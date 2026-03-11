import { Matchday } from "./match";
import { Sport } from "./sport";
import { Team } from "./team";

export enum StatusType {
  DRAFT = "draft",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export enum TournamentFormat {
  ROUND_ROBIN = "roundrobin",
  KNOCKOUT = "knockout",
}

export type NewTournament = {
  status: StatusType;
  imageUri: string | null;
  format: TournamentFormat;
  sport: Sport | null;
  name: string;
  startDate: string;
  teams: Team[];
  matchdays: Matchday[];
  pointsWin: number;
  pointsTie: number;
  pointsLose: number;
};

export type Tournament = {
  id: string;
  status: StatusType;
  imageUri: string | null;
  format: TournamentFormat;
  sport: Sport | null;
  name: string;
  startDate: string;
  teams: Team[];
  matchdays: Matchday[];
  pointsWin: number;
  pointsTie: number;
  pointsLose: number;
};

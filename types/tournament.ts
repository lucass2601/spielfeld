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

export type RoundRobinSettings = {
  type: TournamentFormat.ROUND_ROBIN;
  pointsWin: number;
  pointsTie: number;
  pointsLose: number;
};

export type KnockoutSettings = {
  type: TournamentFormat.KNOCKOUT;
};

export type FormatSettings = RoundRobinSettings | KnockoutSettings;

export type RoundRobinRow = {
  id: Team["id"];
  name: Team["name"];
  imageUri: Team["imageUri"];
  gamesPlayed: number;
  wins: number;
  ties: number;
  loses: number;
  goalDifference: number;
  points: number;
};

export type NewTournament = {
  status: StatusType;
  imageUri: string | null;
  format: TournamentFormat;
  formatSettings: FormatSettings;
  sport: Sport | null;
  name: string;
  startDate: string;
};

export type Tournament = NewTournament & {
  id: string;
  teams: Team[];
  matchdays: Matchday[];
};

export type TournamentSettings = Pick<
  Tournament,
  "name" | "imageUri" | "startDate" | "sport"
>;

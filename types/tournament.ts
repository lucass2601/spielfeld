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
  pointsWin: number;
  pointsTie: number;
  pointsLose: number;
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

export type MatchStatus = "scheduled" | "finished";

export type MatchEvent = {
  id: string;
  event: "goal";
  team_id: string;
  player_id: string | null;
  minute: string | number;
};

export type Match = {
  id: string;
  teamA: string;
  teamB: string;
  teamAScore: number;
  teamBScore: number;
  status: MatchStatus;
  events: MatchEvent[];
  winnerId: string | null;
  isDraw: boolean;
};

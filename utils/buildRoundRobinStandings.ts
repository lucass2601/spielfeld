import {
  RoundRobinRow,
  Tournament,
  TournamentFormat,
} from "@/types/tournament";
import { Team } from "@/types/team";

export default function buildRoundRobinStandings(
  tournament: Tournament,
): RoundRobinRow[] {
  if (!tournament || tournament.format !== TournamentFormat.ROUND_ROBIN) {
    return [];
  }

  if (!tournament.teams || tournament.teams.length === 0) return [];

  if (tournament.formatSettings.type !== TournamentFormat.ROUND_ROBIN)
    return [];

  const pointsWin = tournament.formatSettings.pointsWin ?? 3;
  const pointsTie = tournament.formatSettings.pointsTie ?? 1;
  const pointsLose = tournament.formatSettings.pointsLose ?? 0;

  const rows = [...tournament.teams].map(
    (team) =>
      <RoundRobinRow>{
        id: team.id,
        name: team.name || null,
        imageUri: team.imageUri || null,
        gamesPlayed: 0,
        wins: 0,
        ties: 0,
        loses: 0,
        goalDifference: 0,
        points: 0,
      },
  );

  const getRow = (teamId: Team["id"]) =>
    rows.find((rowTeam) => rowTeam.id === teamId);

  for (const matchday of tournament.matchdays) {
    for (const match of matchday.matches) {
      const { teamA, teamAScore, teamB, teamBScore, winnerId, isDraw } = match;

      if (!teamA || !teamB) continue;

      if (teamAScore === null || teamBScore === null) continue;

      const rowTeamA = getRow(teamA);
      const rowTeamB = getRow(teamB);
      if (!rowTeamA || !rowTeamB) continue;

      if (isDraw && !winnerId) {
        rowTeamA.ties += 1;
        rowTeamB.ties += 1;
        rowTeamA.points += pointsTie;
        rowTeamB.points += pointsTie;
      }

      if (winnerId === teamA) {
        rowTeamA.wins += 1;
        rowTeamB.loses += 1;
        rowTeamA.points += pointsWin;
        rowTeamB.points += pointsLose;
      } else if (winnerId === teamB) {
        rowTeamB.wins += 1;
        rowTeamA.loses += 1;
        rowTeamB.points += pointsWin;
        rowTeamA.points += pointsLose;
      }

      rowTeamA.gamesPlayed += 1;
      rowTeamB.gamesPlayed += 1;
      rowTeamA.goalDifference += teamAScore - teamBScore;
      rowTeamB.goalDifference += teamBScore - teamAScore;
    }
  }

  rows.sort((x, y) => {
    if (y.points !== x.points) return y.points - x.points;
    if (y.wins !== x.wins) return y.wins - x.wins;
    if (y.goalDifference !== x.goalDifference)
      return y.goalDifference - x.goalDifference;
    return x.name.localeCompare(y.name);
  });

  return rows.map(
    ({
      id,
      name,
      imageUri,
      gamesPlayed,
      wins,
      ties,
      loses,
      goalDifference,
      points,
    }) => ({
      id,
      name,
      imageUri,
      gamesPlayed,
      wins,
      ties,
      loses,
      goalDifference,
      points,
    }),
  );
}

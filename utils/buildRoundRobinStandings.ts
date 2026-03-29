import { Tournament, TournamentFormat } from "@/types/tournament";
import { Match } from "@/types/match";

export default function buildRoundRobinStandings(tournament: Tournament) {
  if (!tournament || tournament.format !== "roundrobin") return [];
  if (!tournament.teams || tournament.teams.length === 0) return [];

  console.log(tournament);

  if (tournament.formatSettings.type !== TournamentFormat.ROUND_ROBIN) return;

  const pointsWin = tournament.formatSettings.pointsWin ?? 3;
  const pointsTie = tournament.formatSettings.pointsTie ?? 1;
  const pointsLose = tournament.formatSettings.pointsLose ?? 0;

  const rows = [...tournament.teams].map((team) => ({
    id: team.id,
    name: team.name || "?",
    imageUri: team.imageUri || null,
    gp: 0,
    w: 0,
    t: 0,
    l: 0,
    gd: 0,
    pts: 0,
  }));

  const getRow = (teamId: Match["teamA" | "teamB"]) =>
    rows.find((rowTeam) => rowTeam.id === teamId);

  for (const matchday of tournament.matchdays || []) {
    for (const match of matchday.matches || []) {
      const { teamA, teamAScore, teamB, teamBScore, winnerId, isDraw } = match;

      if (!teamAScore || !teamBScore) return;

      const hasA = Boolean(teamA);
      const hasB = Boolean(teamB);

      if (!hasA && !hasB) continue;

      if (hasA !== hasB) {
        continue;
      }

      const a = getRow(teamA);
      const b = getRow(teamB);
      if (!a || !b) continue;

      if (isDraw) {
        a.gp += 1;
        b.gp += 1;
        a.t += 1;
        b.t += 1;
        a.gd;
        a.pts += pointsTie;
        b.pts += pointsTie;
        continue;
      }

      if (winnerId === teamA) {
        a.gp += 1;
        b.gp += 1;
        a.w += 1;
        b.l += 1;
        a.pts += pointsWin;
        b.pts += pointsLose;
      } else if (winnerId === teamB) {
        a.gp += 1;
        b.gp += 1;
        b.w += 1;
        a.l += 1;
        b.pts += pointsWin;
        a.pts += pointsLose;
      }

      a.gd += teamAScore - teamBScore;
      b.gd += teamBScore - teamAScore;
    }
  }

  rows.sort((x, y) => {
    if (y.pts !== x.pts) return y.pts - x.pts;
    if (y.w !== x.w) return y.w - x.w;
    if (y.gd !== x.gd) return y.gd - x.gd;
    return x.name.localeCompare(y.name);
  });

  return rows.map(({ name, imageUri, gp, w, t, l, gd, pts }) => ({
    name,
    imageUri,
    gp,
    w,
    t,
    l,
    gd,
    pts,
  }));
}

export default function buildRoundRobinStandings(tournament) {
  if (!tournament || tournament.format !== "roundrobin") return [];
  if (!tournament.teams || tournament.teams.length === 0) return [];

  const options = { pointsWin: 3, pointsDraw: 1, pointsLoss: 0 };
  const { pointsWin, pointsDraw, pointsLoss } = options;

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

  const getRow = (teamId) => rows.find((m) => m.id === teamId);

  for (const md of tournament.matchdays || []) {
    for (const m of md.matches || []) {
      const { teamA, teamAScore, teamB, teamBScore, winnerId, isDraw } = m;

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
        a.pts += pointsDraw;
        b.pts += pointsDraw;
        continue;
      }

      if (winnerId === teamA) {
        a.gp += 1;
        b.gp += 1;
        a.w += 1;
        b.l += 1;
        a.pts += pointsWin;
        b.pts += pointsLoss;
      } else if (winnerId === teamB) {
        a.gp += 1;
        b.gp += 1;
        b.w += 1;
        a.l += 1;
        b.pts += pointsWin;
        a.pts += pointsLoss;
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

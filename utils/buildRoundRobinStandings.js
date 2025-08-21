export default function buildRoundRobinStandings(tournament) {
  // Guard clauses
  if (!tournament || tournament.format !== "roundrobin") return [];
  if (!tournament.teams || tournament.teams.length === 0) return [];

  // Scoring rules (soccer-style defaults)
  const options = { pointsWin: 3, pointsDraw: 1, pointsLoss: 0 };
  const { pointsWin, pointsDraw, pointsLoss } = options;

  // Seed rows for all teams
  const rows = [...tournament.teams].map((team) => ({
    id: team.id,
    name: team.name || "?",
    gp: 0,
    w: 0,
    t: 0,
    l: 0,
    pts: 0,
  }));

  const getRow = (teamId) => rows.find((r) => r.id === teamId);

  // Walk through all scheduled rounds
  for (const md of tournament.matchdays || []) {
    for (const r of md.rounds || []) {
      const { teamA, teamB, winnerId, isDraw } = r;

      const hasA = Boolean(teamA);
      const hasB = Boolean(teamB);

      // Ignore invalid rows (no teams)
      if (!hasA && !hasB) continue;

      // BYE: one participant is null
      if (hasA !== hasB) {
        continue;
      }

      const a = getRow(teamA);
      const b = getRow(teamB);
      if (!a || !b) continue;

      // Only count completed matches towards GP
      if (isDraw) {
        a.gp += 1;
        b.gp += 1;
        a.t += 1;
        b.t += 1;
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
      } // else: unknown winnerId, ignore
    }
  }

  // Sort: points desc, then wins desc, then name asc
  rows.sort((x, y) => {
    if (y.pts !== x.pts) return y.pts - x.pts;
    if (y.w !== x.w) return y.w - x.w;
    return x.name.localeCompare(y.name);
  });

  // Return minimal shape for your table
  return rows.map(({ name, gp, w, t, l, pts }) => ({ name, gp, w, t, l, pts }));
}

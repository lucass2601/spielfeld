import { Matchday, MatchStatus } from "@/types/match";

export default function advanceKnockoutWinners(
  matchdays: Matchday[],
): Matchday[] {
  const result = matchdays.map((md) => ({ ...md, matches: [...md.matches] }));

  for (let round = 0; round < result.length - 1; round++) {
    const currentMatches = result[round].matches;
    const nextMatches = result[round + 1].matches;

    for (let i = 0; i < currentMatches.length; i++) {
      let match = currentMatches[i];

      if ((!match.teamA || !match.teamB) && round === 0 && !match.winnerId) {
        match = {
          ...match,
          winnerId: match.teamA ?? match.teamB,
          status: MatchStatus.FINISHED,
        };
        currentMatches[i] = match;
      }

      if (!match.winnerId) continue;

      const nextIndex = Math.floor(i / 2);
      const nextMatch = nextMatches[nextIndex];
      if (!nextMatch) continue;

      // Even index → teamA, odd index → teamB
      const slot = i % 2 === 0 ? "teamA" : "teamB";
      if (nextMatch[slot] !== match.winnerId) {
        nextMatches[nextIndex] = { ...nextMatch, [slot]: match.winnerId };
      }
    }
  }

  return result;
}

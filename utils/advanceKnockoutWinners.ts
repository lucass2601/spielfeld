import { Matchday, MatchStatus } from "@/types/match";

export default function advanceKnockoutWinners(matchdays: Matchday[]) {
  for (let round = 0; round < matchdays.length - 1; round++) {
    const currentMatches = matchdays[round].matches;
    const nextMatches = matchdays[round + 1].matches;

    for (let i = 0; i < currentMatches.length; i++) {
      const match = currentMatches[i];

      if ((!match.teamA || !match.teamB) && round === 0) {
        match.winnerId = match.teamA ?? match.teamB;
        match.status = MatchStatus.FINISHED;
      }

      if (!match.winnerId) continue;

      const nextMatch = nextMatches[Math.floor(i / 2)];
      if (!nextMatch) continue;

      // Even index → teamA, odd index → teamB
      if (i % 2 === 0) {
        nextMatch.teamA = match.winnerId;
      } else {
        nextMatch.teamB = match.winnerId;
      }
    }
  }
}

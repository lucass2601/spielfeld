import { Match, Matchday, MatchStatus } from "@/types/match";
import { Team } from "@/types/team";

export default function cascadeKnockoutReset(
  matchdays: Matchday[],
  match_id: Match["id"],
  teamAId: Team["id"] | null,
  teamBId: Team["id"] | null,
): Matchday[] {
  const result = matchdays.map((md) => ({ ...md, matches: [...md.matches] }));

  for (
    let matchdayIndex = result.length - 1;
    matchdayIndex > 0;
    matchdayIndex--
  ) {
    const matches = result[matchdayIndex].matches;

    for (let matchIndex = matches.length - 1; matchIndex >= 0; matchIndex--) {
      const match = matches[matchIndex];

      const matchedId =
        teamAId && (match.teamA === teamAId || match.teamB === teamAId)
          ? teamAId
          : teamBId && (match.teamA === teamBId || match.teamB === teamBId)
            ? teamBId
            : null;

      if (matchedId) {
        matches[matchIndex] = {
          ...match,
          teamA: match.teamA === matchedId ? null : match.teamA,
          teamB: match.teamB === matchedId ? null : match.teamB,
          winnerId: null,
          isDraw: false,
          teamAScore: null,
          teamBScore: null,
          status: MatchStatus.SCHEDULED,
        };
      }

      if (match.id === match_id) {
        break;
      }
    }
  }

  return result;
}

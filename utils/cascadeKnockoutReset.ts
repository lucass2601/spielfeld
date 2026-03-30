import { Match, Matchday, MatchStatus } from "@/types/match";
import { Team } from "@/types/team";

export default function cascadeKnockoutReset(
  matchdays: Matchday[],
  match_id: Match["id"],
  teamAId: Team["id"] | null,
  teamBId: Team["id"] | null,
) {
  for (
    let matchdayIndex = matchdays.length - 1;
    matchdayIndex > 0;
    matchdayIndex--
  ) {
    for (
      let matchIndex = matchdays[matchdayIndex].matches.length - 1;
      matchIndex >= 0;
      matchIndex--
    ) {
      const match = matchdays[matchdayIndex].matches[matchIndex];

      const matchedId =
        teamAId && (match.teamA === teamAId || match.teamB === teamAId)
          ? teamAId
          : teamBId && (match.teamA === teamBId || match.teamB === teamBId)
            ? teamBId
            : null;

      if (matchedId) {
        if (match.teamA === matchedId) match.teamA = null;
        if (match.teamB === matchedId) match.teamB = null;
        match.winnerId = null;
        match.isDraw = false;
        match.teamAScore = null;
        match.teamBScore = null;
        match.status = MatchStatus.SCHEDULED;
      }

      if (match.id === match_id) {
        break;
      }
    }
  }
}

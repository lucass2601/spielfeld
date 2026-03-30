import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { TournamentFormat } from "@/types/tournament";
import { Match, Matchday, MatchStatus } from "@/types/match";

export default function generateRoundRobinMatches(
  tournamentTeams: (string | null)[] | null,
  tournamentFormat: TournamentFormat.ROUND_ROBIN,
) {
  if (tournamentFormat !== TournamentFormat.ROUND_ROBIN) return;

  let matchdays: Matchday[] = [];
  let matches: Match[] = [];
  let teams: (string | null)[] = [null];

  // create a copy, otherwise tournamentTeams will get overwritten
  teams = tournamentTeams ? [...tournamentTeams] : [];

  const makeMatch = (teamAId: string | null, teamBId: string | null) => ({
    id: uuidv4(),
    teamA: teamAId,
    teamB: teamBId,
    teamAScore: null,
    teamBScore: null,
    status: !teamAId || !teamBId ? MatchStatus.FINISHED : MatchStatus.SCHEDULED,
    events: [],
    winnerId: !teamAId || !teamBId ? teamAId || teamBId : null,
    isDraw: false,
  });

  const addMatches = (table: (string | null)[]) => {
    const n = table.length;
    for (let i = 0; i < n / 2; i++) {
      matches.push(makeMatch(table[i], table[n - 1 - i]));
    }
  };

  const rotate = (table: (string | null)[]) => {
    // Circle Method (https://en.wikipedia.org/wiki/Round-robin_tournament#circle_method)

    // example with teams A, B, C, D
    const fixed = table[0]; // A
    const rest = table.slice(1); // B, C, D
    rest.unshift(rest[rest.length - 1]); // D, B, C, D
    rest.pop(); // D, B, C
    return [fixed, ...rest]; // A, D, B, C
  };

  if (teams.length % 2 === 1) {
    teams.push(null);
  }

  let table = teams ? [...teams] : [];

  for (let r = 1; r < table.length; r++) {
    addMatches(table);
    matchdays.push({
      id: uuidv4(),
      matches: matches,
    });
    matches = [];
    table = rotate(table);
  }

  return matchdays;
}

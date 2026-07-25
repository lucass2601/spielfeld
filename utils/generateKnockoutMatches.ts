import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { TournamentFormat } from "@/types/tournament";
import { Match, Matchday, MatchStatus } from "@/types/match";
import advanceKnockoutWinners from "./advanceKnockoutWinners";

export default function generateKnockoutMatches(
  tournamentTeams: (string | null)[] | null,
  tournamentFormat: TournamentFormat.KNOCKOUT,
) {
  if (tournamentFormat !== TournamentFormat.KNOCKOUT) return;

  let matchdays: Matchday[] = [];
  let teams: (string | null)[] = [];

  // create a copy, otherwise tournamentTeams will get overwritten
  teams = tournamentTeams ? [...tournamentTeams] : [];

  const makeMatch = (
    teamAId: string | null,
    teamBId: string | null,
  ): Match => ({
    id: uuidv4(),
    teamA: teamAId,
    teamB: teamBId,
    teamAScore: null,
    teamBScore: null,
    status: MatchStatus.SCHEDULED,
    events: [],
    winnerId: null,
    isDraw: false,
  });

  const generateSeeds = (n: number): number[] => {
    if (n === 2) return [0, 1];
    const half: number[] = generateSeeds(n / 2);
    return half.flatMap((seed) => [seed, n - 1 - seed]);
  };

  while (Math.log2(teams.length) % 1 !== 0) {
    teams.push(null);
  }

  // Step 1: Build seeded pairs — pair seed i with seed (n-1-i)
  const seededPairs: [string | null, string | null][] = [];
  for (let i = 0; i < teams.length / 2; i++) {
    seededPairs.push([teams[i], teams[teams.length - 1 - i]]);
  }

  // Step 2: Reorder pairs into correct bracket positions
  const bracketOrder = generateSeeds(seededPairs.length);
  const orderedPairs = bracketOrder.map((i) => seededPairs[i]);

  // Step 3: Create round 1 matches from the ordered pairs
  const firstRoundMatches: Match[] = orderedPairs.map(([teamA, teamB]) =>
    makeMatch(teamA, teamB),
  );

  const totalRounds = Math.log2(teams.length);

  // Step 4: Build all matchdays — round 1 has real teams, later rounds are empty
  for (let round = 0; round < totalRounds; round++) {
    const matchCount = teams.length / Math.pow(2, round + 1);

    const roundMatches: Match[] =
      round === 0
        ? firstRoundMatches
        : Array.from({ length: matchCount }, () => makeMatch(null, null));

    matchdays.push({
      id: uuidv4(),
      matches: roundMatches,
    });
  }

  // Step 5: Auto-finish bye matches and advance winners into later rounds
  matchdays = advanceKnockoutWinners(matchdays);

  return matchdays;
}

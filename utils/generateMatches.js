import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function generateMatches(tournamentTeams, tournamentFormat) {
  let matchdays = [];
  let matches = [];

  const makeMatch = (a, b) => ({
    id: uuidv4(),
    teamA: a,
    teamB: b,
    teamAScore: 0,
    teamBScore: 0,
    status: "scheduled", // "scheduled" | "finished"
    events: [],
    winnerId: null,
    isDraw: null,
  });

  // create a copy - otherwise tournamentTeams will get overwritten
  let teams = [...tournamentTeams];

  const addMatches = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n / 2; i++) {
      matches.push(makeMatch(arr[i], arr[n - 1 - i]));
    }
  };

  const rotate = (arr) => {
    // Circle Method (https://en.wikipedia.org/wiki/Round-robin_tournament#circle_method)

    // example with teams A, B, C, D

    const fixed = arr[0]; // A
    const rest = arr.slice(1); // B, C, D
    rest.unshift(rest.pop()); // D, B, C
    return [fixed, ...rest]; // A, D, B, C
  };

  if (tournamentFormat === "roundrobin") {
    if (teams.length % 2 === 1) {
      teams.unshift(null);
    }

    let arr = [...teams];

    for (let r = 1; r < arr.length; r++) {
      addMatches(arr);
      matchdays.push({
        id: uuidv4(),
        matches: matches,
      });
      matches = [];
      arr = rotate(arr);
    }

    return matchdays;
  }

  if (tournamentFormat === "knockout") {
    const nextPow2 = (n) => {
      const power = Math.ceil(Math.log2(n));
      return 2 ** power;
    };

    // [A, B, C, D, E] = len 5
    // da die nächst höhere 2er Potenz 8 ist, wird aufgefüllt
    // [A, B, C, D, E, null, null, null] = len 8

    const arr = [...teams];
    const p = nextPow2(arr.length);
    while (arr.length < p) arr.push(null);

    const makePairs = (teamsParam) => {
      const teamsLength = teamsParam.length;
      pairMatches = [];

      for (let i = 0; i < teamsLength / 2; i++) {
        const m = makeMatch(teamsParam[i], teamsParam[teamsLength - 1 - i]);

        if (m.teamA && !m.teamB) {
          m.status = "finished";
          m.winnerId = m.teamA.id;
        } else if (!m.teamA && m.teamB) {
          m.status = "finished";
          m.winnerId = m.teamB.id;
        }

        pairMatches.push(m);
      }
      return pairMatches;
    };

    const firstMatch = makePairs(arr);
    matchdays.push({ id: uuidv4(), matches: [...firstMatch] });

    let matches = firstMatch.length;
    while (matches > 1) {
      matches = Math.floor(matches / 2);
      const emptyMatch = Array.from({ length: matches }, () =>
        makeMatch(null, null)
      );
      matchdays.push({ id: uuidv4(), matches: [...emptyMatch] });
    }

    return matchdays;
  }
}

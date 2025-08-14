import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function generateRounds(tournamentTeams, tournamentType) {
  let matchdays = [];
  let rounds = [];

  // create a copy - otherwise tournamentTeams will get overwritten
  let teams = [...tournamentTeams];

  const addMatches = (arr) => {
    const n = arr.length;
    for (let i = 0; i < n / 2; i++) {
      rounds.push({
        id: uuidv4(),
        teamA: arr[i],
        teamB: arr[n - 1 - i],
      });
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

  if (tournamentType === "roundrobin") {
    if (teams.length % 2 === 1) {
      teams.unshift(null);
    }

    let arr = [...teams];

    for (let r = 1; r < arr.length; r++) {
      addMatches(arr);
      matchdays.push({
        id: uuidv4(),
        rounds: rounds,
      });
      rounds = [];
      arr = rotate(arr);
    }

    return matchdays;
  }

  if (tournamentType === "knockout") {
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
      const matches = [];

      for (let i = 0; i < teamsLength / 2; i++) {
        matches.push({
          id: uuidv4(),
          teamA: teamsParam[i], // 0, 1, 2, 3
          teamB: teamsParam[teamsLength - 1 - i], // 7, 6, 5, 4
        });
      }
      return matches;
    };

    const firstRound = makePairs(arr);
    matchdays.push({ id: uuidv4(), rounds: [...firstRound] });

    let matches = firstRound.length;
    while (matches > 1) {
      matches = Math.floor(matches / 2);
      const emptyRound = Array.from({ length: matches }, () => ({
        id: uuidv4(),
        teamA: null,
        teamB: null,
      }));
      matchdays.push({ id: uuidv4(), rounds: [...emptyRound] });
    }

    return matchdays;
  }
}

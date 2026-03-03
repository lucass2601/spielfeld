import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function generateMatches(tournamentTeams, tournamentFormat) {
  let matchdays = [];
  let matches = [];

  const makeMatch = (a, b) => ({
    id: uuidv4(),
    teamA: a,
    teamB: b,
    teamAScore: null,
    teamBScore: null,
    status: !a || !b ? "finished" : "scheduled",
    events: [],
    winnerId: null,
    isDraw: false,
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
}

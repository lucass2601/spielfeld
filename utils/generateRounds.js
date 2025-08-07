import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function generateRounds(tournamentTeams, tournamentType) {
  let matchdays = [];
  let rounds = [];

  let teams = [...tournamentTeams];

  if (teams.length % 2 === 1) {
    teams.unshift(null);
  }

  let addMatches = (teams) => {
    for (let i = 0; i < teams.length; i++) {
      if (teams.length % 2 === 1) {
        if (i === teams.length - 1 - i) {
          return;
        }

        if (i === 0) {
          rounds.push({ teamA: teams[teams.length - 1], teamB: null });
        }
        rounds.push({ teamA: teams[i], teamB: teams[teams.length - 2 - i] });
      } else {
        if (i > teams.length - 1 * (i + 1)) {
          return;
        }

        rounds.push({
          id: uuidv4(),
          teamA: teams[i],
          teamB: teams[teams.length - 1 * (i + 1)],
        });
      }
    }
  };

  if (tournamentType === "roundrobin") {
    for (let i = 1; i < teams.length; i++) {
      addMatches(teams);
      let temp = teams[teams.length - 1];
      for (let j = teams.length - 1; j >= 1; j--) {
        if (j === 1) {
          teams[j] = temp;
        } else {
          teams[j] = teams[j - 1];
        }
      }
      matchdays.push({
        id: uuidv4(),
        rounds: rounds,
      });
      rounds = [];
    }
  }

  return matchdays;
}

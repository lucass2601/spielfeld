const getKnockoutRoundLabel = (roundIndex: number, totalRounds: number) => {
  const roundsFromEnd = totalRounds - 1 - roundIndex;
  switch (roundsFromEnd) {
    case 0:
      return "Final";
    case 1:
      return "Semifinals";
    case 2:
      return "Quarterfinals";
    default:
      return `Round of ${Math.pow(2, roundsFromEnd + 1)}`;
  }
};

export default getKnockoutRoundLabel;

const getKnockoutRoundAbbrev = (roundIndex: number, totalRounds: number) => {
  const roundsFromEnd = totalRounds - 1 - roundIndex;
  switch (roundsFromEnd) {
    case 0:
      return "F";
    case 1:
      return "SF";
    case 2:
      return "QF";
    default:
      return `R${Math.pow(2, roundsFromEnd + 1)} `;
  }
};

export default getKnockoutRoundAbbrev;

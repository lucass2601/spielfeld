import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const useTournamentStore = create((set, get) => ({
  newTournament: {
    imageUri: "",
    type: "roundrobin",
    name: "",
    startDate: "",
    teams: [],
  },
  tournaments: [],
  teams: [],

  setNewTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),

  submitNewTournament: () => {
    set((state) => ({
      tournaments: [
        ...state.tournaments,
        {
          id: uuidv4(),
          status: "draft",
          ...state.newTournament,
        },
      ],
    }));
  },

  getTournament: (id) => {
    return get().tournaments.find((tournament) => tournament.id === id);
  },

  addTeam: (tournamentId, teamName) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournamentId
          ? {
              ...tournament,
              teams: [
                ...tournament.teams,
                {
                  id: uuidv4(),
                  name: teamName,
                },
              ],
            }
          : tournament
      ),
    })),
}));

export default useTournamentStore;

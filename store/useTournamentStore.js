import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const useTournamentStore = create((set, get) => ({
  newTournament: {
    imageUri: "",
    type: "",
    name: "",
    startDate: "",
    participantType: "",
    participants: [],
  },

  participants: [],

  setTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),

  addPlayer: (name) => {
    set((state) => ({
      participants: [
        ...state.participants,
        {
          id: uuidv4(),
          type: "player",
          name,
        },
      ],
    }));
  },
}));

export default useTournamentStore;

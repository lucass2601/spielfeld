import { create } from "zustand";

const useTournamentStore = create((set) => ({
  newTournament: {
    imageUri: "",
    type: "",
    name: "",
    startDate: "",
    participantType: "",
    participants: [],
  },
  setTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),
}));

export default useTournamentStore;

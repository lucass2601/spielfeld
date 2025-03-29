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

  addPlayer: (imageUri, name) => {
    set((state) => ({
      participants: [
        ...state.participants,
        {
          id: uuidv4(),
          imageUri,
          type: "player",
          name,
        },
      ],
    }));
  },

  editPlayer: (id, imageUri, name) => {
    set((state) => ({
      participants: state.participants.map((participant) =>
        participant.id === id ? { ...participant, imageUri, name } : participant
      ),
    }));
  },

  getParticipant: (id) => {
    return get().participants.find((participant) => participant.id === id);
  },
}));

export default useTournamentStore;

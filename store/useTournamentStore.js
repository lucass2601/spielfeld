import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const useTournamentStore = create((set, get) => ({
  newTournament: {
    imageUri: "",
    type: "roundrobin",
    name: "",
    startDate: "",
    participantType: "players",
    participants: [],
  },

  participants: [],

  setTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),

  addParticipant: (imageUri, name, type) => {
    set((state) => ({
      participants: [
        ...state.participants,
        {
          id: uuidv4(),
          imageUri,
          name,
          type,
        },
      ],
    }));
  },

  editParticipant: (id, imageUri, name) => {
    set((state) => ({
      participants: state.participants.map((participant) =>
        participant.id === id ? { ...participant, imageUri, name } : participant
      ),
    }));
  },

  // getParticipants: (type) => {
  //   return get().participants.filter(
  //     (participant) => participant.type === type
  //   );
  // },

  getParticipant: (id) => {
    return get().participants.find((participant) => participant.id === id);
  },
}));

export default useTournamentStore;

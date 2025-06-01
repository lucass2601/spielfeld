import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const generateMatches = (tournamentType, participantCount) => {
  if (tournamentType === "roundrobin") {
    let schedule = [];

    for (let matchday = 1; matchday < participantCount; matchday++) {
      console.log("Game: " + matchday);
      schedule.push({ matchday_id: uuidv4(), matches: [] });
      for (
        let participant = 0;
        participant < Math.ceil(participantCount / 2);
        participant++
      ) {
        console.log("Match: " + participant);
        schedule[matchday - 1].matches.push({
          match_id: uuidv4(),
          participant_home: null,
          participant_away: null,
        });
      }
    }

    return schedule;
  }
};

const useTournamentStore = create((set, get) => ({
  newTournament: {
    imageUri: "",
    type: "roundrobin",
    name: "",
    startDate: "",
    participantType: "players",
    participants: [],
  },
  tournaments: [],
  participants: [],

  setNewTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),

  submitNewTournament: () => {
    const state = get();
    const { participants, newTournament } = state;

    set((state) => ({
      tournaments: [
        ...state.tournaments,
        {
          id: uuidv4(),
          status: "pending",
          schedule: generateMatches(newTournament.type, participants.length),
          ...state.newTournament,
        },
      ],
    }));
  },

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

  getTournament: (id) => {
    return get().tournaments.find((tournament) => tournament.id === id);
  },
}));

export default useTournamentStore;

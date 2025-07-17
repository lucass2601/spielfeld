import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const generateMatches = (tournamentType, participantCount) => {
  if (tournamentType === "roundrobin") {
    let schedule = [];

    for (let matchday = 1; matchday < participantCount; matchday++) {
      console.log("Matchday: " + matchday);
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
          match_title: null,
          match_date: null,
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
  tournaments: [
    // example tournament dataset (outdated)
    // {
    //   id: "69ec627e-654c-45e6-85e9-0d4c328a3d78",
    //   imageUri: null,
    //   name: "Test tournament",
    //   participantType: "players",
    //   participants: [
    //     "087af75a-0e25-4d3b-b24c-822f0b2845e9",
    //     "b73de8c1-c16c-45dc-ba16-95c096cc98c6",
    //     "0e82e2bf-d020-4158-8622-daf18ae2cf45",
    //     "72b0f6d6-4ed4-412a-91c6-ec8fa94ec1da",
    //   ],
    //   schedule: [
    //     {
    //       matchday_id: "dd964447-56e8-4517-97b2-27a4abe389ca",
    //       matches: [
    //         {
    //           match_date: null,
    //           match_id: "256905cd-dccc-4d97-b86f-c5b87b793877",
    //           match_title: null,
    //           participant_away: null,
    //           participant_home: null,
    //         },
    //         {
    //           match_date: null,
    //           match_id: "8f8a1a37-e947-4c91-9bb2-aa246d72d84f",
    //           match_title: null,
    //           participant_away: null,
    //           participant_home: null,
    //         },
    //       ],
    //     },
    //     {
    //       matchday_id: "a2fbb4ec-d569-4d5c-85ef-e8efd6409cfd",
    //       matches: [
    //         {
    //           match_date: null,
    //           match_id: "ca16c3b6-7ff2-4d41-8a5b-095810cee656",
    //           match_title: null,
    //           participant_away: null,
    //           participant_home: null,
    //         },
    //         {
    //           match_date: null,
    //           match_id: "26f9407f-7a72-482a-a614-45910651f85f",
    //           match_title: null,
    //           participant_away: null,
    //           participant_home: null,
    //         },
    //       ],
    //     },
    //     {
    //       matchday_id: "730caa3a-c783-4846-9f3c-84e05f1d9372",
    //       matches: [
    //         {
    //           match_date: null,
    //           match_id: "39ca9ebb-84e6-422d-bdf3-8ef979492f8b",
    //           match_title: null,
    //           participant_away: null,
    //           participant_home: null,
    //         },
    //         {
    //           match_date: null,
    //           match_id: "58fc308f-eb0d-48a6-8e48-8191287a0fa2",
    //           match_title: null,
    //           participant_away: null,
    //           participant_home: null,
    //         },
    //       ],
    //     },
    //   ],
    //   startDate: new Date("2026-10-26"),
    //   status: "pending",
    //   type: "roundrobin",
    // },
  ],
  participants: [
    {
      id: "087af75a-0e25-4d3b-b24c-822f0b2845e9",
      imageUri:
        "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/A2473DC4-41A0-42B9-8006-DBE316AD8058/Library/Caches/ImagePicker/30933F61-675A-430B-B330-EFCF9E2F128A.jpg",
      name: "Lucas",
      type: "players",
    },
    {
      id: "b73de8c1-c16c-45dc-ba16-95c096cc98c6",
      imageUri:
        "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/A2473DC4-41A0-42B9-8006-DBE316AD8058/Library/Caches/ImagePicker/159C7306-82B3-4B17-A0E3-7EC31B3E36EC.jpg",
      name: "Tim",
      type: "players",
    },
    {
      id: "0e82e2bf-d020-4158-8622-daf18ae2cf45",
      imageUri: null,
      name: "Max",
      type: "players",
    },
    {
      id: "72b0f6d6-4ed4-412a-91c6-ec8fa94ec1da",
      imageUri:
        "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/A2473DC4-41A0-42B9-8006-DBE316AD8058/Library/Caches/ImagePicker/2F7DBA6D-322F-4B8A-AE04-1AA2F4D48CA1.jpg",
      name: "Chris",
      type: "players",
    },
  ],

  setNewTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),

  submitNewTournament: () => {
    // const state = get();
    // const { participants, newTournament } = state;

    set((state) => ({
      tournaments: [
        ...state.tournaments,
        {
          id: uuidv4(),
          status: "draft",
          // schedule: generateMatches(newTournament.type, participants.length),
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

  updateMatch: (tournament_id, matchDetails) => {
    set((state) => {
      const tournaments = state.tournaments.map((tournament) => {
        if (tournament.id !== tournament_id) return tournament;

        const updatedSchedule = tournament.schedule.map((matchday) => {
          const updatedMatches = matchday.matches.map((match) => {
            if (match.match_id !== matchDetails.match_id) return match;
            return { ...match, ...matchDetails };
          });

          return { ...matchday, matches: updatedMatches };
        });

        return { ...tournament, schedule: updatedSchedule };
      });

      return { tournaments };
    });
  },

  getParticipant: (id) => {
    return get().participants.find((participant) => participant.id === id);
  },

  getTournament: (id) => {
    return get().tournaments.find((tournament) => tournament.id === id);
  },
}));

export default useTournamentStore;

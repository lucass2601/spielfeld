import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import generateRounds from "@/utils/generateRounds";
import buildRoundRobinStandings from "@/utils/buildRoundRobinStandings";

const useTournamentStore = create((set, get) => ({
  newTournament: {
    imageUri: "",
    format: "roundrobin",
    name: "",
    startDate: "",
    teams: [],
    matchdays: [],
  },
  tournaments: [],

  setNewTournamentInfo: (key, value) =>
    set((state) => ({
      newTournament: { ...state.newTournament, [key]: value },
    })),

  submitNewTournament: () => {
    const tournament_id = uuidv4();

    set((state) => ({
      tournaments: [
        ...state.tournaments,
        {
          id: tournament_id,
          status: "draft",
          ...state.newTournament,
        },
      ],
    }));

    return get().tournaments.find(
      (tournament) => tournament.id === tournament_id
    );
  },

  clearNewTournament: () => {
    set(() => ({
      newTournament: {
        imageUri: "",
        format: "roundrobin",
        name: "",
        startDate: "",
        teams: [],
        matchdays: [],
      },
    }));
  },

  getTournament: (tournament_id) => {
    return get().tournaments.find(
      (tournament) => tournament.id === tournament_id
    );
  },

  deleteTournament: (tournament_id) =>
    set((state) => ({
      tournaments: state.tournaments.filter((tournament) => {
        return tournament.id !== tournament_id;
      }),
    })),

  updateTournamentName: (tournament_id, newName) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournament_id
          ? {
              ...tournament,
              name: newName,
            }
          : tournament
      ),
    })),

  updateTournamentStartDate: (tournament_id, newDate) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournament_id
          ? {
              ...tournament,
              startDate: newDate,
            }
          : tournament
      ),
    })),

  updateTournamentRounds: (tournament_id) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournament_id
          ? {
              ...tournament,
              matchdays: generateRounds(
                tournament.teams.map((team) => team.id),
                tournament.format
              ),
            }
          : tournament
      ),
    })),

  updateTournamentRoundWinner: (tournament_id, round_id, team_id) => {
    set((state) => ({
      tournaments: state.tournaments.map((tournament) => {
        if (tournament.id !== tournament_id) return tournament;

        const teamExists = tournament.teams.some((team) => team.id === team_id);
        if (!teamExists) return tournament;

        return {
          ...tournament,
          matchdays: tournament.matchdays.map((md) => ({
            ...md,
            rounds: md.rounds.map((round) =>
              round.id === round_id
                ? {
                    ...round,
                    winnerId: team_id,
                  }
                : round
            ),
          })),
        };
      }),
    }));
  },

  updateTournamentStandings: (tournament_id) => {
    const tournament = get().tournaments.find((t) => t.id === tournament_id);
    return buildRoundRobinStandings(tournament);
  },

  getRound: (tournament_id, round_id) => {
    const tournament = get().tournaments.find(
      (tournament) => tournament.id === tournament_id
    );

    const allRounds = tournament.matchdays.flatMap((md) => md.rounds);

    return allRounds.find((round) => round.id === round_id);
  },

  getTeam: (tournament_id, team_id) => {
    const tournament = get().tournaments.find(
      (tournament) => tournament.id === tournament_id
    );

    return tournament.teams.find((team) => team.id === team_id);
  },

  addTeam: (tournament_id, team_name) =>
    set((state) => {
      return {
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.id === tournament_id) {
            const existingTeams = tournament.teams.map((team) => team.name);
            let newName = team_name;
            let counter = 0;

            while (existingTeams.includes(newName)) {
              counter++;
              newName = `${team_name} (${counter})`;
            }

            return {
              ...tournament,
              teams: [
                ...tournament.teams,
                {
                  id: uuidv4(),
                  name: newName,
                  imageUri: null,
                },
              ],
            };
          }
          return tournament;
        }),
      };
    }),

  deleteTeam: (tournament_id, team_id) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) => {
        return tournament.id === tournament_id
          ? {
              ...tournament,
              teams: tournament.teams.filter((team) => team.id !== team_id),
            }
          : tournament;
      }),
    })),

  editTeam: (tournament_id, team_id, imageUri, name) => {
    set((state) => ({
      tournaments: state.tournaments.map((tournament) => {
        if (tournament.id !== tournament_id) return tournament;

        const existingNames = tournament.teams
          .filter((t) => t.id !== team_id)
          .map((t) => t.name);

        let newName = name;
        let counter = 0;
        while (existingNames.includes(newName)) {
          counter++;
          newName = `${name} (${counter})`;
        }

        return {
          ...tournament,
          teams: tournament.teams.map((team) =>
            team.id === team_id ? { ...team, imageUri, name: newName } : team
          ),
        };
      }),
    }));
  },
}));

export default useTournamentStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import generateMatches from "@/utils/generateMatches";
import buildRoundRobinStandings from "@/utils/buildRoundRobinStandings";

import {
  StatusType,
  TournamentFormat,
  NewTournament,
  Tournament,
} from "@/types/tournament";

import { Team } from "@/types/team";
import { Match, MatchStatus, MatchEvent } from "@/types/match";

type TournamentStore = {
  newTournament: NewTournament;
  tournaments: Tournament[];
  getTournament: (tournament_id: string) => Tournament | undefined;
  getTeam: (tournament_id: string, team_id: string) => Team | undefined;
  getMatch: (tournament_id: string, match_id: string) => Match | undefined;
  updateTournamentMatches: (tournament_id: string) => void;
};

const initialState = {
  newTournament: {
    status: StatusType.DRAFT,
    imageUri: "",
    format: TournamentFormat.ROUND_ROBIN,
    sport: null,
    name: "",
    startDate: "",
    teams: [],
    matchdays: [],
    pointsWin: 3,
    pointsTie: 1,
    pointsLose: 0,
  },
  tournaments: [],
};

const useTournamentStore = create<TournamentStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setNewTournamentInfo: <T extends keyof NewTournament>(
        key: T,
        value: NewTournament[T],
      ) =>
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
              ...state.newTournament,
            },
          ],
        }));

        return get().tournaments.find(
          (tournament) => tournament.id === tournament_id,
        );
      },

      clearNewTournament: () => {
        set(() => ({ newTournament: initialState.newTournament }));
      },

      getTournament: (tournament_id: string) => {
        return get().tournaments.find(
          (tournament) => tournament.id === tournament_id,
        );
      },

      deleteTournament: (tournament_id: string) =>
        set((state) => ({
          tournaments: state.tournaments.filter((tournament) => {
            return tournament.id !== tournament_id;
          }),
        })),

      updateTournamentName: (tournament_id: string, newName: string) =>
        set((state) => ({
          tournaments: state.tournaments.map((tournament) =>
            tournament.id === tournament_id
              ? {
                  ...tournament,
                  name: newName,
                }
              : tournament,
          ),
        })),

      updateTournamentStartDate: (tournament_id: string, newDate: string) =>
        set((state) => ({
          tournaments: state.tournaments.map((tournament) =>
            tournament.id === tournament_id
              ? {
                  ...tournament,
                  startDate: newDate,
                }
              : tournament,
          ),
        })),

      deleteTournamentMatches: (tournament_id: string) =>
        set((state) => ({
          tournaments: state.tournaments.map((tournament) =>
            tournament.id === tournament_id
              ? { ...tournament, matchdays: [] }
              : tournament,
          ),
        })),

      updateTournamentMatches: (tournament_id: string) =>
        set((state) => ({
          tournaments: state.tournaments.map((tournament) =>
            tournament.id === tournament_id
              ? {
                  ...tournament,
                  matchdays:
                    generateMatches(
                      tournament.teams.map((team) => team.id),
                      tournament.format,
                    ) || [],
                }
              : tournament,
          ),
        })),

      resetTournamentMatch: (tournament_id: string, match_id: string) => {
        set((state) => ({
          tournaments: state.tournaments.map((tournament) => {
            if (tournament.id !== tournament_id) return tournament;
            return {
              ...tournament,
              status: StatusType.ACTIVE,
              matchdays: tournament.matchdays.map((md) => ({
                ...md,
                matches: md.matches.map((match) =>
                  match.id === match_id
                    ? {
                        ...match,
                        winnerId: null,
                        isDraw: false,
                        teamAScore: 0,
                        teamBScore: 0,
                        status: MatchStatus.SCHEDULED,
                      }
                    : match,
                ),
              })),
            };
          }),
        }));
      },

      updateTournamentMatchWinner: (
        tournament_id: string,
        match_id: string,
        team_id: string | null,
        isDraw: boolean,
        teamAScore: number,
        teamBScore: number,
      ) => {
        set((state) => ({
          tournaments: state.tournaments.map((tournament) => {
            if (tournament.id !== tournament_id) return tournament;

            const teamExists = tournament.teams.some(
              (team) => team.id === team_id,
            );

            if (!isDraw && !teamExists) return tournament;

            const updatedMatchdays = tournament.matchdays.map((md) => ({
              ...md,
              matches: md.matches.map((match) =>
                match.id === match_id
                  ? {
                      ...match,
                      winnerId: team_id ? team_id : null,
                      isDraw: isDraw,
                      teamAScore: teamAScore,
                      teamBScore: teamBScore,
                      status: MatchStatus.FINISHED,
                    }
                  : match,
              ),
            }));

            const allFinished = updatedMatchdays
              .flatMap((md) => md.matches)
              .every((match) => match.status === MatchStatus.FINISHED);

            return {
              ...tournament,
              status: allFinished ? StatusType.COMPLETED : tournament.status,
              matchdays: updatedMatchdays,
            };
          }),
        }));
      },

      updateTournamentMatchEvents: (
        tournament_id: string,
        match_id: string,
        events: MatchEvent[],
      ) => {
        set((state) => ({
          tournaments: state.tournaments.map((tournament) => {
            if (tournament.id !== tournament_id) return tournament;

            return {
              ...tournament,
              matchdays: tournament.matchdays.map((md) => ({
                ...md,
                matches: md.matches.map((match) =>
                  match.id === match_id
                    ? {
                        ...match,
                        events: events.length ? events : [],
                      }
                    : match,
                ),
              })),
            };
          }),
        }));
      },

      updateTournamentStandings: (tournament_id: string) => {
        const tournament = get().tournaments.find(
          (t) => t.id === tournament_id,
        );
        return buildRoundRobinStandings(tournament);
      },

      getMatch: (tournament_id: string, match_id: string) => {
        const tournament = get().tournaments.find(
          (tournament) => tournament.id === tournament_id,
        );

        if (!tournament) return;

        const allMatches = tournament.matchdays.flatMap((md) => md.matches);

        return allMatches?.find((match) => match.id === match_id);
      },

      getTeam: (tournament_id: string, team_id: string) => {
        const tournament = get().tournaments.find(
          (tournament) => tournament.id === tournament_id,
        );

        if (!tournament) return;

        return tournament?.teams.find((team) => team.id === team_id);
      },

      addTeam: (tournament_id: string, team_name: string) =>
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
                      roster: [],
                    },
                  ],
                };
              }
              return tournament;
            }),
          };
        }),

      getPlayer: (
        tournament_id: string,
        team_id: string,
        player_id: string,
      ) => {
        const tournament = get().tournaments.find(
          (tournament) => tournament.id === tournament_id,
        );

        if (!tournament) return;

        const team = tournament.teams.find((team) => team.id === team_id);

        if (!team) return;

        return team?.roster.find((player) => player.id === player_id);
      },

      addPlayer: (
        tournament_id: string,
        team_id: string,
        player_name: string,
      ) =>
        set((state) => {
          return {
            tournaments: state.tournaments.map((tournament) => {
              if (tournament.id !== tournament_id) return tournament;

              const teamToUpdate = tournament.teams.find(
                (t) => t.id === team_id,
              );

              if (!teamToUpdate) return tournament;

              const existingPlayers = teamToUpdate.roster.map((p) => p.name);

              let newName = player_name;
              let counter = 0;
              while (existingPlayers.includes(newName)) {
                counter++;
                newName = `${player_name} (${counter})`;
              }

              const updatedTeams = tournament.teams.map((team) =>
                team.id === team_id
                  ? {
                      ...team,
                      roster: [
                        ...team.roster,
                        { id: uuidv4(), name: newName, imageUri: null },
                      ],
                    }
                  : team,
              );
              return { ...tournament, teams: updatedTeams };
            }),
          };
        }),

      deleteTeam: (tournament_id: string, team_id: string) =>
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

      editTeam: (
        tournament_id: string,
        team_id: string,
        imageUri: string | null,
        name: string,
      ) => {
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
                team.id === team_id
                  ? { ...team, imageUri, name: newName }
                  : team,
              ),
            };
          }),
        }));
      },

      deletePlayer: (
        tournament_id: string,
        team_id: string,
        player_id: string,
      ) =>
        set((state) => ({
          tournaments: state.tournaments.map((tournament) => {
            if (tournament.id !== tournament_id) return tournament;

            const teamExists = tournament.teams.some((t) => t.id === team_id);
            if (!teamExists) return tournament;

            return {
              ...tournament,
              teams: tournament.teams.map((team) =>
                team.id === team_id
                  ? {
                      ...team,
                      roster: team.roster.filter(
                        (player) => player.id !== player_id,
                      ),
                    }
                  : team,
              ),
            };
          }),
        })),

      editPlayer: (
        tournament_id: string,
        team_id: string,
        player_id: string,
        imageUri: string | null,
        name: string,
      ) => {
        set((state) => ({
          tournaments: state.tournaments.map((tournament) => {
            if (tournament.id !== tournament_id) return tournament;

            const team = tournament.teams.find((t) => t.id === team_id);
            if (!team) return tournament;

            const existingNames = team.roster
              .filter((p) => p.id !== player_id)
              .map((p) => p.name);

            let newName = name;
            let counter = 0;
            while (existingNames.includes(newName)) {
              counter++;
              newName = `${name} (${counter})`;
            }

            return {
              ...tournament,
              teams: tournament.teams.map((t) =>
                t.id === team_id
                  ? {
                      ...t,
                      roster: t.roster.map((player) =>
                        player.id === player_id
                          ? { ...player, imageUri, name: newName }
                          : player,
                      ),
                    }
                  : t,
              ),
            };
          }),
        }));
      },

      updateTournamentSettings: (
        tournament_id: string,
        settings: Partial<Tournament>,
      ) => {
        set((state) => ({
          tournaments: state.tournaments.map((tournament) =>
            tournament.id === tournament_id
              ? {
                  ...tournament,
                  ...settings,
                }
              : tournament,
          ),
        }));
      },

      resetAllData: () => set(initialState),
    }),
    {
      name: "tournament-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tournaments: state.tournaments }),
    },
  ),
);

export default useTournamentStore;

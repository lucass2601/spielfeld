import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import generateMatches from "@/utils/generateMatches";
import buildRoundRobinStandings from "@/utils/buildRoundRobinStandings";

const useTournamentStore = create((set, get) => ({
  newTournament: {
    imageUri: "",
    format: "roundrobin",
    sport: null,
    name: "",
    startDate: "",
    teams: [],
    matchdays: [],
    pointsWin: 3,
    pointsTie: 1,
    pointsLose: 0,
  },
  tournaments: [
    {
      id: "2ae681a3-26d9-4a83-a0b9-b7512bfeb953",
      status: "draft",
      imageUri:
        "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/6AF0606A-4FC9-4DD5-BD6F-2DF583B41304.jpg",
      format: "roundrobin",
      name: "No Sport Tournament",
      startDate: "2026-05-23T14:40:06.000Z",
      teams: [
        {
          id: "11de2702-192f-4803-ab4e-47fc80249b7a",
          name: "Player 1",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/D3CB6F03-FC9A-4AA0-9AD1-4C6956EFABBA.jpg",
          roster: [],
        },
        {
          id: "a7427c48-dce8-40c5-9893-c136a41a827a",
          name: "Player 2",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/DE52D4D7-8359-4CBA-94B9-E0E3836ECD04.jpg",
          roster: [],
        },
        {
          id: "0235cd93-ee86-48d5-9039-7c69bc41e932",
          name: "Player 3",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/446DC3CF-B8BF-4711-B6D1-D3272BB4911A.jpg",
          roster: [],
        },
        {
          id: "ab9bb926-e86b-4c8d-b383-2d8af2c5000a",
          name: "Player 4",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/8C514BB6-D285-4299-833B-D39000436D39.jpg",
          roster: [],
        },
        {
          id: "04f97f0e-0281-4ced-9b59-3f3e5c30faeb",
          name: "Player 5",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/F5BAD0CB-F96F-4E04-B3AB-4E616C6B8FE0.jpg",
          roster: [],
        },
      ],
      matchdays: [],
      sport: null,
    },
    {
      id: "06fadd69-bf1c-433e-bd05-f4e5ddc33a19",
      status: "draft",
      imageUri:
        "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/DE52D4D7-8359-4CBA-94B9-E0E3836ECD04.jpg",
      format: "roundrobin",
      name: "Football Tournament",
      startDate: "2026-03-16T12:27:06.000Z",
      teams: [
        {
          id: "6866744d-8bc0-4222-9cbb-62f35adb27b4",
          name: "Team 1",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/D3CB6F03-FC9A-4AA0-9AD1-4C6956EFABBA.jpg",
          roster: [
            {
              id: "57e31cbd-174d-4dbf-a721-681d8e43c346",
              name: "Player 1",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/D3CB6F03-FC9A-4AA0-9AD1-4C6956EFABBA.jpg",
            },
            {
              id: "bb9acb02-9623-4dd8-a3a9-87b9d91c7e9d",
              name: "Player 2",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/DE52D4D7-8359-4CBA-94B9-E0E3836ECD04.jpg",
            },
            {
              id: "af40a5ff-2467-401a-8e1c-ce6602aeff72",
              name: "Player 3",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/446DC3CF-B8BF-4711-B6D1-D3272BB4911A.jpg",
            },
            {
              id: "dd5c44ca-0c6c-403b-b3f6-b0c91f47c98a",
              name: "Player 4",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/8C514BB6-D285-4299-833B-D39000436D39.jpg",
            },
          ],
        },
        {
          id: "886afb9f-d911-4062-8362-55dbd5c5283a",
          name: "Team 2",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/DE52D4D7-8359-4CBA-94B9-E0E3836ECD04.jpg",
          roster: [],
        },
        {
          id: "1e712ccf-5d7f-44d7-ae9e-ae3df5c0cc23",
          name: "Team 3",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/446DC3CF-B8BF-4711-B6D1-D3272BB4911A.jpg",
          roster: [],
        },
        {
          id: "3400976a-2e96-484e-8fa5-c30d9418d536",
          name: "Team 4",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/8C514BB6-D285-4299-833B-D39000436D39.jpg",
          roster: [
            {
              id: "a54e7bc3-aaac-4c0b-b0a0-7a67391da965",
              name: "Player 5",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/D3CB6F03-FC9A-4AA0-9AD1-4C6956EFABBA.jpg",
            },
            {
              id: "f01c79a6-fdf0-4556-979b-a7254db6cc48",
              name: "Player 6",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/DE52D4D7-8359-4CBA-94B9-E0E3836ECD04.jpg",
            },
            {
              id: "83999a3e-5e84-4cde-a318-d3f8cdd65b20",
              name: "Player 7",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/446DC3CF-B8BF-4711-B6D1-D3272BB4911A.jpg",
            },
            {
              id: "a899d172-a780-4a21-a64b-0e54a1924c96",
              name: "Player 8",
              imageUri:
                "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/8C514BB6-D285-4299-833B-D39000436D39.jpg",
            },
          ],
        },
        {
          id: "26271077-5e27-4586-81c1-917aa9d2b509",
          name: "Team 5",
          imageUri:
            "file:///Users/lucasfischer-privat/Library/Developer/CoreSimulator/Devices/9944995A-FF48-4EC2-B485-64480C7088D0/data/Containers/Data/Application/00B3C885-363A-40E4-80D7-D465260DA5DB/Library/Caches/ExponentExperienceData/@lucass2601/tournal/ImagePicker/F5BAD0CB-F96F-4E04-B3AB-4E616C6B8FE0.jpg",
          roster: [],
        },
      ],
      matchdays: [],
      sport: "football",
    },
  ],

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
        pointsWin: 3,
        pointsTie: 1,
        pointsLose: 0,
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

  deleteTournamentMatches: (tournament_id) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournament_id
          ? { ...tournament, matchdays: [] }
          : tournament
      ),
    })),

  updateTournamentMatches: (tournament_id) =>
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournament_id
          ? {
              ...tournament,
              matchdays: generateMatches(
                tournament.teams.map((team) => team.id),
                tournament.format
              ),
            }
          : tournament
      ),
    })),

  resetTournamentMatch: (tournament_id, match_id) =>
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
                    winnerId: null,
                    isDraw: false,
                    teamAScore: 0,
                    teamBScore: 0,
                    status: "scheduled",
                  }
                : match
            ),
          })),
        };
      }),
    })),

  updateTournamentMatchWinner: (
    tournament_id,
    match_id,
    team_id,
    isDraw,
    teamAScore,
    teamBScore
  ) => {
    set((state) => ({
      tournaments: state.tournaments.map((tournament) => {
        if (tournament.id !== tournament_id) return tournament;

        const teamExists = tournament.teams.some((team) => team.id === team_id);
        if (!isDraw && !teamExists) return tournament;

        return {
          ...tournament,
          matchdays: tournament.matchdays.map((md) => ({
            ...md,
            matches: md.matches.map((match) =>
              match.id === match_id
                ? {
                    ...match,
                    winnerId: team_id ? team_id : null,
                    isDraw: isDraw,
                    teamAScore: teamAScore,
                    teamBScore: teamBScore,
                    status: "finished",
                  }
                : match
            ),
          })),
        };
      }),
    }));
  },

  updateTournamentMatchEvents: (tournament_id, match_id, events) => {
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
                    // events: [{ ...event, id: uuidv4() }, ...match.events],
                    events: events.length ? events : [],
                  }
                : match
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

  getMatch: (tournament_id, match_id) => {
    const tournament = get().tournaments.find(
      (tournament) => tournament.id === tournament_id
    );

    const allMatches = tournament.matchdays.flatMap((md) => md.matches);

    return allMatches.find((match) => match.id === match_id);
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
                  roster: [],
                },
              ],
            };
          }
          return tournament;
        }),
      };
    }),

  getPlayer: (tournament_id, team_id, player_id) => {
    const tournament = get().tournaments.find(
      (tournament) => tournament.id === tournament_id
    );

    const team = tournament.teams.find((team) => team.id === team_id);

    return team.roster.find((player) => player.id === player_id);
  },

  addPlayer: (tournament_id, team_id, player_name) =>
    set((state) => {
      return {
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.id !== tournament_id) return tournament;

          const teamToUpdate = tournament.teams.find((t) => t.id === team_id);
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
              : team
          );
          return { ...tournament, teams: updatedTeams };
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

  deletePlayer: (tournament_id, team_id, player_id) =>
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
                    (player) => player.id !== player_id
                  ),
                }
              : team
          ),
        };
      }),
    })),

  editPlayer: (tournament_id, team_id, player_id, imageUri, name) => {
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
                      : player
                  ),
                }
              : t
          ),
        };
      }),
    }));
  },

  updateTournamentSettings: (tournament_id, settings) => {
    set((state) => ({
      tournaments: state.tournaments.map((tournament) =>
        tournament.id === tournament_id
          ? {
              ...tournament,
              ...settings,
            }
          : tournament
      ),
    }));
  },
}));

export default useTournamentStore;

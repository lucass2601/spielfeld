import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import AppBar from "@/components/molcecules/AppBar";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams } from "expo-router";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";
import IconArrowBack from "@/assets/icons/icon-arrow-back.svg";

import defaultImage from "@/assets/images/icon.png";
import LiveMatchColumn from "@/components/molcecules/MatchEventTile";
import SegmentedControl from "@/components/molcecules/SegmentedControl";

const EVENT_TYPES = {
  comment: {
    label: "Comment",
    icon: "💬",
  },
  goal: {
    label: "Goal",
    icon: "⚽",
  },
  yellow_card: {
    label: "Yellow Card",
    icon: "🟨",
  },
  red_card: {
    label: "Red Card",
    icon: "🟥",
  },
};

const MatchTracker = ({ tournament_id, match_id, timestamp, teamA, teamB }) => {
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [playerSelection, setPlayerSelecton] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMatchEvent, setSelectedMatchEvent] = useState(null);
  const [matchTimeline, setMatchTimeline] = useState([]);

  const getPlayer = useTournamentStore((state) => state.getPlayer);

  const updateTournamentMatchEvent = useTournamentStore(
    (state) => state.updateTournamentMatchEvent
  );

  const getPlayerData = (team_id, player_id) => {
    return getPlayer(tournament_id, team_id, player_id);
  };

  const selectMatchEvent = (matchEvent) => {
    setSelectedMatchEvent(matchEvent);
    setEventModalVisible(true);
  };

  const selectTeam = (team) => {
    setSelectedTeam(team);
    setPlayerSelecton(true);
  };

  const handleEventModalStatus = (status) => {
    setEventModalVisible(status);
    setTimeout(() => {
      setPlayerSelecton(false);
    }, 500);
  };

  const addMatchEvent = (event_type, team_id, player_id) => {
    const matchEvent = {
      minute: Math.floor(timestamp / 60),
      event: event_type,
      team_id: team_id,
      player_id: player_id,
    };

    updateTournamentMatchEvent(tournament_id, match_id, matchEvent);
    handleEventModalStatus(false);
  };

  return (
    <View style={styles.tabContainer}>
      {/* Team Selection Modal */}
      <Modal
        visible={eventModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          handleEventModalStatus(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => handleEventModalStatus(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  {playerSelection ? (
                    <TouchableOpacity onPress={() => setPlayerSelecton(false)}>
                      <IconArrowBack color={colors["grey-400"]} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setEventModalVisible(false)}
                    >
                      <IconClose color={colors["grey-400"]} />
                    </TouchableOpacity>
                  )}

                  <Text style={styles.modalTitle}>
                    {EVENT_TYPES?.[selectedMatchEvent]?.icon}{" "}
                    {EVENT_TYPES?.[selectedMatchEvent]?.label} for...
                  </Text>
                  <View style={{ height: 24, width: 24 }} />
                </View>

                <View>
                  {playerSelection ? (
                    <View style={styles.playerList}>
                      {selectedTeam.roster.map((player) => (
                        <TouchableOpacity
                          onPress={() =>
                            addMatchEvent(
                              selectedMatchEvent,
                              selectedTeam.id,
                              player.id
                            )
                          }
                          key={player.id}
                          style={styles.playerItem}
                        >
                          <Image
                            style={styles.playerItemImage}
                            source={
                              player.imageUri
                                ? { uri: player.imageUri }
                                : defaultImage
                            }
                          />
                          <Text style={styles.playerItemLabel}>
                            {player.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View style={styles.modalTeamSelection}>
                      <TouchableOpacity
                        onPress={() => selectTeam(teamA)}
                        style={styles.modalTeamItem}
                      >
                        <Image
                          style={styles.modalTeamImage}
                          source={
                            teamA.imageUri
                              ? { uri: teamA.imageUri }
                              : defaultImage
                          }
                        />
                        <Text style={styles.modalTeamLabel}>Team A</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => selectTeam(teamB)}
                        style={styles.modalTeamItem}
                      >
                        <Image
                          style={styles.modalTeamImage}
                          source={
                            teamB.imageUri
                              ? { uri: teamB.imageUri }
                              : defaultImage
                          }
                        />
                        <Text style={styles.modalTeamLabel}>Team B</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View>
        <Text>Select a match event</Text>
      </View>
      <View style={styles.matchEvents}>
        {Object.entries(EVENT_TYPES).map((type, index) => (
          <LiveMatchColumn
            key={index}
            style={styles.matchEventTile}
            icon={type[1].icon}
            label={type[1].label}
            onPress={() => selectMatchEvent(type[0])}
          />
        ))}
      </View>
    </View>
  );
};

const MatchTimeline = ({ tournament_id, match_id }) => {
  const match = useTournamentStore((state) =>
    state.getMatch(tournament_id, match_id)
  );

  const matchEvents = match.events;

  return (
    <View style={styles.tabContainer}>
      {matchEvents.map((event) => (
        <Text
          key={event.id}
        >{`${event.minute}': ${event.player_id} - ${event.event}`}</Text>
      ))}
    </View>
  );
};

const MatchPlayerList = ({ teamA, teamB }) => {
  const [selectedTeam, setSelectedTeam] = useState(teamA || null);

  const handleTeamSelect = (team_id) => {
    setSelectedTeam([teamA, teamB].find((team) => team.id === team_id));
  };

  return (
    <View style={styles.tabContainer}>
      <SegmentedControl
        options={[
          { value: teamA.id, label: teamA.name },
          { value: teamB.id, label: teamB.name },
        ]}
        selectedValue={selectedTeam?.id}
        onChange={(team) => handleTeamSelect(team)}
      />

      <View>
        {selectedTeam?.roster.map((player) => (
          <Text key={player.id}>{player.name}</Text>
        ))}
      </View>
    </View>
  );
};

const LivePanel = () => {
  const { tournament_id, match_id } = useGlobalSearchParams();
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameTimer, setGameTimer] = useState(0);

  const match = useTournamentStore((state) =>
    state.getMatch(tournament_id, match_id)
  );

  const getTeam = useTournamentStore((state) => state.getTeam);

  const updateTournamentMatchWinner = useTournamentStore(
    (state) => state.updateTournamentMatchWinner
  );

  const getTeamData = (team_id) => {
    return getTeam(tournament_id, team_id);
  };

  const teamA = getTeamData(match.teamA);
  const teamB = getTeamData(match.teamB);

  const goals = match.events.filter((e) => e.event === "goal");

  const scoreA = goals.filter((e) => e.team_id === teamA.id).length;
  const scoreB = goals.filter((e) => e.team_id === teamB.id).length;

  useEffect(() => {
    if (!gameIsRunning) return;

    const id = setInterval(() => {
      setGameTimer((s) => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [gameIsRunning]);

  const submitMatch = () => {
    const winner_id =
      scoreA > scoreB ? teamA.id : scoreB > scoreA ? teamB.id : null;

    const isDraw = scoreA === scoreB || null;

    updateTournamentMatchWinner(
      tournament_id,
      match_id,
      winner_id,
      isDraw,
      scoreA,
      scoreB
    );
  };

  const formatTime = (time) => {
    const mm = Math.floor(time / 60);
    const ss = time % 60;
    return {
      gameMinutes: String(mm).padStart(2, "0"),
      gameSeconds: String(ss).padStart(2, "0"),
    };
  };

  const { gameMinutes, gameSeconds } = formatTime(gameTimer);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <AppBar
          iconLeft={
            <IconClose width={24} height={24} color={colors["grey-900"]} />
          }
          iconRight={
            <IconCheck width={24} height={24} color={colors["success-600"]} />
          }
          title="Live Match"
          backPress={() => router.dismiss()}
          forwardPress={submitMatch}
        />
        {/* <ScreenContainer> */}
        {/* Score Container */}
        <View style={styles.scoreContainer}>
          <View style={styles.teamContainer}>
            <Image style={styles.teamAvatar} source={defaultImage} />
            <Text style={styles.teamLabel}>Team A</Text>
          </View>

          <View>
            <Text>{`${scoreA}:${scoreB}`}</Text>
          </View>

          <View style={styles.teamContainer}>
            <Image style={styles.teamAvatar} source={defaultImage} />
            <Text style={styles.teamLabel}>Team B</Text>
          </View>
        </View>
        {/* Timer Container */}
        <View style={styles.timerContainer}>
          <View style={styles.timer}>
            <Text>{`${gameMinutes}:${gameSeconds}`}</Text>
          </View>
          <View style={styles.timerActions}>
            <TouchableOpacity onPress={() => setGameIsRunning(!gameIsRunning)}>
              {gameIsRunning ? (
                <Text>Pause Timer</Text>
              ) : (
                <Text>Start Timer</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Tabs */}
        <Tab.Navigator>
          <Tab.Screen
            name="Tracker"
            children={() => (
              <MatchTracker
                tournament_id={tournament_id}
                match_id={match_id}
                timestamp={gameTimer}
                teamA={teamA}
                teamB={teamB}
              />
            )}
          />
          <Tab.Screen
            name="Timeline"
            children={() => (
              <MatchTimeline
                tournament_id={tournament_id}
                match_id={match_id}
              />
            )}
          />
          <Tab.Screen
            name="Players"
            children={() => <MatchPlayerList teamA={teamA} teamB={teamB} />}
          />
        </Tab.Navigator>
        {/* </ScreenContainer> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LivePanel;

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
  },
  teamAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  teamLabel: {
    textAlign: "center",
    marginTop: 12,
  },
  timerContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors["grey-200"],
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  matchEvents: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },
  matchEventTile: {
    flex: 1,
    flexBasis: "45%",
  },
  teamModalContainer: {
    backgroundColor: "red",
    bottom: 0,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: "auto",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    width: "100%",
  },
  modalTitle: {
    color: colors["grey-900"],
    ...typography.body.large.bold,
  },
  modalTeamSelection: {
    padding: 24,
    gap: 12,
    marginBottom: 32,
  },
  modalTeamItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors["grey-100"],
    backgroundColor: colors["grey-50"],
    borderRadius: 16,
    padding: 8,
  },
  modalTeamImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  modalTeamLabel: {
    ...typography.body.large.bold,
  },
  playerList: {
    padding: 24,
    gap: 12,
    marginBottom: 32,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors["grey-100"],
    backgroundColor: colors["grey-50"],
    padding: 8,
    borderRadius: 16,
  },
  playerItemImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  playerItemLabel: {
    color: colors["grey-900"],
    ...typography.body.large.bold,
  },
});

import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";

import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

import AppBar from "@/components/molcecules/AppBar";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams } from "expo-router";

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";
import IconPlay from "@/assets/icons/icon-play.svg";
import IconPause from "@/assets/icons/icon-pause.svg";
import IconAdd from "@/assets/icons/icon-add.svg";
import Button from "@/components/atoms/Button";

import MatchEventTimelineItem from "@/components/molcecules/MatchEventTimelineItem";

import MatchEventModal from "@/components/molcecules/MatchEventModal";

import Avatar from "@/components/atoms/Avatar";

const LivePanel = () => {
  const { tournament_id, match_id } = useGlobalSearchParams();
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameTimer, setGameTimer] = useState(0);
  const startTimeRef = useRef(null);
  const accumulatedRef = useRef(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    team: null,
    player: null,
    timestamp: null,
  });
  const [tempEvents, setTempEvents] = useState([]);

  const match = useTournamentStore((state) =>
    state.getMatch(tournament_id, match_id),
  );

  const getTeam = useTournamentStore((state) => state.getTeam);

  const getPlayer = useTournamentStore((state) => state.getPlayer);

  const updateTournamentMatchWinner = useTournamentStore(
    (state) => state.updateTournamentMatchWinner,
  );

  const updateTournamentMatchEvents = useTournamentStore(
    (state) => state.updateTournamentMatchEvents,
  );

  const getTeamData = (team_id) => {
    return getTeam(tournament_id, team_id);
  };

  const getPlayerData = (team_id, player_id) => {
    return getPlayer(tournament_id, team_id, player_id);
  };

  const teamA = getTeamData(match.teamA);
  const teamB = getTeamData(match.teamB);

  const goals = tempEvents.filter((e) => e.event === "goal");

  const scoreA = goals.filter((e) => e.team_id === teamA.id).length;
  const scoreB = goals.filter((e) => e.team_id === teamB.id).length;

  const toggleTimer = () => {
    if (gameIsRunning) {
      accumulatedRef.current += Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      startTimeRef.current = null;
      setGameIsRunning(false);
    } else {
      startTimeRef.current = Date.now();
      setGameIsRunning(true);
    }
  };

  useEffect(() => {
    if (!gameIsRunning) {
      deactivateKeepAwake();
      return;
    }

    activateKeepAwakeAsync();
    const id = setInterval(() => {
      setGameTimer(
        accumulatedRef.current +
          Math.floor((Date.now() - startTimeRef.current) / 1000),
      );
    }, 1000);

    return () => clearInterval(id);
  }, [gameIsRunning]);

  const closeMatch = () => {
    Alert.alert(
      "Leave Live Match?",
      "Are you sure you want to leave? Your current match progress won't be saved.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => {
            router.back();
          },
        },
      ],
    );
  };

  const submitMatch = () => {
    const winner_id =
      scoreA > scoreB ? teamA.id : scoreB > scoreA ? teamB.id : null;

    const isDraw = scoreA === scoreB;

    updateTournamentMatchEvents(tournament_id, match_id, tempEvents);

    updateTournamentMatchWinner(
      tournament_id,
      match_id,
      winner_id,
      isDraw,
      scoreA,
      scoreB,
    );

    router.back();
  };

  const addGoalModal = (team) => {
    setNewEvent({
      ...newEvent,
      team: team,
      timestamp: Math.floor(gameTimer / 60).toString(),
    });

    setModalVisible(true);
  };

  const addGoal = (submitType, updatedEvent) => {
    setModalVisible(false);

    setNewEvent({
      team: null,
      player: null,
      timestamp: null,
    });

    let matchEvent;

    if (submitType === "edit") {
      matchEvent = {
        id: updatedEvent.id,
        event: "goal",
        team_id: updatedEvent.team.id,
        player_id: updatedEvent.player,
        minute: updatedEvent.timestamp,
      };

      setTempEvents(
        tempEvents.map((tempEvent) =>
          tempEvent.id === updatedEvent.id ? { ...matchEvent } : tempEvent,
        ),
      );
    } else if (submitType === "delete") {
      setTempEvents(
        tempEvents.filter((tempEvent) => tempEvent.id !== updatedEvent.id),
      );
    } else {
      matchEvent = {
        id: uuidv4(),
        event: "goal",
        team_id: updatedEvent.team.id,
        player_id: updatedEvent.player,
        minute: updatedEvent.timestamp,
      };

      setTempEvents([...tempEvents, matchEvent]);
    }
  };

  const closeEventModal = () => {
    setModalVisible(false);

    setNewEvent({
      team: null,
      player: null,
      timestamp: null,
    });
  };

  const recentEvents = () => {
    return [...tempEvents].reverse().sort((a, b) => b.minute - a.minute);
  };

  const editTimelineItem = (event) => {
    setNewEvent({
      ...newEvent,
      id: event.id,
      team: getTeamData(event.team_id),
      player: event.player_id,
      timestamp: event.minute,
    });

    setModalVisible(true);
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
          backPress={closeMatch}
          forwardPress={submitMatch}
        />
        {/* <ScreenContainer> */}

        {/* Timer Container */}
        <View style={styles.timerContainer}>
          <View style={styles.timerSide}>
            <TouchableOpacity style={styles.timerButton} onPress={toggleTimer}>
              {gameIsRunning ? (
                <IconPause width={20} height={20} color={colors["grey-700"]} />
              ) : (
                <IconPlay width={20} height={20} color={colors["grey-700"]} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={styles.timerText}
          >{`${gameMinutes}:${gameSeconds}`}</Text>

          <View style={[styles.timerSide, styles.timerSideRight]}>
            <View
              style={[styles.liveIndicator, { opacity: gameIsRunning ? 1 : 0 }]}
            >
              <View style={styles.liveDot} />
              <Text style={styles.liveIndicatorText}>Live</Text>
            </View>
          </View>
        </View>

        {/* Score Container */}
        <View style={styles.scoreContainer}>
          <View style={styles.playerContainer}>
            <Avatar
              uri={teamA.imageUri}
              type="team"
              style={styles.playerImage}
            />
            <View style={styles.playerText}>
              <Text style={styles.playerName} numberOfLines={1}>
                {teamA.name}
              </Text>
              <Text style={styles.side}>Home</Text>
            </View>
          </View>

          <View style={styles.score}>
            <Text style={styles.scoreText}>
              {scoreA}:{scoreB}
            </Text>
          </View>

          <View style={styles.playerContainer}>
            <Avatar
              uri={teamB.imageUri}
              type="team"
              style={styles.playerImage}
            />
            <View style={styles.playerText}>
              <Text style={styles.playerName} numberOfLines={1}>
                {teamB.name}
              </Text>
              <Text style={styles.side}>Away</Text>
            </View>
          </View>
        </View>

        {/* Event Container */}
        <View style={styles.eventContainer}>
          <View style={styles.scoreButtons}>
            <View style={styles.scoreEvent}>
              <Text style={styles.scoreEventText}>Home Score</Text>
              <View style={styles.scoreEventAdd}>
                <Button
                  onPress={() => addGoalModal(teamA)}
                  label={
                    <IconAdd width={24} height={24} color={colors.white} />
                  }
                />
              </View>
            </View>
            <View style={styles.scoreEvent}>
              <Text style={styles.scoreEventText}>Away Score</Text>
              <View style={styles.scoreEventAdd}>
                <Button
                  onPress={() => addGoalModal(teamB)}
                  label={
                    <IconAdd width={24} height={24} color={colors.white} />
                  }
                />
              </View>
            </View>
          </View>
        </View>

        {/* Timeline Container */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Recent Events</Text>
          <ScrollView contentContainerStyle={styles.timeline}>
            {recentEvents().length === 0 ? (
              <Text style={styles.emptyTimeline}>No events yet</Text>
            ) : (
              recentEvents().map((event) => (
                <MatchEventTimelineItem
                  onPress={() => editTimelineItem(event)}
                  key={event.id}
                  isHome={event.team_id === teamA.id}
                  player={
                    event.player_id
                      ? getPlayerData(event.team_id, event.player_id)
                      : null
                  }
                  minute={event.minute}
                />
              ))
            )}
          </ScrollView>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "100%",

                height: 562,
                backgroundColor: "white",
                borderTopRightRadius: 35,
                borderTopLeftRadius: 35,
              }}
            >
              <MatchEventModal
                teamA={teamA}
                teamB={teamB}
                event={newEvent}
                onClose={closeEventModal}
                onSubmit={(submitType, updatedEvent) =>
                  addGoal(submitType, updatedEvent)
                }
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LivePanel;

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors["grey-200"],
  },
  timerSide: {
    flex: 1,
  },
  timerSideRight: {
    alignItems: "flex-end",
  },
  timerButton: {
    height: 40,
    width: 40,
    backgroundColor: colors["grey-100"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  timerText: {
    ...typography.headings.h3,
    color: colors["grey-900"],
    flex: 1,
    textAlign: "center",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors["error-100"],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors["error-500"],
  },
  liveIndicatorText: {
    ...typography.body.small.semibold,
    color: colors["error-600"],
  },
  scoreContainer: {
    paddingVertical: 20,
    flexDirection: "row",
  },
  playerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  playerText: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  playerName: {
    ...typography.body.medium.bold,
    textAlign: "center",
  },
  side: {
    ...typography.body.small.medium,
    color: colors["grey-400"],
  },
  score: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    ...typography.headings.h2,
  },
  playerImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  eventContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  scoreButtons: {
    flexDirection: "row",
    gap: 8,
  },
  scoreEvent: {
    flex: 1,
    padding: 16,
    backgroundColor: colors["grey-50"],
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  scoreEventText: {
    ...typography.body.small.medium,
    color: colors["primary-600"],
  },
  scoreEventAdd: {
    width: "100%",
  },
  timelineContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
    flex: 1,
  },
  timelineTitle: {
    ...typography.body.medium.semibold,
    paddingBottom: 16,
  },
  emptyTimeline: {
    ...typography.body.medium.regular,
    color: colors["grey-400"],
    textAlign: "center",
    marginTop: 24,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

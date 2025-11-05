import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import AppBar from "@/components/molcecules/AppBar";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams } from "expo-router";

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";
import IconPlay from "@/assets/icons/icon-play.svg";
import IconPause from "@/assets/icons/icon-pause.svg";
import IconAdd from "@/assets/icons/icon-add.svg";
import Button from "@/components/atoms/Button";

import MatchEventTile from "@/components/molcecules/MatchEventTile";
import MatchEventTimelineItem from "@/components/molcecules/MatchEventTimelineItem";

const placeholderImage = require("@/assets/images/icon.png");

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

    router.back();
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

        {/* Timer Container */}
        <View style={styles.timerContainer}>
          <View style={styles.timerButton}>
            <TouchableOpacity onPress={() => setGameIsRunning(!gameIsRunning)}>
              {gameIsRunning ? (
                <IconPause width={24} height={24} color={colors["grey-900"]} />
              ) : (
                <IconPlay width={24} height={24} color={colors["grey-900"]} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.timer}>
            <Text
              style={styles.timerText}
            >{`${gameMinutes}:${gameSeconds}`}</Text>
          </View>
          <View style={styles.timerStatus}>
            <TouchableOpacity onPress={() => setGameIsRunning(!gameIsRunning)}>
              <View style={styles.liveIndicator}>
                <Text style={styles.liveIndicatorText}>Live</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Score Container */}
        <View style={styles.scoreContainer}>
          <View style={styles.playerContainer}>
            <Image style={styles.playerImage} source={placeholderImage} />
            <View style={styles.playerText}>
              <Text style={styles.playerName}>Player 1</Text>
              <Text style={styles.side}>Home</Text>
            </View>
          </View>

          <View style={styles.score}>
            <Text style={styles.scoreText}>0:0</Text>
          </View>

          <View style={styles.playerContainer}>
            <Image style={styles.playerImage} source={placeholderImage} />
            <View style={styles.playerText}>
              <Text style={styles.playerName}>Player 2</Text>
              <Text style={styles.side}>Away</Text>
            </View>
          </View>
        </View>

        {/* Event Container */}
        <View style={styles.eventContainer}>
          <View style={styles.scoreButtons}>
            <View style={styles.scoreEvent}>
              <Text style={styles.scoreEventText}>Home Score</Text>
              <Button
                style={styles.scoreEventAdd}
                label={<IconAdd width={24} height={24} color={colors.white} />}
              />
            </View>
            <View style={styles.scoreEvent}>
              <Text style={styles.scoreEventText}>Away Score</Text>
              <Button
                style={styles.scoreEventAdd}
                label={<IconAdd width={24} height={24} color={colors.white} />}
              />
            </View>
          </View>
          <View style={styles.matchEventsContainer}>
            <Text style={styles.matchEventsTitle}>Match events</Text>
            <View style={styles.matchEvents}>
              <MatchEventTile icon={"⚽"} label="Goal" />
              <MatchEventTile icon={"🟨"} label="Yellow" />
              <MatchEventTile icon={"🟥"} label="Red" />
            </View>
          </View>
        </View>

        {/* Timeline Container */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Recent Events</Text>
          <ScrollView contentContainerStyle={styles.timeline}>
            <MatchEventTimelineItem />
            <MatchEventTimelineItem />
            <MatchEventTimelineItem />
            <MatchEventTimelineItem />
            <MatchEventTimelineItem />
            <MatchEventTimelineItem />
            <MatchEventTimelineItem />
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LivePanel;

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors["grey-200"],
  },
  timerButton: {
    height: 44,
    width: 44,
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-100"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  timerText: {
    ...typography.headings.h3,
  },
  liveIndicator: {
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#FF3030",
  },
  liveIndicatorText: {
    ...typography.body.medium.bold,
    textTransform: "uppercase",
    color: colors.white,
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
  },
  playerName: {
    ...typography.body.medium.bold,
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
  matchEventsTitle: {
    ...typography.body.medium.semibold,
  },
  matchEvents: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
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
  timeline: {
    gap: 8,
  },
});

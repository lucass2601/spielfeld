import { StyleSheet, View, Alert } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AppBar from "@/components/molcecules/AppBar";
import MatchScorePanel from "@/components/molcecules/MatchScorePanel";
import MatchTimeline from "@/components/molcecules/MatchTimeline";
import Button from "@/components/atoms/Button";

import { colors } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams } from "expo-router";

import IconClose from "@/assets/icons/icon-close.svg";

const MatchDetails = () => {
  const { tournament_id, match_id } = useGlobalSearchParams();

  const match = useTournamentStore((state) =>
    state.getMatch(tournament_id, match_id),
  );

  const getTeam = useTournamentStore((state) => state.getTeam);
  const getPlayer = useTournamentStore((state) => state.getPlayer);
  const resetTournamentMatch = useTournamentStore(
    (state) => state.resetTournamentMatch,
  );

  if (!match) return null;

  const getTeamData = (team_id) => getTeam(tournament_id, team_id);
  const getPlayerData = (team_id, player_id) =>
    getPlayer(tournament_id, team_id, player_id);

  const teamA = getTeamData(match.teamA);
  const teamB = getTeamData(match.teamB);

  const scoreA = match.teamAScore ?? 0;
  const scoreB = match.teamBScore ?? 0;

  const sortedEvents = [...(match.events ?? [])].sort(
    (a, b) => b.minute - a.minute,
  );

  const handleReset = () => {
    Alert.alert(
      "Reset Match?",
      "This will clear all scores and events for this match.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetTournamentMatch(tournament_id, match_id);
            router.back();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <AppBar
          iconLeft={
            <IconClose width={24} height={24} color={colors["grey-900"]} />
          }
          title="Match Details"
        />

        <MatchScorePanel
          teamA={teamA}
          teamB={teamB}
          scoreA={scoreA}
          scoreB={scoreB}
        />

        <MatchTimeline
          events={sortedEvents}
          teamA={teamA}
          getPlayerData={getPlayerData}
        />

        <View style={styles.resetButton}>
          <Button
            variant="secondary"
            size="large"
            label="Reset Match"
            textColor={colors["error-600"]}
            onPress={handleReset}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MatchDetails;

const styles = StyleSheet.create({
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

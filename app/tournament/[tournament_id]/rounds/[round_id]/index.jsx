import { Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";

import IconClose from "@/assets/icons/icon-close.svg";

import { colors, typography } from "@/theme/theme";
import useTournamentStore from "@/store/useTournamentStore";

const RoundDetails = () => {
  const { tournament_id, round_id } = useLocalSearchParams();

  const round = useTournamentStore((state) =>
    state.getRound(tournament_id, round_id)
  );

  const getTeam = useTournamentStore((state) => state.getTeam);

  const getTeamData = (team_id) => {
    return getTeam(tournament_id, team_id);
  };

  const updateTournamentRoundWinner = useTournamentStore(
    (state) => state.updateTournamentRoundWinner
  );

  const teamA = getTeamData(round.teamA);
  const teamB = getTeamData(round.teamB);
  const winnerId = round?.winnerId ?? null;

  const handlePickWinner = (team_id) => {
    if (!round) return;
    updateTournamentRoundWinner(tournament_id, round_id, team_id);
  };

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
          title="Edit Round"
        />
        <ScreenContainer>
          <View style={{ gap: 24 }}>
            {!round ? (
              <Text style={{ color: colors["error-600"] }}>
                Round not found.
              </Text>
            ) : (
              <>
                <View style={styles.card}>
                  <Text style={styles.title}>Pick Winner</Text>

                  <Pressable
                    style={[styles.option]}
                    onPress={() => handlePickWinner(teamA.id)}
                  >
                    <Text style={styles.optionText}>
                      {teamA.name}
                      {winnerId === teamA.id && " ✅"}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.option]}
                    onPress={() => handlePickWinner(teamB.id)}
                  >
                    <Text style={styles.optionText}>
                      {teamB.name}
                      {winnerId === teamB.id && " ✅"}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.debugBox}>
                  <Text style={styles.debugTitle}>Debug</Text>
                  <Text style={styles.debugText}>{JSON.stringify(round)}</Text>
                </View>
              </>
            )}
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RoundDetails;

const styles = StyleSheet.create({
  imageContainer: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    height: 88,
    width: 88,
    borderRadius: 44,
  },
  image: {
    height: 88,
    width: 88,
    borderRadius: 44,
    overflow: "hidden",
    backgroundColor: colors["grey-200"],
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    marginTop: 12,
    color: colors["primary-600"],
    ...typography.body.medium.bold,
  },
  removeText: {
    marginTop: 12,
    color: colors["error-600"],
    ...typography.body.medium.bold,
  },
  card: {
    borderWidth: 1,
    borderColor: colors["grey-200"],
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  title: {
    ...typography.body.large.bold,
    color: colors["grey-900"],
    marginBottom: 4,
  },
  option: {
    borderWidth: 1,
    borderColor: colors["grey-300"],
    borderRadius: 10,
    padding: 12,
  },
  optionSelected: {
    borderColor: colors["primary-600"],
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    ...typography.body.medium.regular,
    color: colors["grey-900"],
  },
  hint: {
    marginTop: 4,
    ...typography.body.small.regular,
    color: colors["grey-600"],
  },
  debugBox: {
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
    padding: 12,
  },
  debugTitle: {
    ...typography.body.medium.bold,
    color: colors["grey-800"],
    marginBottom: 6,
  },
  debugText: {
    ...typography.body.small.regular,
    color: colors["grey-700"],
  },
});

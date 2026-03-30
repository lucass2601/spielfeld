import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Alert } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";

import { colors, typography } from "@/theme/theme";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import TournamentFormatItem from "@/components/molcecules/TournamentFormatItem";
import NumericStepper from "@/components/atoms/NumericStepper";

import useTournamentStore from "@/store/useTournamentStore";

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";

const FormatTab = () => {
  const { tournament_id } = useGlobalSearchParams();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const updateTournamentSettings = useTournamentStore(
    (state) => state.updateTournamentSettings,
  );

  const deleteTournamentMatches = useTournamentStore(
    (state) => state.deleteTournamentMatches,
  );

  const [selectedFormat, setSelectedFormat] = useState(
    tournament?.format || "roundrobin",
  );

  const [pointsWin, setPointsWin] = useState(tournament?.pointsWin ?? 3);
  const [pointsTie, setPointsTie] = useState(tournament?.pointsTie ?? 1);
  const [pointsLose, setPointsLose] = useState(tournament?.pointsLose ?? 0);

  const hasSchedule = (tournament?.matchdays?.length ?? 0) > 0;
  const hasChanges =
    selectedFormat !== tournament?.format ||
    pointsWin !== (tournament?.pointsWin ?? 3) ||
    pointsTie !== (tournament?.pointsTie ?? 1) ||
    pointsLose !== (tournament?.pointsLose ?? 0);

  const handleSave = () => {
    const applyChanges = () => {
      updateTournamentSettings(tournament_id, {
        format: selectedFormat,
        pointsWin,
        pointsTie,
        pointsLose,
      });
      router.dismiss();
    };

    if (hasSchedule && hasChanges) {
      Alert.alert(
        "This Will Reset Your Schedule",
        "Heads up — your current match schedule was built around the previous format. Switching now means it won't be valid anymore and you'll have to generate a new one. Still want to change it?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Change Format",
            style: "destructive",
            onPress: () => {
              deleteTournamentMatches(tournament_id);
              applyChanges();
            },
          },
        ],
      );
    } else {
      applyChanges();
    }
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
          iconRight={
            <IconCheck width={24} height={24} color={colors["success-500"]} />
          }
          title="Manage Format"
          backPress={() => router.dismiss()}
          forwardPress={handleSave}
        />
        <ScreenContainer>
          <View style={styles.content}>
            <View style={styles.formatContainer}>
              <Text style={styles.label}>Format</Text>
              <View>
                <TournamentFormatItem
                  title="League"
                  description="Each team competes against everyone else, and the one with the most points wins. Ideal for fair competition and multiple matches."
                  onPress={() => setSelectedFormat("roundrobin")}
                  selected={selectedFormat === "roundrobin"}
                />
                <TournamentFormatItem
                  title="Knockout"
                  description="A team is eliminated after losing a match until only one winner remains. Fast-paced, exciting, and perfect for large tournaments."
                  onPress={() => setSelectedFormat("knockout")}
                  selected={selectedFormat === "knockout"}
                />
              </View>
            </View>
            {selectedFormat === "roundrobin" && (
              <View style={styles.settingsContainer}>
                <Text style={styles.label}>Settings</Text>
                <View>
                  <NumericStepper
                    label="Points per win"
                    value={pointsWin}
                    onChange={setPointsWin}
                    max={10}
                  />
                  <NumericStepper
                    label="Points per tie"
                    value={pointsTie}
                    onChange={setPointsTie}
                    max={10}
                  />
                  <NumericStepper
                    label="Points per lose"
                    value={pointsLose}
                    onChange={setPointsLose}
                    max={10}
                  />
                </View>
              </View>
            )}
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FormatTab;

const styles = StyleSheet.create({
  content: {
    gap: 20,
  },
  label: {
    marginBottom: 12,
    color: colors["grey-900"],
    ...typography.body.medium.semibold,
  },
});

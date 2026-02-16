import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
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

  const [selectedFormat, setSelectedFormat] = useState(
    tournament?.format || "roundrobin",
  );

  const [pointsWin, setPointsWin] = useState(3);
  const [pointsTie, setPointsTie] = useState(1);
  const [pointsLose, setPointsLose] = useState(0);

  const handleSave = () => {};

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
                  title="Knockout (Coming soon)"
                  description="A team is eliminated after losing a match until only one winner remains. Fast-paced, exciting, and perfect for large tournaments."
                  onPress={() => setSelectedFormat("knockout")}
                  selected={selectedFormat === "knockout"}
                  disabled={true}
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
                  />
                  <NumericStepper
                    label="Points per tie"
                    value={pointsTie}
                    onChange={setPointsTie}
                  />
                  <NumericStepper
                    label="Points per lose"
                    value={pointsLose}
                    onChange={setPointsLose}
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

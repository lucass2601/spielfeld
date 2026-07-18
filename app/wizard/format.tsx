import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentFormatItem from "@/components/molcecules/TournamentFormatItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { TournamentFormat } from "@/types/tournament";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Wizard_Format() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const [selectedFormat, setSelectedFormat] = useState(
    newTournament.format || "roundrobin",
  );
  const setNewTournamentInfo = useTournamentStore(
    (state) => state.setNewTournamentInfo,
  );

  useEffect(() => {
    setNewTournamentInfo("format", selectedFormat);
  }, [selectedFormat]);

  const submitWizard = () => {
    router.push("/wizard/sport");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Choose a Tournament format</Text>
      </View>
      <View style={styles.content}>
        <TournamentFormatItem
          title="League"
          description="Each team competes against everyone else, and the one with the most points wins. Ideal for fair competition and multiple matches."
          onPress={() => setSelectedFormat(TournamentFormat.ROUND_ROBIN)}
          selected={selectedFormat === TournamentFormat.ROUND_ROBIN}
        />
        <TournamentFormatItem
          title="Knockout"
          description="A team is eliminated after losing a match until only one winner remains. Fast-paced, exciting, and perfect for large tournaments."
          onPress={() => setSelectedFormat(TournamentFormat.KNOCKOUT)}
          selected={selectedFormat === TournamentFormat.KNOCKOUT}
        />
      </View>
      <View style={{ marginTop: "auto", marginBottom: 24 }}>
        <Button onPress={submitWizard} label="Next" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wizard_header: {
    alignItems: "center",
  },
  title: {
    ...typography.headings.h4,
    color: colors["grey-900"],
  },
  content: {
    marginTop: 32,
    gap: 12,
  },
});

import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentFormatItem from "@/components/molcecules/TournamentFormatItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
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
      <Button
        onPress={submitWizard}
        label="Next"
        style={{ marginTop: "auto", marginBottom: 24 }}
      />
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

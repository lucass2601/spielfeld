import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentTypeItem from "@/components/molcecules/TournamentTypeItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Wizard_Type() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const [selectedType, setSelectedType] = useState(
    newTournament.type || "roundrobin"
  );
  const setNewTournamentInfo = useTournamentStore(
    (state) => state.setNewTournamentInfo
  );

  const submitWizard = () => {
    setNewTournamentInfo("type", selectedType);
    router.push("/wizard/info");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Choose a Tournament type</Text>
      </View>
      <View style={styles.content}>
        <TournamentTypeItem
          title="League"
          description="Each team competes against everyone else, and the one with the most points wins. Ideal for fair competition and multiple matches."
          onPress={() => setSelectedType("roundrobin")}
          selected={selectedType === "roundrobin"}
        />
        <TournamentTypeItem
          title="Knockout (Coming soon)"
          description="A team is eliminated after losing a match until only one winner remains. Fast-paced, exciting, and perfect for large tournaments."
          onPress={() => setSelectedType("knockout")}
          selected={selectedType === "knockout"}
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

import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import Button from "@/components/atoms/Button";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";

export default function Wizard_Participants() {
  const newTournament = useTournamentStore((state) => state.newTournament);

  const submitWizard = () => {
    router.push("/wizard/summary");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>
          {newTournament.participantType === "individual"
            ? "Select Players"
            : "Select Teams"}
        </Text>
      </View>
      <View style={styles.content}>
        <Text>{JSON.stringify(newTournament)}</Text>
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

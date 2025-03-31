import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet } from "react-native";

export default function Wizard_Summary() {
  const newTournament = useTournamentStore((state) => state.newTournament);

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Tournament Summary</Text>
      </View>
      <View style={styles.content}>
        <Text>Tournament Summary</Text>
      </View>
      <Button
        label="Create Tournament"
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

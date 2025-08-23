import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentSportItem from "@/components/molcecules/TournamentSportItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Wizard_Format() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const [selectedSport, setSelectedSport] = useState(
    newTournament.sport || null
  );
  const setNewTournamentInfo = useTournamentStore(
    (state) => state.setNewTournamentInfo
  );

  const submitWizard = () => {
    setNewTournamentInfo("sport", selectedSport);
    router.push("/wizard/info");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Choose a Sport</Text>
        <Text style={styles.subtitle}>
          Pick a sport to unlock sport-specific stats and features. Football
          enables the Live Panel. No sport keeps it generic.
        </Text>
      </View>
      <View style={styles.content}>
        <TournamentSportItem
          icon="📋"
          title="No Sport"
          onPress={() => setSelectedSport(null)}
          selected={selectedSport === null}
        />
        <TournamentSportItem
          icon="⚽"
          title="Football"
          onPress={() => setSelectedSport("football")}
          selected={selectedSport === "football"}
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
  subtitle: {
    marginTop: 12,
    ...typography.body.small.regular,
    color: colors["grey-500"],
  },
  content: {
    marginTop: 32,
    gap: 12,
  },
});

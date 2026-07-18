import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentSportItem from "@/components/molcecules/TournamentSportItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import IconSportSoccer from "@/assets/icons/icon-sport-soccer.svg";
import IconSportNoSport from "@/assets/icons/icon-sport-no-sport.svg";
import { Sport } from "@/types/sport";

export default function Wizard_Format() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const [selectedSport, setSelectedSport] = useState(
    newTournament.sport || null,
  );
  const setNewTournamentInfo = useTournamentStore(
    (state) => state.setNewTournamentInfo,
  );

  useEffect(() => {
    setNewTournamentInfo("sport", selectedSport);
  }, [selectedSport]);

  const submitWizard = () => {
    router.push("/wizard/info");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Choose a Sport</Text>
        <Text style={styles.subtitle}>
          Select a sport to use live match tracking tailored to your game
        </Text>
      </View>
      <View style={styles.content}>
        <TournamentSportItem
          icon={
            <IconSportNoSport
              width={24}
              height={24}
              color={colors["grey-900"]}
            />
          }
          title="No Sport"
          onPress={() => setSelectedSport(null)}
          selected={selectedSport === null}
        />
        <TournamentSportItem
          icon={
            <IconSportSoccer
              width={24}
              height={24}
              color={colors["grey-900"]}
            />
          }
          title="Football"
          onPress={() => setSelectedSport(Sport.FOOTBALL)}
          selected={selectedSport === "football"}
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

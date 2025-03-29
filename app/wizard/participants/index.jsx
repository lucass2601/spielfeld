import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { colors, typography } from "@/theme/theme";

import Button from "@/components/atoms/Button";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import ParticipantWrapper from "@/components/molcecules/ParticipantWrapper";

import useTournamentStore from "@/store/useTournamentStore";

export default function Wizard_Participants({ onSelectParticipant }) {
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const newTournament = useTournamentStore((state) => state.newTournament);

  const submitWizard = () => {
    router.push("/wizard/summary");
  };

  const handleParticipantSelect = (participant) => {
    if (selectedParticipants.includes(participant)) {
      setSelectedParticipants(
        selectedParticipants.filter(
          (selectedParticipant) => selectedParticipant !== participant
        )
      );
    } else {
      setSelectedParticipants([...selectedParticipants, participant]);
    }
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
        <Text>{JSON.stringify(selectedParticipants)}</Text>
        <ParticipantWrapper
          participantType={newTournament.participantType}
          allowSelection={true}
          selectedParticipants={selectedParticipants}
          onSelectParticipant={(participant) =>
            handleParticipantSelect(participant)
          }
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

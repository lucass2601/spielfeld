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
  const setTournamentInfo = useTournamentStore(
    (state) => state.setTournamentInfo
  );

  const submitWizard = () => {
    setTournamentInfo("participants", selectedParticipants);
    router.push("/wizard/summary");
  };

  const handleParticipantSelect = (participant_id) => {
    if (selectedParticipants.includes(participant_id)) {
      setSelectedParticipants(
        selectedParticipants.filter(
          (selectedParticipant_id) => selectedParticipant_id !== participant_id
        )
      );
    } else {
      setSelectedParticipants([...selectedParticipants, participant_id]);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>
          {newTournament.participantType === "players"
            ? "Select Players"
            : "Select Teams"}
        </Text>
      </View>
      <View style={styles.content}>
        <ParticipantWrapper
          participantType={newTournament.participantType}
          allowSelection={true}
          selectedParticipants={selectedParticipants}
          onSelectParticipant={(participant_id) =>
            handleParticipantSelect(participant_id)
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

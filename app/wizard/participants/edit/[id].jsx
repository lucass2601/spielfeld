import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import ParticipantForm from "@/components/molcecules/ParticipantForm";

import { useLocalSearchParams } from "expo-router";
import useTournamentStore from "@/store/useTournamentStore";

const EditParticipant = () => {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const { id } = useLocalSearchParams();
  const participant = useTournamentStore((state) => state.getParticipant(id));

  return (
    <ScreenContainer>
      <ParticipantForm
        type={newTournament.participantType}
        participant={participant}
        mode="edit"
      />
    </ScreenContainer>
  );
};

export default EditParticipant;

const styles = StyleSheet.create({});

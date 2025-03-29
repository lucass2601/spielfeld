import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import ParticipantForm from "@/components/molcecules/ParticipantForm";

import { useLocalSearchParams } from "expo-router";

const EditParticipant = () => {
  const { id } = useLocalSearchParams();

  return (
    <ScreenContainer>
      <Text>{id}</Text>
      <ParticipantForm />
    </ScreenContainer>
  );
};

export default EditParticipant;

const styles = StyleSheet.create({});

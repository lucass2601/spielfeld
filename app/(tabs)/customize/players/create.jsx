import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import ParticipantForm from "@/components/molcecules/ParticipantForm";
import { StyleSheet, Text, View } from "react-native";

const CreatePlayerScreen = () => {
  return (
    <ScreenContainer>
      <ParticipantForm />
    </ScreenContainer>
  );
};

export default CreatePlayerScreen;

const styles = StyleSheet.create({});

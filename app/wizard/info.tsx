import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import AvatarPicker from "@/components/molcecules/AvatarPicker";
import DateTimePickerInput from "@/components/molcecules/DateTimePickerInput";
import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";

export default function Wizard_Information() {
  const newTournament = useTournamentStore((state) => state.newTournament);

  const setNewTournamentInfo = useTournamentStore(
    (state) => state.setNewTournamentInfo,
  );

  const [tournamentName, setTournamentName] = useState(
    newTournament.name || "",
  );
  const [imageUri, setImageUri] = useState(newTournament.imageUri);
  const [startDate, setStartDate] = useState(newTournament.startDate);

  useEffect(() => {
    setNewTournamentInfo("imageUri", imageUri);
  }, [imageUri]);

  useEffect(() => {
    setNewTournamentInfo("name", tournamentName);
  }, [tournamentName]);

  useEffect(() => {
    if (startDate) {
      setNewTournamentInfo("startDate", startDate);
    }
  }, [startDate]);

  const submitWizard = () => {
    if (!tournamentName || !startDate) return;
    router.push("/wizard/summary");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Tournament Information</Text>
      </View>
      <KeyboardAwareScrollView bottomOffset={62}>
        <View style={styles.content}>
          <AvatarPicker imageUri={imageUri} onChange={setImageUri} />
          <Input
            value={tournamentName}
            onChangeText={(tournamentName) => setTournamentName(tournamentName)}
            label={"Name"}
            placeholder="Enter tournament name..."
          />

          <DateTimePickerInput
            value={startDate}
            onChange={(newStartDate) =>
              setStartDate(newStartDate.toISOString())
            }
            label="Start Date"
            placeholder="Select starting date"
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={{ marginTop: "auto", marginBottom: 24 }}>
        <Button
          disabled={!tournamentName || !startDate}
          onPress={submitWizard}
          label="Next"
        />
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
  content: {
    marginTop: 32,
    gap: 24,
    width: "100%",
  },
});

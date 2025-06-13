import { colors, typography } from "@/theme/theme";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import SegmentedControl from "@/components/molcecules/SegmentedControl";
import DateTimePickerInput from "@/components/molcecules/DateTimePickerInput";

import IconHelp from "@/assets/icons/icon-help.svg";
import useTournamentStore from "@/store/useTournamentStore";

const participantTypes = [
  {
    label: "Players",
    value: "players",
  },
  {
    label: "Teams",
    value: "teams",
  },
];

export default function Wizard_Information() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const setNewTournamentInfo = useTournamentStore(
    (state) => state.setNewTournamentInfo
  );
  const [participantType, setParticipantType] = useState(
    newTournament.participantType || "players"
  );
  const [tournamentName, setTournamentName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const submitWizard = () => {
    setNewTournamentInfo("imageUri", imageUri);
    setNewTournamentInfo("participantType", participantType);
    setNewTournamentInfo("name", tournamentName);
    setNewTournamentInfo("startDate", startDate);
    router.push("/wizard/participants");
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Tournament Information</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled" // Verhindert, dass Tastatur verschwindet bei Tippen auf ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Pressable onPress={pickImage} style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{ uri: imageUri }}
                resizeMode="cover"
              />
            </Pressable>
            <View style={styles.imageOptions}>
              {imageUri ? (
                <Text
                  onPress={() => setImageUri(null)}
                  style={styles.removeText}
                >
                  Remove Image
                </Text>
              ) : (
                <Text onPress={pickImage} style={styles.uploadText}>
                  Upload Image
                </Text>
              )}
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors["grey-900"],
                  ...typography.body.medium.semibold,
                }}
              >
                Participant Type
              </Text>
              <IconHelp color={colors["primary-600"]} />
            </View>
            <SegmentedControl
              selectedValue={participantType}
              onChange={(participantType) =>
                setParticipantType(participantType)
              }
              options={participantTypes}
            />
          </View>

          <Input
            value={tournamentName}
            onChangeText={(tournamentName) => setTournamentName(tournamentName)}
            label={"Name"}
            placeholder="Enter tournament name..."
          />

          <DateTimePickerInput
            value={startDate}
            onChange={(newStartDate) => setStartDate(newStartDate)}
            label="Start Date"
            placeholder="Select starting date"
            minDate={new Date()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    gap: 24,
    width: "100%",
  },
  imageContainer: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    height: 88,
    width: 88,
    borderRadius: 44,
  },
  image: {
    height: 88,
    width: 88,
    borderRadius: 44,
    overflow: "hidden",
    backgroundColor: colors["grey-200"],
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    marginTop: 12,
    color: colors["primary-600"],
    ...typography.body.medium.bold,
  },
  removeText: {
    marginTop: 12,
    color: colors["error-600"],
    ...typography.body.medium.bold,
  },
});

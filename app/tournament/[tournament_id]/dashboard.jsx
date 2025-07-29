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
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import DateTimePickerInput from "@/components/molcecules/DateTimePickerInput";
import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";

export default function DashboardTab() {
  const { tournament_id } = useGlobalSearchParams();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );

  const [tournamentName, setTournamentName] = useState(tournament.name || "");
  const [imageUri, setImageUri] = useState(tournament.imageUri || null);
  const [startDate, setStartDate] = useState(tournament.startDate || null);

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

  return (
    <ScreenContainer>
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
          <Button label="Save changes" />
          <Pressable onPress={() => alert("works")}>
            <Text
              style={{
                ...typography.body.medium.bold,
                color: colors["error-600"],
                paddingHorizontal: 16,
                paddingVertical: 8,
                textAlign: "center",
              }}
            >
              Delete tournament
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 24,
    width: "100%",
  },
  imageContainer: {
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

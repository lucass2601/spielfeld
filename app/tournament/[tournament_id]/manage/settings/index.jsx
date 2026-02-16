import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import * as ImagePicker from "expo-image-picker";

import { colors, typography } from "@/theme/theme";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import Input from "@/components/atoms/Input";
import DateTimePickerInput from "@/components/molcecules/DateTimePickerInput";
import TournamentSportItem from "@/components/molcecules/TournamentSportItem";

import useTournamentStore from "@/store/useTournamentStore";

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";
import IconSportSoccer from "@/assets/icons/icon-sport-soccer.svg";
import IconSportNoSport from "@/assets/icons/icon-sport-no-sport.svg";

const SettingsTab = () => {
  const { tournament_id } = useGlobalSearchParams();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const updateTournamentSettings = useTournamentStore(
    (state) => state.updateTournamentSettings,
  );

  const [imageUri, setImageUri] = useState(tournament?.imageUri || null);
  const [tournamentName, setTournamentName] = useState(tournament?.name || "");
  const [startDate, setStartDate] = useState(tournament?.startDate || null);
  const [selectedSport, setSelectedSport] = useState(tournament?.sport || null);

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

  const handleSave = () => {
    updateTournamentSettings(tournament_id, {
      imageUri,
      name: tournamentName,
      startDate,
      sport: selectedSport,
    });
    router.dismiss();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <AppBar
          iconLeft={
            <IconClose width={24} height={24} color={colors["grey-900"]} />
          }
          iconRight={
            <IconCheck width={24} height={24} color={colors["success-500"]} />
          }
          title="Tournament Settings"
          backPress={() => router.dismiss()}
          forwardPress={handleSave}
        />
        <ScreenContainer>
          <KeyboardAwareScrollView bottomOffset={62}>
            <View style={styles.content}>
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
                onChangeText={(name) => setTournamentName(name)}
                label="Name"
                placeholder="Enter tournament name..."
              />
              <DateTimePickerInput
                value={new Date(startDate)}
                onChange={(newStartDate) => setStartDate(newStartDate)}
                label="Start Date"
                placeholder="Select starting date"
              />
              <View style={styles.sportSection}>
                <Text style={styles.label}>Sport</Text>
                <View style={styles.sportOptions}>
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
                    onPress={() => setSelectedSport("football")}
                    selected={selectedSport === "football"}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  content: {
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
  sportSection: {
    marginTop: 8,
  },
  label: {
    marginBottom: 12,
    color: colors["grey-900"],
    ...typography.body.medium.semibold,
  },
  sportOptions: {
    gap: 12,
  },
});

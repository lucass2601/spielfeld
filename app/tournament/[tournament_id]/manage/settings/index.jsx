import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { colors, typography } from "@/theme/theme";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import Input from "@/components/atoms/Input";
import DateTimePickerInput from "@/components/molcecules/DateTimePickerInput";
import TournamentSportItem from "@/components/molcecules/TournamentSportItem";
import AvatarPicker from "@/components/molcecules/AvatarPicker";

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
    <BottomSheetModalProvider>
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
                <AvatarPicker value={imageUri} onChange={setImageUri} />
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
    </BottomSheetModalProvider>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  content: {
    gap: 24,
    width: "100%",
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

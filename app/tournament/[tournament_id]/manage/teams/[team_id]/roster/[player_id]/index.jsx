import { StyleSheet, View, Alert } from "react-native";
import { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import AvatarPicker from "@/components/molcecules/AvatarPicker";

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";

import { colors } from "@/theme/theme";
import useTournamentStore from "@/store/useTournamentStore";

const PlayerDetails = () => {
  const { tournament_id, team_id, player_id } = useLocalSearchParams();

  const player = useTournamentStore((state) =>
    state.getPlayer(tournament_id, team_id, player_id),
  );

  const deletePlayer = useTournamentStore((state) => state.deletePlayer);
  const editPlayer = useTournamentStore((state) => state.editPlayer);

  const [imageUri, setImageUri] = useState(player?.imageUri || null);
  const [name, setName] = useState(player?.name || "");

  const handleSubmit = () => {
    editPlayer(tournament_id, team_id, player_id, imageUri, name);
    router.back();
  };

  if (!player) return null;

  const handleDelete = () => {
    Alert.alert("Delete Player?", "", [
      {
        text: "Cancel",
        onPress: () => {
          return false;
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          router.back();
          deletePlayer(tournament_id, team_id, player_id);
        },
      },
    ]);
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
            <IconCheck width={24} height={24} color={colors["success-600"]} />
          }
          title="Edit Player"
          backPress={() => router.dismiss()}
          forwardPress={handleSubmit}
        />
        <ScreenContainer>
          <View style={styles.tabContainer}>
            <AvatarPicker value={imageUri} onChange={setImageUri} />

            <View style={styles.formContainer}>
              <View>
                <Input
                  value={name}
                  onChangeText={(val) => setName(val)}
                  label="Name"
                  maxLength={32}
                />
              </View>
            </View>

            <View>
              <Button
                textColor={colors["error-600"]}
                variant="secondary"
                label="Delete Player"
                onPress={handleDelete}
              />
            </View>
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PlayerDetails;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    gap: 24,
  },
});

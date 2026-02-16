import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
} from "react-native";
import { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

import { router, useLocalSearchParams, usePathname } from "expo-router";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";

import { colors, typography } from "@/theme/theme";
import useTournamentStore from "@/store/useTournamentStore";
import RosterList from "@/components/molcecules/RosterList";

import AddTeamsModal from "@/components/molcecules/AddEntityModal";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const TeamDetails = () => {
  const { tournament_id, team_id } = useLocalSearchParams();

  const pathname = usePathname();

  const team = useTournamentStore((state) =>
    state.getTeam(tournament_id, team_id),
  );

  const addPlayer = useTournamentStore((state) => state.addPlayer);

  const deleteTeam = useTournamentStore((state) => state.deleteTeam);
  const editTeam = useTournamentStore((state) => state.editTeam);

  const [imageUri, setImageUri] = useState(team.imageUri || null);
  const [name, setName] = useState(team.name || "");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    editTeam(tournament_id, team_id, imageUri, name);
    router.back();
  };

  const addNewPlayer = () => {
    setModalOpen(true);
  };

  const viewPlayer = (player_id) => {
    router.push(`${pathname}/roster/${player_id}`);
  };

  const handleDelete = () => {
    Alert.alert("Delete Team?", "", [
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
          deleteTeam(tournament_id, team_id);
          router.back();
        },
      },
    ]);
  };

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
          title="Edit Team"
          backPress={() => router.dismiss()}
          forwardPress={handleSubmit}
        />
        <ScreenContainer>
          <Modal
            visible={modalOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setModalOpen(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <KeyboardAvoidingView behavior="padding">
                <View
                  style={{
                    width: "100%",
                    height: 400,
                    backgroundColor: "white",
                    borderTopRightRadius: 35,
                    borderTopLeftRadius: 35,
                  }}
                >
                  <AddTeamsModal
                    entity="player"
                    onAddEntities={(names) => {
                      names.forEach((name) =>
                        addPlayer(tournament_id, team_id, name),
                      );
                    }}
                    onClose={() => setModalOpen(false)}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>

          <View style={styles.imageContainer}>
            <Pressable onPress={pickImage} style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{ uri: imageUri }}
                resizeMode="cover"
              />
            </Pressable>
            <View style={styles.imageOptions}>
              <Text
                onPress={imageUri ? () => setImageUri(null) : pickImage}
                style={styles.imageText}
              >
                {imageUri ? "Change Photo" : "Add Photo"}
              </Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View>
              <Input
                value={name}
                onChangeText={(val) => setName(val)}
                label="Name"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{ ...typography.body.medium.semibold, marginBottom: 20 }}
              >
                Roster ({team.roster.length})
              </Text>
              <RosterList
                onPlayerAdd={addNewPlayer}
                onPlayerPress={viewPlayer}
                roster={team.roster}
              />
            </View>
          </View>

          <View>
            <Button
              textColor={colors["error-600"]}
              variant="secondary"
              style={{ color: "red" }}
              label="Delete Team"
              onPress={handleDelete}
            />
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TeamDetails;

const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    height: 80,
    width: 80,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: colors["grey-200"],
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    marginTop: 8,
    color: colors["primary-600"],
    ...typography.body.medium.bold,
  },
  formContainer: {
    marginTop: 24,
    gap: 24,
    flex: 1,
    paddingBottom: 24,
  },
});

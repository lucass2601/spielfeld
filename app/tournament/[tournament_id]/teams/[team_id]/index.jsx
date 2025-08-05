import { Image, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

import { router, useLocalSearchParams } from "expo-router";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import IconClose from "@/assets/icons/icon-close.svg";

import { colors, typography } from "@/theme/theme";
import useTournamentStore from "@/store/useTournamentStore";

const TeamDetails = () => {
  const { tournament_id, team_id } = useLocalSearchParams();

  const team = useTournamentStore((state) =>
    state.getTeam(tournament_id, team_id)
  );

  const deleteTeam = useTournamentStore((state) => state.deleteTeam);
  const editTeam = useTournamentStore((state) => state.editTeam);

  const [imageUri, setImageUri] = useState(team.imageUri || null);
  const [name, setName] = useState(team.name || "");

  const handleSubmit = () => {
    editTeam(tournament_id, team_id, imageUri, name);
    router.back();
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
          title="Edit Team"
        />
        <ScreenContainer>
          <View style={{ gap: 32 }}>
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

            <View>
              <Input
                value={name}
                onChangeText={(val) => setName(val)}
                label="Name"
              />
            </View>

            <View>
              <Button label="Save" onPress={handleSubmit} />
            </View>

            <View>
              <Pressable
                onPress={handleDelete}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    {
                      ...typography.body.medium.bold,
                      color: colors["error-600"],
                    },
                  ]}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TeamDetails;

const styles = StyleSheet.create({
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

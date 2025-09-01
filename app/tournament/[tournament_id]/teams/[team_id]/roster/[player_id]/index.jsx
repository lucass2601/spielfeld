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

const PlayerDetails = () => {
  const { tournament_id, team_id, player_id } = useLocalSearchParams();

  const player = useTournamentStore((state) =>
    state.getPlayer(tournament_id, team_id, player_id)
  );

  const deletePlayer = useTournamentStore((state) => state.deletePlayer);
  const editPlayer = useTournamentStore((state) => state.editPlayer);

  const [imageUri, setImageUri] = useState(player.imageUri || null);
  const [name, setName] = useState(player.name || "");

  const handleSubmit = () => {
    editPlayer(tournament_id, team_id, player_id, imageUri, name);
    router.back();
  };

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
          deletePlayer(tournament_id, team_id, player_id);
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
          title="Edit Player"
          backPress={() => router.dismiss()}
        />
        <ScreenContainer>
          <View style={styles.tabContainer}>
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
                  style={[
                    styles.imageText,
                    {
                      color: imageUri
                        ? colors["error-600"]
                        : colors["primary-600"],
                    },
                  ]}
                >
                  {imageUri ? "Remove Image" : "Upload Image"}
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
                    Delete Player
                  </Text>
                </Pressable>
              </View>
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
  imageText: {
    marginTop: 12,
    ...typography.body.medium.bold,
  },
  formContainer: {
    marginTop: 32,
    gap: 24,
  },
});

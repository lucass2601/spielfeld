import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { colors, typography } from "@/theme/theme";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

import useTournamentStore from "@/store/useTournamentStore";
import { router } from "expo-router";

const ParticipantForm = ({ type, participant, mode = "create" }) => {
  const [imageUri, setImageUri] = useState(participant?.imageUri || null);
  const [name, setName] = useState(participant?.name || "");

  const addParticipant = useTournamentStore((state) => state.addParticipant);
  const editParticipant = useTournamentStore((state) => state.editParticipant);

  const handleSubmit = () => {
    if (mode === "create") {
      addParticipant(imageUri, name, type);
    } else if (mode === "edit") {
      editParticipant(participant.id, imageUri, name, type);
    }
    router.back();
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
            <Text onPress={() => setImageUri(null)} style={styles.removeText}>
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
        <Input value={name} onChangeText={(val) => setName(val)} label="Name" />
      </View>

      <View>
        <Button label="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ParticipantForm;

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

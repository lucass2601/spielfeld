import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors, typography } from "@/theme/theme";

import placeholder from "@/assets/images/placeholder.png";
import IconCamera from "@/assets/icons/icon-camera.svg";

export default function AvatarPicker({
  imageUri,
  onChange,
  size = 88,
}: {
  imageUri: string | null;
  onChange: any;
  size: number;
}) {
  const radius = size / 2;

  const imagePickerOptions: ImagePicker.ImagePickerOptions = {
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    presentationStyle:
      ImagePicker.UIImagePickerPresentationStyle.OVER_FULL_SCREEN,
  };

  const takePhoto = async () => {
    const cameraPermissionResult =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera is required.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync(imagePickerOptions);

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const chooseFromLibrary = async () => {
    const libraryPermissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!libraryPermissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const handleAddPhoto = async (remove: boolean) => {
    if (remove) {
      onChange(null);
      return;
    }

    Alert.alert("", "Do you want to take a new photo or select from library?", [
      { text: "Take Photo", onPress: () => takePhoto() },
      { text: "Choose from Library", onPress: () => chooseFromLibrary() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleAddPhoto(false)}
        style={{ width: size, height: size, borderRadius: radius }}
      >
        <Image
          style={[
            styles.image,
            { width: size, height: size, borderRadius: radius },
          ]}
          source={imageUri ? { uri: imageUri } : placeholder}
          resizeMode="cover"
        />
        <View style={styles.photoIndicator}>
          <IconCamera width={20} height={20} color={colors.white} />
        </View>
      </Pressable>
      <Text
        onPress={() => handleAddPhoto(imageUri !== null)}
        style={[
          styles.label,
          { color: imageUri ? colors["error-600"] : colors["primary-600"] },
        ]}
      >
        {imageUri == null ? "Add Photo" : "Remove Photo"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    backgroundColor: colors["grey-200"],
  },
  label: {
    marginTop: 12,
    ...typography.body.medium.bold,
  },
  photoIndicator: {
    backgroundColor: colors["primary-600"],
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: "50%",
    padding: 4,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

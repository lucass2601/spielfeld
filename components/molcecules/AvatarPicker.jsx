import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors, typography } from "@/theme/theme";

import placeholder from "@/assets/images/placeholder.png";
import IconCamera from "@/assets/icons/icon-camera.svg";

/**
 * Props:
 *   value    {string|null}  - current image URI
 *   onChange {function}     - called with new URI (string) or null on remove
 *   size     {number}       - circle diameter (default 88)
 */
export default function AvatarPicker({ value, onChange, size = 88 }) {
  const radius = size / 2;

  const pickImage = async (remove) => {
    if (remove) {
      onChange(null);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => pickImage(false)}
        style={{ width: size, height: size, borderRadius: radius }}
      >
        <Image
          style={[styles.image, { width: size, height: size, borderRadius: radius }]}
          source={value ? { uri: value } : placeholder}
          resizeMode="cover"
        />
        <View style={styles.photoIndicator}>
          <IconCamera width={20} height={20} color={colors.white} />
        </View>
      </Pressable>
      <Text
        onPress={() => pickImage(value)}
        style={[
          styles.label,
          { color: value ? colors["error-600"] : colors["primary-600"] },
        ]}
      >
        {value ? "Remove Photo" : "Add Photo"}
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

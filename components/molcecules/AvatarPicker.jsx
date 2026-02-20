import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors, typography } from "@/theme/theme";

/**
 * Props:
 *   value    {string|null}  - current image URI
 *   onChange {function}     - called with new URI (string)
 *   size     {number}       - circle diameter (default 88)
 */
export default function AvatarPicker({ value, onChange, size = 88 }) {
  const radius = size / 2;

  const pickImage = async () => {
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
        onPress={pickImage}
        style={{ width: size, height: size, borderRadius: radius, overflow: "hidden" }}
      >
        <Image
          style={[styles.image, { width: size, height: size, borderRadius: radius }]}
          source={{ uri: value }}
          resizeMode="cover"
        />
      </Pressable>
      <Text onPress={pickImage} style={styles.label}>
        {value ? "Change Photo" : "Add Photo"}
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
    color: colors["primary-600"],
    ...typography.body.medium.bold,
  },
});

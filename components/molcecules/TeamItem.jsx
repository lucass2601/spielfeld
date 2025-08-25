import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import defaultImage from "@/assets/images/icon.png";

import { colors } from "@/theme/theme";

const TeamItem = ({ onPress, imageUri, name }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Image
          style={styles.teamIcon}
          source={imageUri ? { uri: imageUri } : defaultImage}
        />
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
};

export default TeamItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors["grey-100"],
  },
  teamIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  styleAnimation: { justifyContent: "center", alignItems: "center" },
  rightAction: {
    width: 50,
    height: "100%",
    backgroundColor: colors["error-600"],
    justifyContent: "center",
    alignItems: "center",
  },
});

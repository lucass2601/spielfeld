import { StyleSheet, Text, View, Pressable } from "react-native";

import { colors, typography } from "@/theme/theme";

const CustomizationTile = ({ title, icon, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.tileContainer}>
      <View style={{ gap: 12 }}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text
          style={{
            color: colors["primary-600"],
            ...typography.body.medium.semibold,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomizationTile;

const styles = StyleSheet.create({
  tileContainer: {
    width: "48%",
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.white,
  },
});

import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MatchEventTile = ({ icon, label, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.eventTile, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MatchEventTile;

const styles = StyleSheet.create({
  eventTile: {
    backgroundColor: colors["grey-50"],
    borderColor: colors["grey-100"],
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    gap: 4,
  },
  iconContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  icon: {
    ...typography.headings.h6,
  },
  label: {
    ...typography.body.medium.semibold,
    color: colors["primary-600"],
  },
});

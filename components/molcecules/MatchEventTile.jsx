import { colors, typography } from "@/theme/theme";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const MatchEventTile = ({ icon, label, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.liveColumn, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon]}>{icon}</Text>
      <Text style={[styles.label]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MatchEventTile;

const styles = StyleSheet.create({
  liveColumn: {
    backgroundColor: colors["grey-50"],
    borderColor: colors["grey-200"],
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 80,
  },
  icon: {
    fontSize: 24,
    marginBottom: 6,
    textAlign: "center",
  },
  label: {
    ...typography.body.small.medium,
    color: colors["grey-700"],
    textAlign: "center",
  },
});

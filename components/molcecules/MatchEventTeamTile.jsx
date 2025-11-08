import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const MatchEventTeamTile = ({ team, onPress, active = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tileContainer, active && styles.tileActive]}
    >
      <Image style={styles.tileImage} source={{ uri: team.imageUri }} />
      <View style={styles.tileContent}>
        <Text style={styles.tileText}>{team.name}</Text>
        <Text style={styles.tileSubtext}>Home</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MatchEventTeamTile;

const styles = new StyleSheet.create({
  tileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: colors["grey-100"],
    borderRadius: 12,
    gap: 4,
  },
  tileActive: {
    borderWidth: 2,
    borderColor: colors["primary-600"],
  },
  tileImage: {
    width: 44,
    height: 44,
    borderRadius: "50%",
  },
  tileContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    ...typography.body.medium.bold,
  },
  tileSubtext: {
    ...typography.body.small.medium,
    color: colors["grey-400"],
  },
});

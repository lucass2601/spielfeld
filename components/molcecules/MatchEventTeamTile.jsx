import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Avatar from "@/components/atoms/Avatar";

const MatchEventTeamTile = ({ team, onPress, active = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tileContainer, active && styles.tileActive]}
    >
      <Avatar uri={team.imageUri} type="team" style={styles.tileImage} />
      <View style={styles.tileContent}>
        <Text style={styles.tileText} numberOfLines={1}>{team.name}</Text>
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
    width: "100%",
  },
  tileText: {
    ...typography.body.medium.bold,
    textAlign: "center",
  },
  tileSubtext: {
    ...typography.body.small.medium,
    color: colors["grey-400"],
  },
});

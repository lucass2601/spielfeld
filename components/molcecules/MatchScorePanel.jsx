import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "@/theme/theme";
import Avatar from "@/components/atoms/Avatar";

const MatchScorePanel = ({ teamA, teamB, scoreA, scoreB }) => {
  return (
    <View style={styles.scoreContainer}>
      <View style={styles.playerContainer}>
        <Avatar uri={teamA.imageUri} type="team" style={styles.playerImage} />
        <View style={styles.playerText}>
          <Text style={styles.playerName} numberOfLines={1}>
            {teamA.name}
          </Text>
          <Text style={styles.side}>Home</Text>
        </View>
      </View>

      <View style={styles.score}>
        <Text style={styles.scoreText}>
          {scoreA}:{scoreB}
        </Text>
      </View>

      <View style={styles.playerContainer}>
        <Avatar uri={teamB.imageUri} type="team" style={styles.playerImage} />
        <View style={styles.playerText}>
          <Text style={styles.playerName} numberOfLines={1}>
            {teamB.name}
          </Text>
          <Text style={styles.side}>Away</Text>
        </View>
      </View>
    </View>
  );
};

export default MatchScorePanel;

const styles = StyleSheet.create({
  scoreContainer: {
    paddingVertical: 20,
    flexDirection: "row",
  },
  playerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  playerText: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  playerName: {
    ...typography.body.medium.bold,
    textAlign: "center",
  },
  side: {
    ...typography.body.small.medium,
    color: colors["grey-400"],
  },
  score: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  scoreText: {
    ...typography.headings.h2,
  },
  playerImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
});
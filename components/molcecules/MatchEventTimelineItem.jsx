import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MatchEventTimelineItem = ({ player, minute, onPress, isHome }) => {
  const eventContent = (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isHome ? styles.cardHome : styles.cardAway]}
    >
      <Text
        style={[styles.playerName, isHome && styles.textRight]}
        numberOfLines={1}
      >
        {player ? player.name : "Unknown Player"}
      </Text>
      <Text style={[styles.eventMeta, isHome && styles.textRight]}>
        ⚽ Goal ({minute}')
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.row}>
      <View style={styles.side}>{isHome ? eventContent : null}</View>
      <View style={styles.centerColumn}>
        <View style={styles.line} />
      </View>
      <View style={styles.side}>{!isHome ? eventContent : null}</View>
    </View>
  );
};

export default MatchEventTimelineItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 64,
  },
  side: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
  },
  card: {
    gap: 2,
  },
  cardHome: {
    paddingRight: 12,
    alignItems: "flex-end",
  },
  cardAway: {
    paddingLeft: 12,
    alignItems: "flex-start",
  },
  centerColumn: {
    width: 40,
    alignItems: "center",
  },
  line: {
    flex: 1,
    width: 1,
    backgroundColor: colors["grey-200"],
  },
  textRight: {
    textAlign: "right",
  },
  playerName: {
    ...typography.body.small.bold,
  },
  eventMeta: {
    ...typography.body.small.regular,
    color: colors["grey-400"],
  },
});

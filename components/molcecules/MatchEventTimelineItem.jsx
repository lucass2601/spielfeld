import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import IconClose from "@/assets/icons/icon-close.svg";

const placeholderImage = require("@/assets/images/icon.png");

const MatchEventTimelineItem = ({ icon, label, style, onPress }) => {
  return (
    <View style={styles.timelineItemContainer}>
      <View style={styles.timelineEventType}>
        <Text style={styles.timelineEventTypeTitle}>⚽</Text>
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineEvent}>Goal!</Text>
        <View style={styles.timelinePlayer}>
          <Image style={styles.playerImage} source={placeholderImage} />
          <Text style={styles.playerName}>Lucas Fischer</Text>
        </View>
      </View>
      <View>
        <Text style={styles.timelineTimestamp}>'12</Text>
      </View>
    </View>
  );
};

export default MatchEventTimelineItem;

const styles = StyleSheet.create({
  timelineItemContainer: {
    borderWidth: 1,
    borderColor: colors["grey-200"],
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    gap: 12,
  },
  timelineEventType: {
    borderRadius: 12,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["grey-50"],
  },
  timelineEventTypeTitle: {
    ...typography.headings.h6,
  },
  timelineContent: {
    flex: 1,
    gap: 4,
  },
  timelineTimestamp: {
    ...typography.body.medium.bold,
  },
  timelineEvent: {
    ...typography.body.small.bold,
    color: colors["grey-400"],
  },
  timelinePlayer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  playerImage: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  playerName: {
    ...typography.body.small.bold,
  },
});

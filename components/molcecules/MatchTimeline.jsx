import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors, typography } from "@/theme/theme";
import MatchEventTimelineItem from "@/components/molcecules/MatchEventTimelineItem";

const MatchTimeline = ({ events, teamA, getPlayerData, onPressEvent }) => {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Recent Events</Text>
      <ScrollView>
        {events.length === 0 ? (
          <Text style={styles.emptyTimeline}>No events yet</Text>
        ) : (
          events.map((event) => (
            <MatchEventTimelineItem
              key={event.id}
              onPress={onPressEvent ? () => onPressEvent(event) : undefined}
              isHome={event.team_id === teamA.id}
              player={
                event.player_id
                  ? getPlayerData(event.team_id, event.player_id)
                  : null
              }
              minute={event.minute}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MatchTimeline;

const styles = StyleSheet.create({
  timelineContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
    flex: 1,
  },
  timelineTitle: {
    ...typography.body.medium.semibold,
    paddingBottom: 16,
  },
  emptyTimeline: {
    ...typography.body.medium.regular,
    color: colors["grey-400"],
    textAlign: "center",
    marginTop: 24,
  },
});

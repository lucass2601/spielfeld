import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { colors, typography } from "@/theme/theme";
import { formatDateTime } from "@/utils/dateUtils";

const TournamentScheduleItem = ({
  onPress,
  matchday,
  participantType,
  match,
}) => {
  console.log(typeof match.match_date);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            match.participant_home?.imageUri
              ? { uri: match.participant_home.imageUri }
              : require("@/assets/images/icon.png")
          }
        />
        <Text style={styles.imageText}>
          {match.participant_home
            ? match.participant_home.label
            : participantType === "players"
            ? "No Player"
            : "No Team"}
        </Text>
      </View>
      <View style={{ justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[
              typography.body.small.medium,
              { color: colors["grey-400"] },
            ]}
          >
            {match.match_date
              ? formatDateTime(new Date(match.match_date).toISOString())
              : "No Date"}
          </Text>
          <Text
            style={[
              typography.body.small.medium,
              { color: colors["grey-900"] },
            ]}
          >
            {match.match_title ? match.match_title : `Matchday ${matchday}`}
          </Text>
        </View>
        <View>
          <Text style={typography.body.xlarge.bold}>vs</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            match.participant_away?.imageUri
              ? { uri: match.participant_away.imageUri }
              : require("@/assets/images/icon.png")
          }
        />
        <Text style={styles.imageText}>
          {match.participant_away
            ? match.participant_away.label
            : participantType === "players"
            ? "No Player"
            : "No Team"}
        </Text>
      </View>
    </Pressable>
  );
};

export default TournamentScheduleItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors["grey-50"],
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
  },
  imageContainer: {
    gap: 6,
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  imageText: {
    color: colors["grey-900"],
    ...typography.body.small.semibold,
  },
});

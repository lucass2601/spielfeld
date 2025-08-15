import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { colors, typography } from "@/theme/theme";

const RoundItem = ({ round, index }) => {
  const teamAId = round.teamA ? round.teamA.id : null;
  const teamAName = round.teamA ? round.teamA.name : "BYE";
  const teamAImageUri =
    round.teamA && round.teamA.imageUri ? round.teamA.imageUri : null;

  const teamBId = round.teamB ? round.teamB.id : null;
  const teamBName = round.teamB ? round.teamB.name : "BYE";
  const teamBImageUri =
    round.teamB && round.teamB.imageUri ? round.teamB.imageUri : null;

  const placeholderImage = require("@/assets/images/icon.png");

  // TODO: If matches are generated, all the teams within the matches dataset lose track of updates

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={teamAImageUri ? { uri: teamAImageUri } : placeholderImage}
        />
        <Text style={styles.imageText}>{teamAName}</Text>
      </View>
      <View style={{ justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[
              typography.body.small.medium,
              { color: colors["grey-900"] },
            ]}
          >
            {`Round ${index + 1}`}
          </Text>
        </View>
        <View>
          <Text style={typography.body.xlarge.bold}>vs</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={teamBImageUri ? { uri: teamBImageUri } : placeholderImage}
        />
        <Text style={styles.imageText}>{teamBName}</Text>
      </View>
    </View>
  );
};

export default RoundItem;

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

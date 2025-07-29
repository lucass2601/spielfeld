import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { colors, typography } from "@/theme/theme";
import { formatDateTime } from "@/utils/dateUtils";

const RoundItem = ({ round, index }) => {
  const teamAName = round.teamA ? round.teamA.name : "BYE";
  const teamBName = round.teamB ? round.teamB.name : "BYE";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/icon.png")}
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
          source={require("@/assets/images/icon.png")}
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

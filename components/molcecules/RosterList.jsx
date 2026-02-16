import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

import IconAdd from "@/assets/icons/icon-add.svg";

import defaultImage from "@/assets/images/icon.png";

import { colors, typography } from "@/theme/theme";

const RosterList = ({ roster, onPlayerAdd, onPlayerPress }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.rosterContainer}
    >
      <TouchableOpacity onPress={onPlayerAdd} style={styles.addRoster}>
        <View style={styles.addRosterButton}>
          <IconAdd height={24} width={24} color={colors["grey-900"]} />
        </View>
        <Text
          style={[
            { ...typography.body.medium.medium, color: colors["primary-600"] },
          ]}
        >
          Add Player
        </Text>
      </TouchableOpacity>
      {roster.map((player) => (
        <TouchableOpacity
          onPress={() => onPlayerPress(player.id)}
          style={styles.player}
          key={player.id}
        >
          <Image
            style={styles.cover}
            source={player.imageUri ? { uri: player.imageUri } : defaultImage}
          />

          <Text style={styles.playerName}>{player.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  rosterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
  },
  addRoster: {
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "25%",
    gap: 12,
  },
  addRosterButton: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-200"],
    justifyContent: "center",
    alignItems: "center",
  },
  player: {
    flexBasis: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  playerName: {
    marginTop: 12,
    ...typography.body.medium.medium,
  },
});

export default RosterList;

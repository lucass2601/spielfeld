import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { colors, typography } from "@/theme/theme";

import tournamentPlaceholder from "@/assets/images/tournament-placeholder.png";

const tournamentSportDefinitions = {
  null: "No Sport",
  football: "Football",
};

import { formatDateTime } from "@/utils/dateUtils";

const TournamentItem = ({
  imageUri,
  name = "Turniername",
  startDate,
  teams,
  sport,
  preview = false,
  onPress,
  style,
  ...props
}) => {
  const tournamentYear = startDate ? new Date(startDate).getFullYear() : null;
  const currentYear = new Date().getFullYear();
  const dateFormat =
    tournamentYear && tournamentYear !== currentYear ? "LLL d, yyyy" : "LLL d";

  return (
    <Pressable onPress={onPress} style={[styles.container, style]} {...props}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cover}
          source={imageUri ? { uri: imageUri } : tournamentPlaceholder}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.sport}>{tournamentSportDefinitions[sport]}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.time}>{formatDateTime(startDate, dateFormat)}</Text>
      </View>
    </Pressable>
  );
};

export default TournamentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["grey-50"],
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cover: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  sport: {
    color: colors["grey-400"],
    ...typography.body.small.semibold,
  },
  name: {
    color: colors["grey-900"],
    ...typography.body.medium.bold,
  },
  time: {
    color: colors["grey-400"],
    ...typography.body.small.regular,
  },
});

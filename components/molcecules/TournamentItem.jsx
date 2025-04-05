import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { colors, typography } from "@/theme/theme";

import IconClock from "@/assets/icons/icon-clock.svg";
import IconUser from "@/assets/icons/icon-user.svg";

const tournamentTypeDefinitions = {
  knockout: "Knockout",
  roundrobin: "League",
};

const tournamentStatusDefinitions = {
  pending: "Pending",
  active: "Active",
  completed: "Completed",
};

import { formatDateTime } from "@/utils/dateUtils";

const TournamentItem = ({
  imageUri,
  name = "Turniername",
  startDate,
  participants,
  type = "Knockout",
  preview = false,
  status,
  onPress,
  style,
  ...props
}) => {
  const formattedDate = formatDateTime(startDate, "LLL d");
  const formattedTime = formatDateTime(startDate, "t");

  return (
    <Pressable onPress={onPress} style={[styles.container, style]} {...props}>
      <View style={styles.header}>
        <Image
          style={styles.cover}
          source={
            imageUri ? { uri: imageUri } : require("@/assets/images/icon.png")
          }
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.dateTimeContainer}>
            <IconClock width={16} height={16} color={colors["grey-500"]} />
            <Text style={styles.date_time}>{formattedDate}</Text>
            <View style={styles.ellipse}></View>
            <Text style={styles.date_time}>{formattedTime}</Text>
          </View>
        </View>
      </View>

      {!preview && (
        <View style={styles.footer}>
          <View style={styles.statsContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconUser width={14} height={14} color={colors["grey-500"]} />
              <Text
                style={[styles.participantCount, styles.statsContainerText]}
              >
                {participants.length}
              </Text>
            </View>
            <View style={styles.ellipse}></View>
            <Text style={[styles.tournamentType, styles.statsContainerText]}>
              {tournamentTypeDefinitions[type]}
            </Text>
          </View>
          <Text style={[styles.status, styles[`status__${status}`]]}>
            {tournamentStatusDefinitions[status]}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default TournamentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["grey-50"],
    borderRadius: 12,
    padding: 16,
    gap: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: colors["grey-200"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  cover: {
    height: 48,
    width: 48,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    ...typography.body.medium.bold,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  date_time: {
    ...typography.body.small.regular,
    color: colors["grey-500"],
  },
  statsContainerText: {
    color: colors["grey-400"],
    ...typography.body.small.medium,
  },
  status: {
    ...typography.body.small.bold,
    color: colors["grey-400"],
  },
  status__active: {
    color: colors["primary-600"],
  },
  status__completed: {
    color: colors["error-600"],
  },
  ellipse: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors["grey-500"],
    marginVertical: "auto",
  },
});

import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";
import useTournamentStore from "@/store/useTournamentStore";
import { useGlobalSearchParams } from "expo-router";

const MatchItem = ({ match, index, onPress }) => {
  const { tournament_id } = useGlobalSearchParams();
  const getTeam = useTournamentStore((state) => state.getTeam);

  const getTeamData = (team_id) => {
    return team_id ? getTeam(tournament_id, team_id) : null;
  };

  const teamA = getTeamData(match.teamA);
  const teamB = getTeamData(match.teamB);

  const isDraw = Boolean(match.isDraw);
  const isFinished = match.status === "finished";

  const placeholderImage = require("@/assets/images/icon.png");

  const statusStyles = getStatusStyles(match.status);

  const winnerA = isFinished && !isDraw && match.winnerId === match.teamA;
  const winnerB = isFinished && !isDraw && match.winnerId === match.teamB;

  const teamABYE = !teamA;
  const teamBBYE = !teamB;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      <View style={[styles.teamCol, teamABYE && styles.dimmed]}>
        <View style={[styles.avatarWrap, winnerA && styles.winnerRing]}>
          <Image
            style={styles.avatar}
            source={
              teamA?.imageUri ? { uri: teamA.imageUri } : placeholderImage
            }
          />
        </View>
        <Text
          style={[
            styles.teamName,
            !winnerA && isFinished && !isDraw && styles.loserText,
          ]}
          numberOfLines={1}
        >
          {teamA?.name || "BYE"}
        </Text>
        <View
          style={[
            styles.scoreChip,
            match.status === "scheduled" && styles.scoreChipInactive,
          ]}
        >
          <Text style={styles.scoreText}>
            {isNaN(Number(match.teamAScore ?? 0))
              ? 0
              : Number(match.teamAScore ?? 0)}
          </Text>
        </View>
      </View>

      <View style={styles.centerCol}>
        <View style={[styles.statusPill, { backgroundColor: statusStyles.bg }]}>
          <Text style={[styles.statusText, { color: statusStyles.fg }]}>
            {statusStyles.label}
          </Text>
        </View>
        <Text style={styles.matchLabel}>{`Match ${index + 1}`}</Text>
        <Text style={styles.vsOrDash}>{shouldShowVs(match) ? "vs" : "—"}</Text>
      </View>

      <View style={[styles.teamCol, teamBBYE && styles.dimmed]}>
        <View style={[styles.avatarWrap, winnerB && styles.winnerRing]}>
          <Image
            style={styles.avatar}
            source={
              teamB?.imageUri ? { uri: teamB.imageUri } : placeholderImage
            }
          />
        </View>
        <Text
          style={[
            styles.teamName,
            !winnerB && isFinished && !isDraw && styles.loserText,
          ]}
          numberOfLines={1}
        >
          {teamB?.name || "BYE"}
        </Text>
        <View
          style={[
            styles.scoreChip,
            match.status === "scheduled" && styles.scoreChipInactive,
          ]}
        >
          <Text style={styles.scoreText}>
            {isNaN(Number(match.teamBScore ?? 0))
              ? 0
              : Number(match.teamBScore ?? 0)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MatchItem;

const shouldShowVs = (match) => {
  const a = Number(match.teamAScore ?? 0);
  const b = Number(match.teamBScore ?? 0);
  return a === 0 && b === 0;
};

const getStatusStyles = (status) => {
  switch (status) {
    case "live":
      return { label: "Live", bg: colors["error-500"], fg: colors.white };
    case "finished":
      return {
        label: "Completed",
        bg: colors["primary-100"],
        fg: colors["primary-600"],
      };
    case "scheduled":
    default:
      return {
        label: "Scheduled",
        bg: colors["grey-100"],
        fg: colors["grey-600"],
      };
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  containerPressed: {
    backgroundColor: colors["grey-50"],
  },
  teamCol: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  avatarWrap: {
    padding: 2,
    borderRadius: 10,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 8,
    backgroundColor: colors["grey-100"],
  },
  teamName: {
    color: colors["grey-900"],
    textAlign: "center",
    ...typography.body.small.semibold,
  },
  loserText: {
    color: colors["grey-400"],
  },
  scoreChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors["grey-900"],
  },
  scoreChipInactive: {
    backgroundColor: colors["grey-200"],
  },
  scoreText: {
    ...typography.body.small.bold,
    color: colors.white,
  },
  centerCol: {
    width: 96,
    alignItems: "center",
    gap: 6,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    ...typography.body.small.medium,
  },
  matchLabel: {
    ...typography.body.small.medium,
    color: colors["grey-500"],
  },
  vsOrDash: {
    ...typography.body.large.bold,
    color: colors["grey-900"],
  },
  dimmed: {
    opacity: 0.6,
  },
  winnerRing: {
    borderWidth: 2,
    borderColor: colors["primary-600"],
  },
});

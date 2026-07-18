import { memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";

import Avatar from "@/components/atoms/Avatar";

import { Match, MatchStatus } from "@/types/match";
import { Team } from "@/types/team";

const MatchItem = ({
  match,
  teamsById,
  title,
  onPress,
  teamAFallbackName,
  teamBFallbackName,
}: {
  match: Match;
  teamsById: Map<Team["id"], Team>;
  title: string;
  onPress: (match_id: Match["id"]) => void;
  teamAFallbackName?: string;
  teamBFallbackName?: string;
}) => {
  const teamA = match?.teamA ? teamsById.get(match.teamA) : undefined;
  const teamB = match?.teamB ? teamsById.get(match.teamB) : undefined;

  const isDraw = Boolean(match.isDraw);
  const isFinished = match.status === MatchStatus.FINISHED;

  const teamAName = teamA ? teamA?.name : (teamAFallbackName ?? "BYE");
  const teamBName = teamB ? teamB?.name : (teamBFallbackName ?? "BYE");

  const teamAImage = teamA ? teamA?.imageUri : null;
  const teamBImage = teamB ? teamB?.imageUri : null;

  const scoreA = match.teamAScore;
  const scoreB = match.teamBScore;

  const winnerA = isFinished && !isDraw && match.winnerId === match.teamA;
  const winnerB = isFinished && !isDraw && match.winnerId === match.teamB;

  const teamABYE = !teamA;
  const teamBBYE = !teamB;

  return (
    <Pressable
      onPress={teamABYE || teamBBYE ? undefined : () => onPress(match.id)}
      disabled={teamABYE || teamBBYE}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.teamCol}>
          {teamA && <Avatar uri={teamAImage} type="team" style={styles.avatar} />}
          <Text
            style={[styles.teamName, winnerB && styles.teamNameLoser]}
            numberOfLines={1}
          >
            {teamAName}
          </Text>
        </View>

        <View style={styles.centerScore}>
          {scoreA !== null && (
            <Text style={[styles.score, winnerB && styles.scoreLoser]}>
              {scoreA}
            </Text>
          )}

          <Text style={styles.vs}>vs</Text>

          {scoreB !== null && (
            <Text style={[styles.score, winnerA && styles.scoreLoser]}>
              {scoreB}
            </Text>
          )}
        </View>

        <View style={styles.teamCol}>
          {teamB && <Avatar uri={teamBImage} type="team" style={styles.avatar} />}
          <Text
            style={[styles.teamName, winnerA && styles.teamNameLoser]}
            numberOfLines={1}
          >
            {teamBName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(MatchItem);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors["grey-100"],
    gap: 16,
  },
  containerPressed: {
    backgroundColor: colors["grey-50"],
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    ...typography.body.small.medium,
    color: colors["grey-500"],
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 76,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 8,
    backgroundColor: colors["grey-100"],
  },
  teamName: {
    color: colors["grey-600"],
    textAlign: "center",
    ...typography.body.small.medium,
  },
  teamNameLoser: {
    color: colors["grey-300"],
  },
  centerScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  score: {
    ...typography.headings.h3,
    color: colors["grey-900"],
  },
  scoreLoser: {
    color: colors["grey-300"],
  },
  vs: {
    ...typography.body.medium.medium,
    color: colors["grey-500"],
  },
});

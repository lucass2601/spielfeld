import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";

import Avatar from "@/components/atoms/Avatar";

import useTournamentStore from "@/store/useTournamentStore";

import { useGlobalSearchParams } from "expo-router";
import { Match, MatchStatus } from "@/types/match";
import { Team } from "@/types/team";
import { Tournament } from "@/types/tournament";

const BracketMatchItem = ({
  height,
  width,
  match,
  teamAFallbackName,
  teamBFallbackName,
}: {
  height: number;
  width: number;
  match: Match;
  teamAFallbackName?: string;
  teamBFallbackName?: string;
}) => {
  const { tournament_id } = useGlobalSearchParams<{
    tournament_id?: Tournament["id"];
  }>();

  const getTeam = useTournamentStore((state) => state.getTeam);

  const getTeamData = (team_id: Team["id"]) => {
    if (!tournament_id || !team_id) return;

    return getTeam(tournament_id, team_id);
  };

  const teamA = match?.teamA && getTeamData(match.teamA);
  const teamB = match?.teamB && getTeamData(match.teamB);

  const isFinished = match.status === MatchStatus.FINISHED;
  const isDraw = Boolean(match.isDraw);

  const teamAName = teamA ? teamA.name : (teamAFallbackName ?? "TBD");
  const teamBName = teamB ? teamB.name : (teamBFallbackName ?? "TBD");

  const teamAImage = teamA ? teamA.imageUri : null;
  const teamBImage = teamB ? teamB.imageUri : null;

  const winnerA = isFinished && !isDraw && match.winnerId === match.teamA;
  const winnerB = isFinished && !isDraw && match.winnerId === match.teamB;

  const teamABYE = !teamA;
  const teamBBYE = !teamB;

  return (
    <Pressable
      disabled={teamABYE || teamBBYE}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        { width, height },
      ]}
    >
      <View
        style={[
          styles.teamRow,
          winnerA && styles.teamRowWinner,
          { height: height / 2 },
        ]}
      >
        {teamA && <Avatar uri={teamAImage} type="team" style={styles.avatar} />}
        <Text
          style={[styles.teamName, winnerB && styles.loserText]}
          numberOfLines={1}
        >
          {teamAName}
        </Text>
        {isFinished && (
          <Text style={[styles.score, winnerB && styles.loserText]}>
            {match.teamAScore}
          </Text>
        )}
      </View>

      <View style={styles.divider} />

      <View
        style={[
          styles.teamRow,
          winnerB && styles.teamRowWinner,
          { height: height / 2 },
        ]}
      >
        {teamB && <Avatar uri={teamBImage} type="team" style={styles.avatar} />}
        <Text
          style={[styles.teamName, winnerA && styles.loserText]}
          numberOfLines={1}
        >
          {teamBName}
        </Text>
        {isFinished && (
          <Text style={[styles.score, winnerA && styles.loserText]}>
            {match.teamBScore}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default BracketMatchItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors["grey-200"],
    overflow: "hidden",
  },
  containerPressed: {
    backgroundColor: colors["grey-50"],
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
  },
  teamRowWinner: {
    backgroundColor: colors["primary-100"],
  },
  divider: {
    height: 1,
    backgroundColor: colors["grey-200"],
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 4,
  },
  teamName: {
    flex: 1,
    ...typography.body.small.medium,
    color: colors["grey-700"],
  },
  score: {
    ...typography.body.small.bold,
    color: colors["grey-900"],
    minWidth: 20,
    textAlign: "right",
  },
  loserText: {
    color: colors["grey-300"],
  },
});

import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";
import useTournamentStore from "@/store/useTournamentStore";
import { useGlobalSearchParams } from "expo-router";

const RoundItem = ({ round, index, onPress }) => {
  const { tournament_id } = useGlobalSearchParams();
  const getTeam = useTournamentStore((state) => state.getTeam);

  const getTeamData = (team_id) => {
    return getTeam(tournament_id, team_id);
  };

  const teamAName = round.teamA ? getTeamData(round.teamA).name : "BYE";
  const teamAImageUri = round.teamA ? getTeamData(round.teamA).imageUri : null;

  const teamBName = round.teamB ? getTeamData(round.teamB).name : "BYE";
  const teamBImageUri = round.teamB ? getTeamData(round.teamB).imageUri : null;

  const placeholderImage = require("@/assets/images/icon.png");

  return (
    <Pressable onPress={onPress} style={styles.container}>
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
    </Pressable>
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

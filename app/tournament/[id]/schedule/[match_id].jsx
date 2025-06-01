import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import Dropdown from "@/components/molcecules/Dropdown";
import useTournamentStore from "@/store/useTournamentStore";

import { colors, typography } from "@/theme/theme";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MatchDetails = () => {
  const { id, match_id } = useLocalSearchParams();
  const tournament = useTournamentStore((state) => state.getTournament(id));

  const getParticipant = (participant_id) =>
    useTournamentStore((state) => state.getParticipant(participant_id));

  const getTournamentMatch = tournament.schedule
    .map((schedule) => schedule.matches)
    .flat()
    .find((match) => match.match_id === match_id);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <AppBar title="Edit Match" />
        <ScreenContainer>
          <Text style={typography.body.medium.semibold}>Matchup</Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            <View>
              <Text
                style={[
                  { marginBottom: 8, color: colors["grey-400"] },
                  typography.body.small.semibold,
                ]}
              >
                Home
              </Text>
              <Dropdown
                modalTitle={
                  tournament.participantType === "players"
                    ? "Select Player"
                    : "Select Team"
                }
                data={[
                  {
                    label:
                      tournament.participantType === "players"
                        ? "No Player"
                        : "No Team",
                    value: null,
                  },
                  ...tournament.participants.map((participant) => {
                    return {
                      ...{
                        label: getParticipant(participant).name,
                        value: participant,
                        imageUri: getParticipant(participant).imageUri,
                      },
                    };
                  }),
                ]}
                onChange={console.log}
                placeholder={
                  tournament.participantType === "players"
                    ? "No Player"
                    : "No Team"
                }
              />
            </View>
            <View>
              <Text
                style={[
                  { marginBottom: 8, color: colors["grey-400"] },
                  typography.body.small.semibold,
                ]}
              >
                Away
              </Text>
              <Dropdown
                modalTitle={
                  tournament.participantType === "players"
                    ? "Select Player"
                    : "Select Team"
                }
                data={[
                  {
                    label:
                      tournament.participantType === "players"
                        ? "No Player"
                        : "No Team",
                    value: null,
                  },
                  ...tournament.participants.map((participant) => {
                    return {
                      ...{
                        label: getParticipant(participant).name,
                        value: participant,
                        imageUri: getParticipant(participant).imageUri,
                      },
                    };
                  }),
                ]}
                onChange={console.log}
                placeholder={
                  tournament.participantType === "players"
                    ? "No Player"
                    : "No Team"
                }
              />
            </View>
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MatchDetails;

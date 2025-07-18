import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import DateTimePickerInput from "@/components/molcecules/DateTimePickerInput";
import Dropdown from "@/components/molcecules/Dropdown";
import useTournamentStore from "@/store/useTournamentStore";

import { colors, typography } from "@/theme/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MatchDetails = () => {
  const { id, match_id } = useLocalSearchParams();
  const tournament = useTournamentStore((state) => state.getTournament(id));

  const getTournamentMatch = tournament.schedule
    .map((schedule) => schedule.matches)
    .flat()
    .find((match) => match.match_id === match_id);

  const [matchDetails, setMatchDetails] = useState({
    match_id: getTournamentMatch.match_id,
    participant_home: getTournamentMatch.participant_home || {
      label: null,
      value: null,
      imageUri: null,
    },
    participant_away: getTournamentMatch.participant_away || {
      label: null,
      value: null,
      imageUri: null,
    },
    match_title: getTournamentMatch.match_title || null,
    match_date: getTournamentMatch.match_date || null,
  });

  const getParticipant = (participant_id) =>
    useTournamentStore((state) => state.getParticipant(participant_id));

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
                value={matchDetails.participant_home}
                onChange={(selectedItem) =>
                  setMatchDetails({
                    ...matchDetails,
                    participant_home: selectedItem,
                  })
                }
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
                value={matchDetails.participant_away}
                onChange={(selectedItem) =>
                  setMatchDetails({
                    ...matchDetails,
                    participant_away: selectedItem,
                  })
                }
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
                placeholder={
                  tournament.participantType === "players"
                    ? "No Player"
                    : "No Team"
                }
              />
            </View>
            <View>
              <Input
                label="Name"
                value={matchDetails.match_title}
                onChangeText={(enteredText) =>
                  setMatchDetails({ ...matchDetails, match_title: enteredText })
                }
              />
            </View>
            <View>
              <DateTimePickerInput
                value={matchDetails.match_date}
                onChange={(newMatchDate) =>
                  setMatchDetails({ ...matchDetails, match_date: newMatchDate })
                }
                label="Date"
                placeholder="Select date for match"
                minDate={new Date()}
              />
            </View>
            <View>
              <Button
                label="Save Matchup"
                onPress={() => {
                  useTournamentStore.getState().updateMatch(id, matchDetails);
                  router.back();
                }}
              />
            </View>
          </View>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MatchDetails;

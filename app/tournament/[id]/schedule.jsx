import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import TournamentScheduleItem from "@/components/molcecules/TournamentScheduleItem";
import ScreenContainer from "@/components/layouts/ScreenContainer";

export default function ScheduleTab() {
  const { id } = useLocalSearchParams();
  const tournament = useTournamentStore((state) => state.getTournament(id));

  return (
    <ScreenContainer>
      <ScrollView>
        {/* <Text>{JSON.stringify(tournament.schedule)}</Text> */}
        {tournament.schedule.map((matchday, index) => (
          <View style={{ marginBottom: 24 }} key={matchday.matchday_id}>
            <Text
              style={[
                typography.body.medium.semibold,
                { color: colors["grey-500"] },
              ]}
            >
              Matchday {index + 1}
            </Text>
            {matchday.matches.map((match) => (
              <View key={match.match_id} style={{ marginTop: 12 }}>
                <TournamentScheduleItem matchday={index + 1} match={match} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

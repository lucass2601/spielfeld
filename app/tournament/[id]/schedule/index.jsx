import { View, Text, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import TournamentScheduleItem from "@/components/molcecules/TournamentScheduleItem";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import Button from "@/components/atoms/Button";
import { useRef } from "react";

export default function ScheduleTab() {
  const { id } = useLocalSearchParams();
  const tournament = useTournamentStore((state) => state.getTournament(id));

  const matchdays = tournament.schedule;

  const scrollViewRef = useRef(null);
  const matchdayRefs = useRef({});

  return (
    <ScreenContainer>
      <Text>Schedule Tab</Text>
      {/* <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {matchdays.map((matchday, index) => (
            <Button
              key={matchday.matchday_id}
              variant="tertiary"
              size="small"
              label={`Matchday ${index + 1}`}
              onPress={() => {
                const ref = matchdayRefs.current[index];

                if (ref && scrollViewRef.current) {
                  ref.measureLayout(
                    scrollViewRef.current,
                    (x, y) => {
                      scrollViewRef.current.scrollTo({ y, animated: true });
                    },
                    (error) => console.warn(error)
                  );
                }
              }}
            />
          ))}
        </ScrollView>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flex: 0 }}>
          {matchdays.map((matchday, index) => (
            <View
              ref={(el) => (matchdayRefs.current[index] = el)}
              style={{ marginBottom: 24 }}
              key={matchday.matchday_id}
            >
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
                  <TournamentScheduleItem
                    onPress={() =>
                      router.push(
                        `/tournament/${id}/schedule/${match.match_id}`
                      )
                    }
                    matchday={index + 1}
                    match={match}
                    participantType={tournament.participantType}
                  />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View> */}
    </ScreenContainer>
  );
}

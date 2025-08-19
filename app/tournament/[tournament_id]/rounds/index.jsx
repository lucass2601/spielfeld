import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useGlobalSearchParams, usePathname } from "expo-router";

import { colors, typography } from "@/theme/theme";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";
import Button from "@/components/atoms/Button";
import RoundItem from "@/components/molcecules/RoundItem";
import { useRef } from "react";

export default function RoundsTab() {
  const { tournament_id } = useGlobalSearchParams();
  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );

  const updateTournamentRounds = useTournamentStore(
    (state) => state.updateTournamentRounds
  );

  const handleRoundPress = (round_id) => {
    router.push(`${pathname}/${round_id}`);
  };

  const scrollViewRef = useRef(null);
  const matchdayRefs = useRef({});

  const labelForKnockout = (matchday) => {
    const m = matchday.rounds.length;
    if (m === 1) return "Final";
    if (m === 2) return "Semifinals";
    if (m === 4) return "Quarterfinals";

    return `Round of ${m * 2}`;
  };

  const isKnockout = tournament.type === "knockout";

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 24,
            gap: 12,
            flexDirection: "row",
          }}
        >
          {tournament.matchdays.map((matchday, index) => (
            <Button
              key={matchday.id}
              variant="tertiary"
              size="small"
              label={
                isKnockout
                  ? labelForKnockout(matchday)
                  : `Matchday ${index + 1}`
              }
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
        <ScrollView ref={scrollViewRef} horizontal={false}>
          {tournament.matchdays && !tournament.matchdays.length && (
            <Button
              variant="tertiary"
              label="Generate Rounds"
              onPress={() => updateTournamentRounds(tournament_id)}
            />
          )}

          {tournament.matchdays.map((matchday, matchday_index) => (
            <View
              ref={(el) => (matchdayRefs.current[matchday_index] = el)}
              style={{ marginBottom: 24 }}
              key={matchday.id}
            >
              <Text
                style={[
                  typography.body.medium.semibold,
                  { color: colors["grey-500"] },
                ]}
              >
                {isKnockout
                  ? labelForKnockout(matchday)
                  : `Matchday ${matchday_index + 1}`}
              </Text>
              {matchday.rounds.map((round, round_index) => {
                if (round.teamA && round.teamB) {
                  return (
                    <View key={round.id} style={{ marginTop: 12 }}>
                      <RoundItem
                        index={round_index}
                        round={round}
                        onPress={() => handleRoundPress(round.id)}
                      />
                    </View>
                  );
                }
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

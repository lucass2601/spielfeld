import { View, Text, StyleSheet, ScrollView, Modal, Alert } from "react-native";
import { useGlobalSearchParams, usePathname } from "expo-router";

import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";
import Button from "@/components/atoms/Button";
import MatchItem from "@/components/molcecules/MatchItem";
import MatchDetailsModal from "@/components/molcecules/MatchDetailsModal";

import { useRef, useState } from "react";

import MatchesIllustration from "@/assets/images/matches-illustration.svg";

export default function MatchesTab() {
  const { tournament_id } = useGlobalSearchParams();
  const pathname = usePathname();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const getMatch = useTournamentStore((state) => state.getMatch);

  const updateTournamentMatches = useTournamentStore(
    (state) => state.updateTournamentMatches,
  );

  const handleMatchPress = (match_id) => {
    const match = getMatch(tournament_id, match_id);

    // if (match.status === "finished") {
    //   if (pathname !== `/tournament/${tournament_id}/matches/${match.id}`) {
    //     router.push(`${pathname}/${match.id}`);
    //   }
    //   return;
    // }

    setSelectedMatch(match);
    setModalOpen(true);
  };

  const scrollViewRef = useRef(null);
  const matchdayRefs = useRef({});

  const labelForKnockout = (matchday) => {
    const m = matchday.matches.length;
    if (m === 1) return "Final";
    if (m === 2) return "Semifinals";
    if (m === 4) return "Quarterfinals";

    return `match of ${m * 2}`;
  };

  const isKnockout = tournament.format === "knockout";

  const handleGenerateMatches = () => {
    if ((tournament.teams?.length ?? 0) < 3) {
      Alert.alert(
        "Not enough teams",
        "You need at least 3 teams to generate matches. Add more teams first.",
      );
      return;
    }
    updateTournamentMatches(tournament_id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {tournament.matchdays && !tournament.matchdays.length ? (
        <View
          style={{
            flex: 1,
            marginTop: 128,
            alignItems: "center",
            gap: 32,
          }}
        >
          <MatchesIllustration width={120} height={120} />
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.headings.h3, textAlign: "center" }}>
              Matches
            </Text>
            <Text
              style={{
                ...typography.body.large.regular,
                textAlign: "center",
                color: colors["grey-500"],
              }}
            >
              No matches yet. Generate your matches to get started
            </Text>
          </View>
          <View style={{ width: "100%", paddingHorizontal: 24 }}>
            <Button
              onPress={handleGenerateMatches}
              size="large"
              label="Generate Matches"
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
              marginVertical: 24,
              paddingHorizontal: 24,
              flexDirection: "row",
            }}
          >
            <Modal
              visible={modalOpen}
              transparent
              animationType="fade"
              onRequestClose={() => setModalOpen(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <KeyboardAvoidingView behavior="padding">
                  <View
                    style={{
                      width: "100%",
                      height: 400,
                      backgroundColor: "white",
                      borderTopRightRadius: 35,
                      borderTopLeftRadius: 35,
                    }}
                  >
                    <MatchDetailsModal
                      match={selectedMatch}
                      onClose={() => setModalOpen(false)}
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
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
                      (error) => console.warn(error),
                    );
                  }
                }}
              />
            ))}
          </ScrollView>
          <ScrollView
            ref={scrollViewRef}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 24,
              flexBasis: "auto",
              backgroundColor: "white",
            }}
          >
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
                {matchday.matches
                  .filter((match) => match.teamA && match.teamB)
                  .map((match, match_index) => {
                    return (
                      <View key={match.id} style={{ marginTop: 12 }}>
                        <MatchItem
                          index={match_index}
                          match={match}
                          onPress={() => handleMatchPress(match.id)}
                        />
                      </View>
                    );
                  })}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

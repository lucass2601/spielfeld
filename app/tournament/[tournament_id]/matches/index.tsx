import { View, Text, ScrollView, Modal, Alert } from "react-native";
import { useGlobalSearchParams, router } from "expo-router";
import * as StoreReview from "expo-store-review";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";
import Button from "@/components/atoms/Button";
import MatchItem from "@/components/molcecules/MatchItem";
import MatchDetailsModal from "@/components/molcecules/MatchDetailsModal";
import RoundSelector from "@/components/molcecules/RoundSelector";

import { useEffect, useRef, useState } from "react";

import MatchesIllustration from "@/assets/images/matches-illustration.svg";
import { Match, Matchday, MatchStatus } from "@/types/match";
import { Tournament, TournamentFormat } from "@/types/tournament";
import getKnockoutRoundAbbrev from "@/utils/getKnockoutRoundAbbrev";
import getKnockoutRoundLabel from "@/utils/getKnockoutRoundLabel";

export default function MatchesTab() {
  const { tournament_id } = useGlobalSearchParams<{
    tournament_id: Tournament["id"];
  }>();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const roundRefs = useRef<Record<number, View | null>>({});

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const totalRounds = tournament?.matchdays.length || 0;

  const prevStatus = useRef(tournament?.status);

  const getMatch = useTournamentStore((state) => state.getMatch);

  const updateTournamentMatches = useTournamentStore(
    (state) => state.updateTournamentMatches,
  );

  useEffect(() => {
    if (
      tournament?.status === "completed" &&
      prevStatus.current !== "completed"
    ) {
      const handleStoreReview = async () => {
        if (!(await StoreReview.isAvailableAsync())) {
          return;
        }

        if (!(await StoreReview.hasAction())) {
          return;
        }

        await StoreReview.requestReview();
      };
      handleStoreReview();
    }
    prevStatus.current = tournament?.status;
  }, [tournament?.status]);

  const handleMatchPress = (match_id: Match["id"]) => {
    if (!match_id) return;

    const match = getMatch(tournament_id, match_id);
    if (!match) return;

    if (match?.status === MatchStatus.FINISHED) {
      router.push(`/tournament/${tournament_id}/matches/${match_id}`);
    } else {
      setSelectedMatch(match);
      setModalOpen(true);
    }
  };

  const handleGenerateMatches = () => {
    if (tournament?.teams && tournament?.teams?.length < 3) {
      Alert.alert(
        "Not enough teams",
        "You need at least 3 teams to generate matches. Add more teams first.",
      );
      return;
    }
    updateTournamentMatches(tournament_id);
  };

  const handleRoundSelect = (index: number) => {
    const ref = roundRefs.current[index];

    if (ref && scrollViewRef.current) {
      ref.measureLayout(
        scrollViewRef.current as unknown as Parameters<
          typeof ref.measureLayout
        >[0],
        (_, y) => {
          scrollViewRef.current!.scrollTo({ y, animated: true });
        },
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {!tournament?.matchdays.length ? (
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
          <View>
            <RoundSelector
              rounds={tournament?.matchdays}
              getLabel={(index) =>
                tournament?.format === TournamentFormat.KNOCKOUT
                  ? getKnockoutRoundLabel(index, tournament.matchdays.length)
                  : `Matchday ${index + 1}`
              }
              onSelect={handleRoundSelect}
            />
          </View>
          <Modal
            visible={modalOpen && selectedMatch !== null}
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
                    height: 480,
                    backgroundColor: "white",
                    borderTopRightRadius: 35,
                    borderTopLeftRadius: 35,
                  }}
                >
                  {selectedMatch && (
                    <MatchDetailsModal
                      match={selectedMatch}
                      onClose={() => setModalOpen(false)}
                    />
                  )}
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
          <ScrollView
            ref={scrollViewRef}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
            }}
          >
            {tournament.matchdays.map(
              (matchday: Matchday, matchday_index: number) => (
                <View
                  ref={(el: View) => {
                    roundRefs.current[matchday_index] = el;
                  }}
                  style={{ marginBottom: 24 }}
                  key={matchday.id}
                >
                  <Text
                    style={[
                      typography.body.medium.semibold,
                      { color: colors["grey-500"] },
                    ]}
                  >
                    {tournament.format === TournamentFormat.KNOCKOUT
                      ? getKnockoutRoundLabel(
                          matchday_index,
                          tournament.matchdays.length,
                        )
                      : `Matchday ${matchday_index + 1}`}
                  </Text>

                  {matchday.matches
                    .filter((match: Match) =>
                      tournament.format === TournamentFormat.ROUND_ROBIN
                        ? match.teamA && match.teamB
                        : tournament.format === TournamentFormat.KNOCKOUT
                          ? matchday_index === 0
                            ? match.teamA && match.teamB
                            : true
                          : false,
                    )
                    .map((match: Match, match_index: number) => {
                      const isValidForFallbackName =
                        tournament.format === TournamentFormat.KNOCKOUT &&
                        totalRounds > 0 &&
                        matchday_index > 0;

                      return (
                        <View key={match.id} style={{ marginTop: 12 }}>
                          <MatchItem
                            match={match}
                            title={`Match ${match_index + 1}`}
                            onPress={() => handleMatchPress(match.id)}
                            teamAFallbackName={
                              isValidForFallbackName
                                ? `Winner of ${getKnockoutRoundAbbrev(matchday_index - 1, totalRounds)}${match_index * 2 + 1}`
                                : `BYE`
                            }
                            teamBFallbackName={
                              isValidForFallbackName
                                ? `Winner of ${getKnockoutRoundAbbrev(matchday_index - 1, totalRounds)}${match_index * 2 + 2}`
                                : `BYE`
                            }
                          />
                        </View>
                      );
                    })}
                </View>
              ),
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

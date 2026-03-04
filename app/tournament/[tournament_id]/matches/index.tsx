import { View, Text, ScrollView, Modal, Alert } from "react-native";
import { useGlobalSearchParams } from "expo-router";
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

export default function MatchesTab() {
  const { tournament_id } = useGlobalSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const getMatch = useTournamentStore((state) => state.getMatch);

  const updateTournamentMatches = useTournamentStore(
    (state) => state.updateTournamentMatches,
  );

  const prevStatus = useRef(tournament?.status);
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

  const handleMatchPress = (match_id: string) => {
    const match = getMatch(tournament_id, match_id);
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const roundRefs = useRef<Record<number, View | null>>({});

  if (!tournament) return null;

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
          <RoundSelector
            rounds={tournament.matchdays}
            getLabel={(index) => `Matchday ${index + 1}`}
            onSelect={handleRoundSelect}
          />
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
                  <MatchDetailsModal
                    match={selectedMatch}
                    onClose={() => setModalOpen(false)}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
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
            {tournament.matchdays.map(
              (matchday: any, matchday_index: number) => (
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
                    {`Matchday ${matchday_index + 1}`}
                  </Text>
                  {matchday.matches
                    .filter((match: any) => match.teamA && match.teamB)
                    .map((match: any, match_index: number) => {
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
              ),
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

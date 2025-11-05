import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useGlobalSearchParams, usePathname } from "expo-router";

import { colors, typography } from "@/theme/theme";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";
import Button from "@/components/atoms/Button";
import MatchItem from "@/components/molcecules/MatchItem";
import MatchDetailsModal from "@/components/molcecules/MatchDetailsModal";

import { useRef, useState } from "react";

export default function MatchesTab() {
  const { tournament_id } = useGlobalSearchParams();
  const pathname = usePathname();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );

  const getMatch = useTournamentStore((state) => state.getMatch);

  const updateTournamentMatches = useTournamentStore(
    (state) => state.updateTournamentMatches
  );

  const handleMatchPress = (match_id) => {
    const match = getMatch(tournament_id, match_id);

    if (match.status === "finished") {
      if (pathname !== `/tournament/${tournament_id}/matches/${match.id}`) {
        router.push(`${pathname}/${match.id}`);
      }
      return;
    }

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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
            <KeyboardAvoidingView
              style={{ flex: 0, justifyContent: "flex-end" }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
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
              isKnockout ? labelForKnockout(matchday) : `Matchday ${index + 1}`
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
        {tournament.matchdays && !tournament.matchdays.length && (
          <Button
            variant="tertiary"
            label="Generate Matches"
            onPress={() => updateTournamentMatches(tournament_id)}
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
  );
}

const styles = StyleSheet.create({});

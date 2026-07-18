import { View, Text, SectionList, Modal, Alert } from "react-native";
import { useGlobalSearchParams, router } from "expo-router";
import * as StoreReview from "expo-store-review";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";
import Button from "@/components/atoms/Button";
import MatchItem from "@/components/molcecules/MatchItem";
import MatchDetailsModal from "@/components/molcecules/MatchDetailsModal";
import RoundSelector from "@/components/molcecules/RoundSelector";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import MatchesIllustration from "@/assets/images/matches-illustration.svg";
import { Match, Matchday, MatchStatus } from "@/types/match";
import { Tournament, TournamentFormat } from "@/types/tournament";
import { Team } from "@/types/team";
import getKnockoutRoundAbbrev from "@/utils/getKnockoutRoundAbbrev";
import getKnockoutRoundLabel from "@/utils/getKnockoutRoundLabel";

type MatchSection = {
  key: string;
  title: string;
  matchday_index: number;
  data: Match[];
};

export default function MatchesTab() {
  const { tournament_id } = useGlobalSearchParams<{
    tournament_id: Tournament["id"];
  }>();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const totalRounds = tournament?.matchdays.length || 0;

  const teamsById = useMemo(() => {
    const map = new Map<Team["id"], Team>();
    tournament?.teams.forEach((team) => map.set(team.id, team));
    return map;
  }, [tournament?.teams]);

  const matchdays = tournament?.matchdays;
  const format = tournament?.format;

  const sections: MatchSection[] = useMemo(() => {
    if (!matchdays) return [];

    return matchdays.map((matchday: Matchday, matchday_index) => ({
      key: matchday.id,
      matchday_index,
      title:
        format === TournamentFormat.KNOCKOUT
          ? getKnockoutRoundLabel(matchday_index, matchdays.length)
          : `Matchday ${matchday_index + 1}`,
      data: matchday.matches.filter((match: Match) =>
        format === TournamentFormat.ROUND_ROBIN
          ? match.teamA && match.teamB
          : format === TournamentFormat.KNOCKOUT
            ? matchday_index === 0
              ? match.teamA && match.teamB
              : true
            : false,
      ),
    }));
  }, [matchdays, format]);

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

  const handleMatchPress = useCallback(
    (match_id: Match["id"]) => {
      if (!match_id) return;

      const match = getMatch(tournament_id, match_id);
      if (!match) return;

      if (match?.status === MatchStatus.FINISHED) {
        router.push(`/tournament/${tournament_id}/matches/${match_id}`);
      } else {
        setSelectedMatch(match);
        setModalOpen(true);
      }
    },
    [tournament_id, getMatch],
  );

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

  const renderSectionHeader = useCallback(
    ({ section }: { section: MatchSection }) => (
      <Text
        style={[
          typography.body.medium.semibold,
          { color: colors["grey-500"] },
        ]}
      >
        {section.title}
      </Text>
    ),
    [],
  );

  const renderItem = useCallback(
    ({
      item: match,
      index: match_index,
      section,
    }: {
      item: Match;
      index: number;
      section: MatchSection;
    }) => {
      const isValidForFallbackName =
        format === TournamentFormat.KNOCKOUT &&
        totalRounds > 0 &&
        section.matchday_index > 0;

      return (
        <View style={{ marginTop: 12 }}>
          <MatchItem
            match={match}
            teamsById={teamsById}
            title={`Match ${match_index + 1}`}
            onPress={handleMatchPress}
            teamAFallbackName={
              isValidForFallbackName
                ? `Winner of ${getKnockoutRoundAbbrev(section.matchday_index - 1, totalRounds)}${match_index * 2 + 1}`
                : `BYE`
            }
            teamBFallbackName={
              isValidForFallbackName
                ? `Winner of ${getKnockoutRoundAbbrev(section.matchday_index - 1, totalRounds)}${match_index * 2 + 2}`
                : `BYE`
            }
          />
        </View>
      );
    },
    [format, totalRounds, teamsById, handleMatchPress],
  );

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
              getLabel={(index) => sections[index]?.title ?? ""}
              onSelect={() => {}} // jump-to-round scrolling not implemented yet, see SPI-63
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
          <SectionList
            sections={sections}
            keyExtractor={(match) => match.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={() => <View style={{ height: 24 }} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
            }}
          />
        </View>
      )}
    </View>
  );
}

import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

import IconClose from "@/assets/icons/icon-close.svg";
import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams, usePathname } from "expo-router";

const MatchDetailsModal = ({ match, onClose }) => {
  const { tournament_id } = useGlobalSearchParams();
  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );

  const updateTournamentMatchWinner = useTournamentStore(
    (state) => state.updateTournamentMatchWinner
  );

  const openLiveMatch = () => {
    if (pathname !== `/tournament/${tournament_id}/matches/${match.id}/live`) {
      onClose();
      router.push(`${pathname}/${match.id}/live`);
    }
  };

  const getTeam = useTournamentStore((state) => state.getTeam);

  const teamA = getTeam(tournament_id, match.teamA);
  const teamB = getTeam(tournament_id, match.teamB);

  const [scoreA, setScoreA] = useState(match.teamAScore || 0);
  const [scoreB, setScoreB] = useState(match.teamBScore || 0);

  const handlePickWinner = (scoreA, scoreB) => {
    let winner_id = null;
    let isDraw = false;

    if (scoreA > scoreB) {
      winner_id = teamA.id;
    } else if (scoreA < scoreB) {
      winner_id = teamB.id;
    } else {
      isDraw = true;
    }

    updateTournamentMatchWinner(
      tournament_id,
      match.id,
      winner_id,
      isDraw,
      scoreA,
      scoreB
    );

    onClose();
  };

  return (
    <View style={{ paddingHorizontal: 24, paddingVertical: 32, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <IconClose height={24} width={24} color={colors["primary-600"]} />
        </Pressable>
        <Text
          style={{
            ...typography.body.large.bold,
            color: colors["grey-900"],
          }}
        >
          {teamA.name} vs {teamB.name}
        </Text>
        <View style={{ height: 24, width: 24 }} />
      </View>

      <View
        style={{
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 16,
          flex: 1,
        }}
      >
        <View style={{ gap: 8, flex: 1 }}>
          <View
            style={{
              gap: 12,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  flex: 1,
                  ...typography.body.large.medium,
                  color: colors["grey-900"],
                }}
              >
                {teamA.name}
              </Text>
              <Input
                value={scoreA}
                onChangeText={(t) => setScoreA(t)}
                placeholder={String(scoreA)}
                inputMode="numeric"
                keyboardType="number-pad"
                maxLength={3}
                textAlign="center"
                placeholderTextColor={colors["grey-400"]}
                selectionColor={colors["grey-900"]}
                style={{ width: 80 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  flex: 1,
                  ...typography.body.large.medium,
                  color: colors["grey-900"],
                }}
              >
                {teamB.name}
              </Text>
              <Input
                value={scoreB}
                onChangeText={(t) => setScoreB(t)}
                placeholder={String(scoreB)}
                inputMode="numeric"
                keyboardType="number-pad"
                maxLength={3}
                textAlign="center"
                placeholderTextColor={colors["grey-400"]}
                selectionColor={colors["grey-900"]}
                style={{ width: 80 }}
              />
            </View>
          </View>
        </View>

        <View style={{ gap: 12, marginTop: 16 }}>
          {tournament.sport === "football" && (
            <Button
              style={{ borderColor: colors["primary-600"] }}
              variant="tertiary"
              label="Go Live"
              onPress={openLiveMatch}
            />
          )}
          <Button
            label="Submit Score"
            onPress={() => handlePickWinner(Number(scoreA), Number(scoreB))}
          />
        </View>
      </View>
    </View>
  );
};

export default MatchDetailsModal;

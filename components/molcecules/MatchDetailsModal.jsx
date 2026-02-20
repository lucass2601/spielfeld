import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Avatar from "../atoms/Avatar";

import IconClose from "@/assets/icons/icon-close.svg";
import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams, usePathname } from "expo-router";

const MatchDetailsModal = ({ match, onClose }) => {
  const { tournament_id } = useGlobalSearchParams();
  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const updateTournamentMatchWinner = useTournamentStore(
    (state) => state.updateTournamentMatchWinner,
  );

  const resetTournamentMatch = useTournamentStore(
    (state) => state.resetTournamentMatch,
  );

  const isFinished = match.status === "finished";
  const isFootball = tournament.sport === "football";

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
      scoreB,
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
          {isFinished ? "Edit Score" : "Enter Score"}
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
        <View style={{ flex: 1, justifyContent: "center", gap: 24 }}>
          {/* Team avatars + names */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
              <Avatar
                uri={teamA.imageUri}
                type="team"
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
              <Text
                style={{
                  ...typography.body.medium.semibold,
                  color: colors["grey-900"],
                  textAlign: "center",
                }}
                numberOfLines={2}
              >
                {teamA.name}
              </Text>
            </View>
            <Text
              style={{
                ...typography.body.medium.regular,
                color: colors["grey-400"],
                paddingHorizontal: 8,
              }}
            >
              vs
            </Text>
            <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
              <Avatar
                uri={teamB.imageUri}
                type="team"
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
              <Text
                style={{
                  ...typography.body.medium.semibold,
                  color: colors["grey-900"],
                  textAlign: "center",
                }}
                numberOfLines={2}
              >
                {teamB.name}
              </Text>
            </View>
          </View>

          {/* Score inputs */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
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
            <View style={{ width: 32 }} />
            <View style={{ flex: 1, alignItems: "center" }}>
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
          {isFootball && !isFinished && (
            <Button
              style={{ borderColor: colors["primary-600"] }}
              variant="tertiary"
              label="Go Live"
              onPress={openLiveMatch}
            />
          )}
          {isFinished && (
            <Button
              textColor={colors["error-500"]}
              variant="secondary"
              label="Reset Score"
              onPress={() => {
                resetTournamentMatch(tournament_id, match.id);
                onClose();
              }}
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

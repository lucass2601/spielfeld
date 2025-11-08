import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";

import IconClose from "@/assets/icons/icon-close.svg";
import MatchEventTeamTile from "./MatchEventTeamTile";
import CustomPicker from "./CustomPicker";
import Button from "../atoms/Button";

const MatchEventModal = ({ teamA, teamB, event, onClose }) => {
  const [modalEvent, setModalEvent] = useState({
    team: event.team || null,
    player: event.player || null,
    timestamp: event.timestamp || null,
  });

  const handleTeamChange = (team) => {
    setModalEvent({
      ...modalEvent,
      team: team,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
      }}
    >
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
          Add Goal
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
        <View style={{ flex: 1, gap: 24 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <MatchEventTeamTile
              onPress={() => handleTeamChange(teamA)}
              team={teamA}
              active={modalEvent.team?.id === teamA.id}
            />
            <MatchEventTeamTile
              onPress={() => handleTeamChange(teamB)}
              team={teamB}
              active={modalEvent.team?.id === teamB.id}
            />
          </View>
          <CustomPicker
            title="Select Player"
            label="Player"
            value={event.player}
            placeholder="Select Player..."
            options={[
              { name: "No Player", id: null },
              ...modalEvent.team?.roster,
            ].map((player) => {
              return {
                label: player.name,
                value: player.id,
              };
            })}
          />
          <CustomPicker
            title="Select Minute"
            label="Minute"
            value={event.timestamp}
            options={[...Array(91).keys()].map((opt) => {
              return {
                label: opt.toString(),
                value: opt.toString(),
              };
            })}
          />
          <Button />
        </View>
      </View>
    </View>
  );
};

export default MatchEventModal;

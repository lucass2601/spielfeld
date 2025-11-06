import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";
import Button from "../atoms/Button";

import Input from "../atoms/Input";

import IconClose from "@/assets/icons/icon-close.svg";
import MatchEventTeamTile from "./MatchEventTeamTile";

const MatchEventModal = ({ onClose }) => {
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
          New Event
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
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {/* <MatchEventTeamTile active={true} />
            <MatchEventTeamTile /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MatchEventModal;

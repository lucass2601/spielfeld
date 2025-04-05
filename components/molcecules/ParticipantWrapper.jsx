import { View, Text, ScrollView } from "react-native";
import { useState } from "react";

import IconSearch from "@/assets/icons/icon-search.svg";
import { colors, typography } from "@/theme/theme";

import { router, usePathname } from "expo-router";

import Input from "../atoms/Input";

import Button from "../atoms/Button";
import ParticipantEntity from "./ParticipantEntity";

import useTournamentStore from "@/store/useTournamentStore";

const ParticipantWrapper = ({
  participantType,
  allowSelection = false,
  onSelectParticipant,
  selectedParticipants,
}) => {
  const getParticipants = useTournamentStore((state) => state.participants);
  const participants = getParticipants.filter(
    (p) => p.type === participantType
  );

  const [participantSearch, setParticipantSearch] = useState("");

  const route = usePathname();
  let createPlayersRoute = usePathname();

  switch (route) {
    case "/wizard/participants":
      createPlayersRoute = "/wizard/participants/create";
      break;
    case "/customize/players":
      createPlayersRoute = "/customize/players/create";
      break;
    case "/customize/teams":
      createPlayersRoute = "/customize/teams/create";
      break;
    default:
      break;
  }

  if (route === "/wizard/participants") {
    createPlayersRoute = "/wizard/participants/create";
  } else if (route === "/customize/players") {
    createPlayersRoute = "/customize/players/create";
  }

  const handleEntityPress = (participant_id) => {
    if (allowSelection) {
      onSelectParticipant(participant_id);
    } else {
      router.push(`${route}/edit/${participant_id}`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Input
          value={participantSearch}
          placeholder={`Search ${
            participantType === "players" ? "player" : "team"
          }`}
          icon={
            <IconSearch color={colors["grey-400"]} width={20} height={20} />
          }
          onChangeText={(searchValue) => setParticipantSearch(searchValue)}
        />
      </View>
      <View style={{ marginTop: 20, gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {allowSelection && (
            <Text
              style={{
                color: colors["grey-500"],
                ...typography.body.small.bold,
              }}
            >
              Hold to edit
            </Text>
          )}
          <Button
            size={allowSelection ? "small" : "medium"}
            style={[{ borderRadius: 8 }, !allowSelection && { width: "100%" }]}
            label={`Add new ${
              participantType === "players" ? "Player" : "Team"
            }`}
            onPress={() => router.push(createPlayersRoute)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {allowSelection ? (
            <Text
              style={{
                color: colors["gray-900"],
                ...typography.body.large.bold,
              }}
            >
              {selectedParticipants?.length}{" "}
              {participantType === "players" ? "Players" : "Teams"} selected
            </Text>
          ) : (
            <Text
              style={{
                color: colors["gray-900"],
                ...typography.body.large.bold,
              }}
            >
              {participantType === "players" ? "Players" : "Teams"}
            </Text>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            marginTop: 20,
          }}
          showsVerticalScrollIndicator={true}
        >
          {participants?.map((participant) => (
            <ParticipantEntity
              key={participant.id}
              imageUri={participant.imageUri}
              name={participant.name}
              selectable={allowSelection}
              selected={
                allowSelection && selectedParticipants.includes(participant.id)
              }
              onPress={() => handleEntityPress(participant.id)}
              onLongPress={() => router.push(`${route}/edit/${participant.id}`)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ParticipantWrapper;

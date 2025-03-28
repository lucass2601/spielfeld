import { View, Text, ScrollView } from "react-native";
import { useState } from "react";

import IconSearch from "@/assets/icons/icon-search.svg";
import { colors, typography } from "@/theme/theme";

import { router } from "expo-router";

import Input from "../atoms/Input";

import Button from "../atoms/Button";
import ParticipantEntity from "./ParticipantEntity";
import useTournamentStore from "@/store/useTournamentStore";

const ParticipantForm = ({
  participantType,
  allowSelection = false,
  onSelectParticipant,
  selectedParticipants,
}) => {
  const participants = useTournamentStore((state) => state.participants);

  const [participantSearch, setParticipantSearch] = useState("");

  return (
    <View>
      <View>
        <Input
          value={participantSearch}
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
              participantType === "individual" ? "Player" : "Team"
            }`}
            onPress={() => router.push("/customize/players/create")}
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
              {participantType === "individual" ? "Players" : "Teams"} selected
            </Text>
          ) : (
            <Text
              style={{
                color: colors["gray-900"],
                ...typography.body.large.bold,
              }}
            >
              {participants?.length}{" "}
              {participantType === "individual" ? "Players" : "Teams"}
            </Text>
          )}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ gap: 16, marginTop: 20 }}
        showsVerticalScrollIndicator={true}
      >
        <ParticipantEntity onPress={() => alert("works")} />
      </ScrollView>
    </View>
  );
};

export default ParticipantForm;

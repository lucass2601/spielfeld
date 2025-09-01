import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams, usePathname } from "expo-router";

import TeamItem from "@/components/molcecules/EntityItem";
import AddEntityModal from "@/components/molcecules/AddEntityModal";

const ParticipantEdtior = ({ entity }) => {
  const { tournament_id, team_id } = useGlobalSearchParams();

  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );

  const getTeam = useTournamentStore((state) =>
    state.getTeam(tournament_id, team_id)
  );

  const entityLength = () => {
    if (entity === "teams") {
      return tournament?.teams.length;
    } else if (entity === "players") {
      return getTeam.roster.length;
    }
  };

  const entityList = entity === "teams" ? tournament?.teams : getTeam.roster;

  const addTeam = useTournamentStore((state) => state.addTeam);
  const addPlayer = useTournamentStore((state) => state.addPlayer);

  const [modalOpen, setModalOpen] = useState(false);

  const handleEntityPress = (entity_id) => {
    console.log(entity_id);

    if (entity === "teams") {
      if (pathname !== `/tournament/${tournament_id}/teams/${entity_id}`)
        router.push(`${pathname}/${entity_id}`);
    } else if (entity === "players") {
      if (
        pathname !==
        `/tournament/${tournament_id}/teams/${team_id}/roster/${entity_id}`
      )
        console.log(pathname);

      router.push(`${pathname}/${entity_id}`);
    } else {
      console.error("No Entity matched");
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
                <AddEntityModal
                  entity={entity}
                  onAddEntities={(names) => {
                    names.forEach((name) =>
                      entity === "teams"
                        ? addTeam(tournament_id, name)
                        : addPlayer(tournament_id, team_id, name)
                    );
                  }}
                  onClose={() => setModalOpen(false)}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        <Text style={typography.body.large.bold}>{`${
          entity === "teams" ? "Teams" : "Players"
        } (${entityLength()})`}</Text>
        <Pressable onPress={() => setModalOpen(true)}>
          <Text
            style={[
              typography.body.medium.semibold,
              { color: colors["primary-600"] },
            ]}
          >
            Add {`${entity === "teams" ? "teams" : "players"}`}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          {
            marginTop: 20,
          },
          entityList.length > 0 && {
            borderBottomWidth: 1,
            borderBottomColor: colors["grey-100"],
          },
        ]}
        showsVerticalScrollIndicator={true}
      >
        {entityList.map((entity) => (
          <TeamItem
            onPress={() => handleEntityPress(entity.id)}
            key={entity.id}
            name={entity.name}
            imageUri={entity.imageUri}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default ParticipantEdtior;

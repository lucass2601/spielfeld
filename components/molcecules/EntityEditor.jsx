import { View, Text, Pressable, Modal, ScrollView, Alert } from "react-native";
import { useState } from "react";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams, usePathname } from "expo-router";

import TeamItem from "@/components/molcecules/TeamItem";

import AddEntityModal from "@/components/molcecules/AddEntityModal";

import Button from "@/components/atoms/Button";

import TeamsIllustration from "@/assets/images/teams-illustration.svg";

const EntityEditor = () => {
  const { tournament_id } = useGlobalSearchParams();

  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const teams = tournament?.teams ?? [];

  const addTeam = useTournamentStore((state) => state.addTeam);

  const deleteTournamentMatches = useTournamentStore(
    (state) => state.deleteTournamentMatches,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const handleTeamPress = (team_id) => {
    if (pathname !== `/tournament/${tournament_id}/manage/teams/${team_id}`)
      router.push(`${pathname}/${team_id}`);
  };

  return (
    <>
      {teams.length === 0 ? (
        <View
          style={{
            flex: 1,
            marginTop: 128,
            alignItems: "center",
            gap: 32,
          }}
        >
          <TeamsIllustration width={120} height={120} />
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.headings.h3, textAlign: "center" }}>
              Teams
            </Text>
            <Text
              style={{
                ...typography.body.large.regular,
                textAlign: "center",
                color: colors["grey-500"],
              }}
            >
              Looks empty here. Add your first team!
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              onPress={() => setModalOpen(true)}
              size="large"
              label="Add Teams"
            />
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={typography.body.medium.semibold}>
              {`Teams (${teams.length})`}
            </Text>
            <Pressable onPress={() => setModalOpen(true)}>
              <Text
                style={[
                  typography.body.medium.semibold,
                  { color: colors["primary-600"] },
                ]}
              >
                Add teams
              </Text>
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={[
              {
                marginTop: 20,
              },
              {
                borderBottomWidth: 1,
                borderBottomColor: colors["grey-100"],
              },
            ]}
            showsVerticalScrollIndicator={true}
          >
            {teams.map((team) => (
              <TeamItem
                onPress={() => handleTeamPress(team.id)}
                key={team.id}
                name={team.name}
                imageUri={team.imageUri}
                size={team.roster.length}
              />
            ))}
          </ScrollView>
        </View>
      )}
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
          <KeyboardAvoidingView behavior="padding">
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
                entity="teams"
                onAddEntities={(names) => {
                  const applyAdd = () =>
                    names.forEach((name) => addTeam(tournament_id, name));

                  if ((tournament?.matchdays?.length ?? 0) > 0) {
                    Alert.alert(
                      "Your Schedule Will Be Invalidated",
                      "Adding new teams will break your existing match schedule. You'll need to generate a fresh one after this change. Want to continue?",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Continue",
                          style: "destructive",
                          onPress: () => {
                            deleteTournamentMatches(tournament_id);
                            applyAdd();
                          },
                        },
                      ],
                    );
                  } else {
                    applyAdd();
                  }
                }}
                onClose={() => setModalOpen(false)}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};

export default EntityEditor;

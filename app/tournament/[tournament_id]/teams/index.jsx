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

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useGlobalSearchParams, usePathname } from "expo-router";

import TeamItem from "@/components/molcecules/TeamItem";
import AddTeamsModal from "@/components/molcecules/AddTeamsModal";

const TeamsTab = () => {
  const { tournament_id } = useGlobalSearchParams();

  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );
  const addTeam = useTournamentStore((state) => state.addTeam);

  const [modalOpen, setModalOpen] = useState(false);

  const handleTeamPress = (team_id) => {
    if (pathname !== `/tournament/${tournament_id}/teams/${team_id}`)
      router.push(`${pathname}/${team_id}`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <ScreenContainer>
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
                    <AddTeamsModal
                      onAddTeams={(names) => {
                        names.forEach((name) => addTeam(tournament_id, name));
                      }}
                      onClose={() => setModalOpen(false)}
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>

            <Text style={typography.body.large.bold}>
              Teams ({tournament?.teams.length || 0})
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
              tournament?.teams.length > 0 && {
                borderBottomWidth: 1,
                borderBottomColor: colors["grey-100"],
              },
            ]}
            showsVerticalScrollIndicator={true}
          >
            {tournament?.teams.map((team) => (
              <TeamItem
                onPress={() => handleTeamPress(team.id)}
                key={team.id}
                name={team.name}
                imageUri={team.imageUri}
              />
            ))}
          </ScrollView>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TeamsTab;

import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";

import IconClose from "@/assets/icons/icon-close.svg";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { router, useLocalSearchParams, usePathname } from "expo-router";

import TeamItem from "@/components/molcecules/TeamItem";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import FormModal from "@/components/molcecules/FormModal";

const ManageTeams = () => {
  const { tournament_id } = useLocalSearchParams();
  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );
  const addTeam = useTournamentStore((state) => state.addTeam);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const handleAddTeam = () => {
    addTeam(tournament_id, newTeamName);
    setNewTeamName("");
    setModalOpen(false);
  };

  const handleTeamPress = (team_id) => {
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
        <FormModal
          visible={modalOpen}
          title="Add Team"
          onCancel={() => {
            setModalOpen(false);
            setNewTeamName("");
          }}
          onSave={handleAddTeam}
        >
          <Input
            placeholder="Name"
            value={newTeamName}
            onChangeText={(text) => setNewTeamName(text)}
          />
        </FormModal>

        <AppBar
          iconLeft={
            <IconClose width={24} height={24} color={colors["grey-900"]} />
          }
          title="Manage Teams"
        />
        <ScreenContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={typography.body.large.bold}>
              Teams ({tournament.teams.length})
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
              tournament.teams.length > 0 && {
                borderBottomWidth: 1,
                borderBottomColor: colors["grey-100"],
              },
            ]}
            showsVerticalScrollIndicator={true}
          >
            {tournament.teams.map((team) => (
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

export default ManageTeams;

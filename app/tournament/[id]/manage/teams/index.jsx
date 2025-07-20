import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";

import IconClose from "@/assets/icons/icon-close.svg";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { useLocalSearchParams } from "expo-router";

import TeamItem from "@/components/molcecules/TeamItem";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const ManageTeams = () => {
  const { id } = useLocalSearchParams();

  const tournament = useTournamentStore((state) => state.getTournament(id));
  const addTeam = useTournamentStore((state) => state.addTeam);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const handleAddTeam = () => {
    addTeam(id, newTeamName);
    setNewTeamName("");
    setModalOpen(false);
    console.log(tournament);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: 12,
                padding: 24,
                width: "90%",
              }}
            >
              <Text style={[typography.body.large.bold, { marginBottom: 16 }]}>
                Add team
              </Text>

              <Input
                placeholder="Name"
                value={newTeamName}
                onChangeText={(teamName) => setNewTeamName(teamName)}
              />

              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="tertiary"
                  label="Cancel"
                  onPress={() => setModalOpen(false)}
                />
                <Button label="Save" onPress={handleAddTeam} />
              </View>
            </View>
          </View>
        </Modal>
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
            contentContainerStyle={{
              marginTop: 20,
            }}
            showsVerticalScrollIndicator={true}
          >
            {tournament.teams.map((team) => (
              <TeamItem key={team.id} name={team.name} />
            ))}
          </ScrollView>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ManageTeams;

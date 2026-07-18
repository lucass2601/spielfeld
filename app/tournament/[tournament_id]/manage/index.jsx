import { colors } from "@/theme/theme";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";
import OptionGroup from "@/components/molcecules/OptionGroup";

import IconGroup from "@/assets/icons/icon-group.svg";
import IconBracket from "@/assets/icons/icon-bracket.svg";
import IconSettings from "@/assets/icons/icon-settings.svg";
import IconTrash from "@/assets/icons/icon-trash.svg";
import IconCalendarEvent from "@/assets/icons/icon-calendar-event.svg";
import TournamentItem from "@/components/molcecules/TournamentItem";

export default function ManageTab() {
  const { tournament_id } = useGlobalSearchParams();

  const tournamentExists = useTournamentStore((state) =>
    Boolean(state.getTournament(tournament_id)),
  );

  const tournamentName = useTournamentStore(
    (state) => state.getTournament(tournament_id)?.name,
  );
  const tournamentImageUri = useTournamentStore(
    (state) => state.getTournament(tournament_id)?.imageUri,
  );
  const tournamentStartDate = useTournamentStore(
    (state) => state.getTournament(tournament_id)?.startDate,
  );
  const tournamentSport = useTournamentStore(
    (state) => state.getTournament(tournament_id)?.sport,
  );
  const tournamentFormat = useTournamentStore(
    (state) => state.getTournament(tournament_id)?.format,
  );

  const deleteTournament = useTournamentStore(
    (state) => state.deleteTournament,
  );

  const deleteTournamentMatches = useTournamentStore(
    (state) => state.deleteTournamentMatches,
  );

  if (!tournamentExists) return null;

  const dateString = new Date(tournamentStartDate).toISOString();

  const managementOptions = [
    {
      id: 1.1,
      icon: <IconGroup color={colors["grey-500"]} height={20} width={20} />,
      title: "Manage Teams",
      onPress: () => {
        router.push(`/tournament/${tournament_id}/manage/teams`);
      },
    },
    {
      id: 1.2,
      icon: <IconBracket color={colors["grey-500"]} height={20} width={20} />,
      title: "Manage Format",
      onPress: () => {
        router.push(`/tournament/${tournament_id}/manage/format`);
      },
    },
    {
      id: 1.3,
      icon: <IconSettings color={colors["grey-500"]} width={20} height={20} />,
      title: "Tournament Settings",
      onPress: () => {
        router.push(`/tournament/${tournament_id}/manage/settings`);
      },
    },
    {
      id: 1.4,
      icon: (
        <IconCalendarEvent color={colors["error-500"]} height={20} width={20} />
      ),
      title: "Delete Matches",
      onPress: () => {
        Alert.alert(
          "Delete Matches?",
          "Are you sure you want to delete all matches? This action cannot be undone.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                deleteTournamentMatches(tournament_id);
              },
            },
          ],
        );
      },
    },
    {
      id: 1.3,
      icon: <IconTrash color={colors["error-500"]} height={20} width={20} />,
      title: "Delete Tournament",
      onPress: () => {
        Alert.alert(
          "Delete Tournament?",
          "Are you sure you want to delete this tournament? This action cannot be undone.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                router.dismiss();
                deleteTournament(tournament_id);
              },
            },
          ],
        );
      },
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.managementContainer}>
        <TournamentItem
          preview={true}
          imageUri={tournamentImageUri}
          name={tournamentName}
          startDate={dateString}
          sport={tournamentSport}
          format={tournamentFormat}
        />
        <OptionGroup options={managementOptions} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  managementContainer: {
    gap: 20,
  },
});

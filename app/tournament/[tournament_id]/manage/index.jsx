import { colors } from "@/theme/theme";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { router, useGlobalSearchParams, usePathname } from "expo-router";

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

  const pathname = usePathname();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const deleteTournament = useTournamentStore(
    (state) => state.deleteTournament,
  );

  const deleteTournamentMatches = useTournamentStore(
    (state) => state.deleteTournamentMatches,
  );

  const dateString = new Date(tournament.startDate).toISOString();

  const managementOptions = [
    {
      id: 1.1,
      icon: <IconGroup color={colors["grey-500"]} height={20} width={20} />,
      title: "Manage Teams",
      onPress: () => {
        router.push(`${pathname}/teams`);
      },
    },
    {
      id: 1.2,
      icon: <IconBracket color={colors["grey-500"]} height={20} width={20} />,
      title: "Manage Format",
      onPress: () => {
        router.push(`${pathname}/format`);
      },
    },
    {
      id: 1.3,
      icon: <IconSettings color={colors["grey-500"]} width={20} height={20} />,
      title: "Tournament Settings",
      onPress: () => {
        router.push(`${pathname}/settings`);
      },
    },
    {
      id: 1.4,
      icon: <IconCalendarEvent color={colors["error-500"]} height={20} width={20} />,
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
                deleteTournament(tournament_id);
                router.replace("/(tabs)");
                router.dismissAll();
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
          imageUri={tournament.imageUri}
          name={tournament.name}
          startDate={dateString}
          sport={tournament.sport}
          format={tournament.format}
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

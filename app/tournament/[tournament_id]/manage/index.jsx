import { View, Text, StyleSheet, FlatList, Alert } from "react-native";

import ManageItem from "@/components/molcecules/ManageItem";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import IconEdit from "@/assets/icons/icon-edit.svg";
import IconCalendar from "@/assets/icons/icon-calendar.svg";
import IconGroup from "@/assets/icons/icon-group.svg";
import IconFormat from "@/assets/icons/icon-format.svg";
import IconCalendarEvent from "@/assets/icons/icon-calendar-event.svg";
import IconTrash from "@/assets/icons/icon-trash.svg";

import { colors, typography } from "@/theme/theme";
import { router, useGlobalSearchParams } from "expo-router";

import useTournamentStore from "@/store/useTournamentStore";

export default function ManageTab() {
  const { tournament_id } = useGlobalSearchParams();
  const deleteTournament = useTournamentStore(
    (state) => state.deleteTournament
  );

  const items = [
    {
      title: (
        <Text
          style={[
            { color: colors["primary-600"] },
            typography.body.medium.semibold,
          ]}
        >
          Name
        </Text>
      ),
      icon: <IconEdit color={colors["primary-600"]} height={24} width={24} />,
    },
    {
      title: (
        <Text
          style={[
            { color: colors["primary-600"] },
            typography.body.medium.semibold,
          ]}
        >
          Date
        </Text>
      ),
      icon: (
        <IconCalendar color={colors["primary-600"]} height={24} width={24} />
      ),
    },
    {
      title: (
        <Text
          style={[
            { color: colors["primary-600"] },
            typography.body.medium.semibold,
          ]}
        >
          Teams
        </Text>
      ),
      icon: <IconGroup color={colors["primary-600"]} height={24} width={24} />,
      onPress: () => {
        router.push(`/tournament/${tournament_id}/manage/teams`);
      },
    },
    {
      title: (
        <Text
          style={[
            { color: colors["primary-600"] },
            typography.body.medium.semibold,
          ]}
        >
          Format
        </Text>
      ),
      icon: <IconFormat color={colors["primary-600"]} height={24} width={24} />,
    },
    {
      title: (
        <Text
          style={[
            { color: colors["primary-600"] },
            typography.body.medium.semibold,
          ]}
        >
          Rounds
        </Text>
      ),
      icon: (
        <IconCalendarEvent
          color={colors["primary-600"]}
          height={24}
          width={24}
        />
      ),
    },
    {
      title: (
        <Text
          style={[
            { color: colors["error-600"] },
            typography.body.medium.semibold,
          ]}
        >
          Delete
        </Text>
      ),
      icon: <IconTrash color={colors["error-600"]} height={24} width={24} />,
      onPress: () => {
        Alert.alert(
          "Delete Tournament",
          "⚠️ Are you sure you want to permanently delete this tournament?\nThis action cannot be undone.",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                deleteTournament(tournament_id);
                router.replace("/(tabs)");
                router.dismissAll();
              },
              style: "destructive",
            },
          ]
        );
      },
    },
  ];

  return (
    <ScreenContainer>
      <View>
        <FlatList
          scrollEnabled={false}
          data={items}
          numColumns={2}
          renderItem={({ item }) => (
            <ManageItem
              title={item.title}
              icon={item.icon}
              style={{ flex: 1 }}
              onPress={item.onPress}
            />
          )}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

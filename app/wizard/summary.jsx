import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentItem from "@/components/molcecules/TournamentItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { formatDateTime } from "@/utils/dateUtils";
import { router } from "expo-router";

import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Wizard_Summary() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const submitNewTournament = useTournamentStore(
    (state) => state.submitNewTournament
  );

  const { imageUri, name, startDate, format, sport } = newTournament;

  const dateString = new Date(startDate).toISOString();
  const formattedDate = formatDateTime(dateString, "LLL d, yyyy t");

  const submitWizard = () => {
    const newTournament = submitNewTournament();
    router.dismissAll();
    router.replace(`/tournament/${newTournament.id}`);
  };

  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Tournament Summary</Text>
      </View>
      <View style={styles.content}>
        <View>
          {newTournament && (
            <TournamentItem
              preview={true}
              imageUri={imageUri}
              name={name}
              startDate={dateString}
              sport={sport}
              format={format}
            />
          )}
        </View>
        <View style={styles.summary_section}>
          <View style={styles.summary_section__header}>
            <Text style={styles.header_item__header}>Tournament Format</Text>
            <Pressable
              onPress={() => router.dismissTo("/wizard/format")}
              style={styles.header_item__button}
            >
              <Text style={styles.header_item__buttonText}>Change</Text>
            </Pressable>
          </View>
          <View style={styles.summary_section__content}>
            <View style={styles.summary_section__item}>
              <Text style={styles.content_item__label}>Format</Text>
              <Text style={styles.content_item__value}>
                {format === "roundrobin" ? "League" : "Knockout"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.summary_section}>
          <View style={styles.summary_section__header}>
            <Text style={styles.header_item__header}>Sport</Text>
            <Pressable
              onPress={() => router.dismissTo("/wizard/sport")}
              style={styles.header_item__button}
            >
              <Text style={styles.header_item__buttonText}>Change</Text>
            </Pressable>
          </View>
          <View style={styles.summary_section__content}>
            <View style={styles.summary_section__item}>
              <Text style={styles.content_item__label}>Sport</Text>
              <Text style={styles.content_item__value}>
                {sport === null ? "No Sport" : "Football"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.summary_section}>
          <View style={styles.summary_section__header}>
            <Text style={styles.header_item__header}>
              Tournament Information
            </Text>
            <Pressable
              onPress={() => router.dismissTo("/wizard/info")}
              style={styles.header_item__button}
            >
              <Text style={styles.header_item__buttonText}>Change</Text>
            </Pressable>
          </View>
          <View style={styles.summary_section__content}>
            <View style={styles.summary_section__item}>
              <Text style={styles.content_item__label}>Name</Text>
              <Text style={styles.content_item__value}>{name}</Text>
            </View>
            <View style={styles.summary_section__item}>
              <Text style={styles.content_item__label}>Start Date</Text>
              <Text style={styles.content_item__value}>{formattedDate}</Text>
            </View>
          </View>
        </View>
      </View>
      <Button
        onPress={submitWizard}
        label="Create Tournament"
        style={{ marginTop: "auto", marginBottom: 24 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wizard_header: {
    alignItems: "center",
  },
  title: {
    ...typography.headings.h4,
    color: colors["grey-900"],
  },
  content: {
    marginTop: 32,
    gap: 24,
  },
  summary_section: {},
  summary_section__header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summary_section__content: {
    marginTop: 16,
    gap: 16,
  },
  summary_section__item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header_item__header: {
    color: colors["grey-900"],
    ...typography.body.medium.bold,
  },
  header_item__buttonText: {
    color: colors["primary-600"],
    ...typography.body.medium.semibold,
  },
  content_item__label: {
    color: colors["grey-500"],
    ...typography.body.small.medium,
  },
  content_item__value: {
    color: colors["grey-900"],
    ...typography.body.small.medium,
  },
});

import Button from "@/components/atoms/Button";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import TournamentItem from "@/components/molcecules/TournamentItem";
import useTournamentStore from "@/store/useTournamentStore";
import { colors, typography } from "@/theme/theme";
import { formatDateTime } from "@/utils/dateUtils";
import { router } from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

export default function Wizard_Summary() {
  const newTournament = useTournamentStore((state) => state.newTournament);
  const submitNewTournament = useTournamentStore(
    (state) => state.submitNewTournament
  );

  const { imageUri, name, participantType, participants, startDate, type } =
    newTournament;

  const dateString = new Date(startDate).toISOString();
  const formattedDate = formatDateTime(dateString, "LLL d, yyyy t");

  const getParticipant = (participant_id) => {
    return useTournamentStore((state) => state.getParticipant(participant_id));
  };

  const submitWizard = () => {
    submitNewTournament();
    router.replace("/");
    router.dismissAll();
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
              participants={participants}
              type={type}
            />
          )}
        </View>
        <View style={styles.summary_section}>
          <View style={styles.summary_section__header}>
            <Text style={styles.header_item__header}>Tournament Type</Text>
            <Pressable
              onPress={() => router.dismissTo("/wizard/type")}
              style={styles.header_item__button}
            >
              <Text style={styles.header_item__buttonText}>Change</Text>
            </Pressable>
          </View>
          <View style={styles.summary_section__content}>
            <View style={styles.summary_section__item}>
              <Text style={styles.content_item__label}>Type</Text>
              <Text style={styles.content_item__value}>
                {type === "roundrobin" ? "League" : "Knockout"}
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
              <Text style={styles.content_item__label}>Participant Type</Text>
              <Text style={styles.content_item__value}>
                {participantType === "players" ? "Players" : "Teams"}
              </Text>
            </View>
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
        <View style={styles.summary_section}>
          <View style={styles.summary_section__header}>
            <Text style={styles.header_item__header}>
              {participantType === "players" ? "Players" : "Teams"} (
              {participants.length})
            </Text>
            <Pressable
              onPress={() => router.dismissTo("/wizard/participants")}
              style={styles.header_item__button}
            >
              <Text style={styles.header_item__buttonText}>Change</Text>
            </Pressable>
          </View>
          <View style={styles.summary_section__content}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.participants_container}
            >
              {participants?.map((participant) => (
                <View style={styles.participant_item} key={participant}>
                  <Image
                    style={styles.participant_image}
                    source={
                      getParticipant(participant).imageUri
                        ? { uri: getParticipant(participant).imageUri }
                        : require("@/assets/images/icon.png")
                    }
                  />
                  <Text style={styles.participant_text}>
                    {getParticipant(participant).name}
                  </Text>
                </View>
              ))}
            </ScrollView>
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
  participants_container: {
    gap: 20,
  },
  participant_item: {
    justifyContent: "center",
    alignItems: "center",
  },
  participant_image: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  participant_text: {
    marginTop: 12,
    color: colors["grey-900"],
    ...typography.body.medium.medium,
  },
});

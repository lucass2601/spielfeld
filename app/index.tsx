import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { colors, typography } from "@/theme/theme";

import TournamentItem from "@/components/molcecules/TournamentItem";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import FabButton from "@/components/atoms/FabButton";

import TournamentsIllustration from "@/assets/images/tournaments-illustration.svg";

import IconSettings from "@/assets/icons/icon-settings.svg";

import { router } from "expo-router";
import { formatDateTime } from "@/utils/dateUtils";

import useTournamentStore from "@/store/useTournamentStore";
import Button from "@/components/atoms/Button";

import { Tournament } from "@/types/tournament";

const Index = () => {
  const [greeting, setGreeting] = useState("");

  const tournaments = useTournamentStore((state) => state.tournaments);

  const handleTournamentPress = (tournament_id: Tournament["id"]) => {
    router.push(`/tournament/${tournament_id}`);
  };

  const clearNewTournament = useTournamentStore(
    (state) => state.clearNewTournament,
  );

  const handleCreateTournament = () => {
    clearNewTournament();
    router.push("/wizard/format");
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 18) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>
              {formatDateTime(new Date().toISOString(), "cccc, LLL d")}
            </Text>
            <Text style={styles.greeting}>{greeting}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => router.push("/settings")}
              style={styles.settings}
            >
              <IconSettings color={colors["grey-900"]} width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        {!tournaments.length ? (
          <View style={styles.emptyContainer}>
            <TournamentsIllustration width={120} height={120} />

            <View style={{ gap: 8 }}>
              <Text style={{ ...typography.headings.h3, textAlign: "center" }}>
                Tournaments
              </Text>
              <Text
                style={{
                  ...typography.body.large.regular,
                  textAlign: "center",
                  color: colors["grey-500"],
                }}
              >
                No tournaments yet. Create your first one to get started
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Button
                onPress={handleCreateTournament}
                size="large"
                label="Create Tournament"
              />
            </View>
          </View>
        ) : (
          <ScrollView
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <View style={styles.stickyHeader}>
                <Text style={styles.title}>Tournaments</Text>
              </View>

              <View>
                <View style={styles.listContainer}>
                  {tournaments.map((tournament) => (
                    <TournamentItem
                      key={tournament.id}
                      imageUri={tournament.imageUri}
                      name={tournament.name}
                      startDate={new Date(tournament.startDate).toISOString()}
                      teams={tournament.teams}
                      sport={tournament.sport}
                      format={tournament.format}
                      status={tournament.status}
                      onPress={() => handleTournamentPress(tournament.id)}
                    />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}

        {tournaments.length > 0 && (
          <FabButton
            onPress={handleCreateTournament}
            style={{ position: "absolute", bottom: 24, right: 0 }}
          />
        )}
      </View>
    </ScreenContainer>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    ...typography.body.small.regular,
    color: colors["grey-500"],
  },
  greeting: {
    ...typography.body.medium.bold,
    color: colors["grey-900"],
  },
  settings: {
    height: 40,
    width: 40,
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  stickyHeader: {
    backgroundColor: colors.white,
    paddingBottom: 10,
  },
  title: {
    ...typography.body.large.bold,
    color: colors["grey-900"],
  },
  listContainer: {
    marginTop: 16,
    gap: 20,
  },
  emptyContainer: {
    flex: 1,
    marginTop: 128,
    alignItems: "center",
    gap: 32,
  },
});

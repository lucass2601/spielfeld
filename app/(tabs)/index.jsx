import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { colors, typography } from "@/theme/theme";

import TournamentItem from "@/components/molcecules/TournamentItem";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import FabButton from "@/components/atoms/FabButton";

import { router } from "expo-router";
import { formatDateTime } from "@/utils/dateUtils";

import useTournamentStore from "@/store/useTournamentStore";

const Index = () => {
  const [greeting, setGreeting] = useState("");

  const tournaments = useTournamentStore((state) => state.tournaments);

  const handleTournamentPress = (tournament_id) => {
    router.push(`/tournament/${tournament_id}`);
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 18) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.date}>
            {formatDateTime(new Date().toISOString(), "cccc, LLL d")}
          </Text>
          <Text style={styles.greeting}>{greeting}</Text>
        </View>

        <View style={styles.stickyHeader}>
          <Text style={styles.title}>Tournaments</Text>
        </View>

        <View style={styles.listContainer}>
          {tournaments.map((tournament) => (
            <TournamentItem
              key={tournament.id}
              imageUri={tournament.imageUri}
              name={tournament.name}
              startDate={new Date(tournament.startDate).toISOString()}
              participants={tournament.participants}
              type={tournament.type}
              status={tournament.status}
              onPress={() => handleTournamentPress(tournament.id)}
            />
          ))}
        </View>
      </ScrollView>
      <FabButton
        onPress={() => router.push("/wizard/type")}
        style={{ position: "absolute", bottom: 24, right: 24 }}
      />
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
  },
  date: {
    ...typography.body.small.regular,
    color: colors["grey-500"],
  },
  greeting: {
    ...typography.body.medium.bold,
    color: colors["grey-900"],
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
});

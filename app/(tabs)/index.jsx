import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { colors, typography } from "@/theme/theme";

import TournamentItem from "@/components/molcecules/TournamentItem";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import FabButton from "@/components/atoms/FabButton";

import { router } from "expo-router";
import { formatDateTime } from "@/utils/dateUtils";

const tournaments = [
  {
    id: "1",
    title: "Example Tournament",
    dateTime: "2025-03-16T17:00:00Z",
    participants: 48,
    tournamentType: "knockout",
    tournamentStatus: "pending",
  },
  {
    id: "2",
    title: "Example Example",
    dateTime: "2025-01-26T12:30:00Z",
    participants: 23,
    tournamentType: "roundrobin",
    tournamentStatus: "active",
  },
  {
    id: "3",
    title: "Example Example",
    dateTime: "2025-01-04T19:00:00Z",
    participants: 12,
    tournamentType: "knockout",
    tournamentStatus: "completed",
  },
];

const Index = () => {
  const [greeting, setGreeting] = useState("");

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
          {tournaments.map((item) => (
            <TournamentItem
              key={item.id}
              title={item.title}
              dateTime={item.dateTime}
              participants={item.participants}
              tournamentType={item.tournamentType}
              tournamentStatus={item.tournamentStatus}
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

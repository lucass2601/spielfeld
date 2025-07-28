import { Text } from "react-native";
import { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";

import IconClose from "@/assets/icons/icon-close.svg";

import { colors, typography } from "@/theme/theme";

import useTournamentStore from "@/store/useTournamentStore";

import { useLocalSearchParams } from "expo-router";

const ManageRounds = () => {
  const { tournament_id } = useLocalSearchParams();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id)
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <AppBar
          iconLeft={
            <IconClose width={24} height={24} color={colors["grey-900"]} />
          }
          title="Manage Rounds"
        />
        <ScreenContainer>
          <Text>Works</Text>
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ManageRounds;

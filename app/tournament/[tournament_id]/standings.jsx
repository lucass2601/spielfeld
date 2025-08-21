import ScreenContainer from "@/components/layouts/ScreenContainer";
import RoundRobinTable from "@/components/molcecules/RoundRobinTable";
import useTournamentStore from "@/store/useTournamentStore";
import { useGlobalSearchParams } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";

export default function StandingsTab() {
  const { tournament_id } = useGlobalSearchParams();

  const updateTournamentStandings = useTournamentStore(
    (state) => state.updateTournamentStandings
  );

  const standingsData = updateTournamentStandings(tournament_id);

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {standingsData && standingsData.length > 0 && (
            <RoundRobinTable data={standingsData} />
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

import ScreenContainer from "@/components/layouts/ScreenContainer";
import RoundRobinTable from "@/components/molcecules/RoundRobinTable";
import KnockoutBracket from "@/components/molcecules/KnockoutBracket";
import useTournamentStore from "@/store/useTournamentStore";
import { useGlobalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";

import { Tournament, TournamentFormat } from "@/types/tournament";
import { colors } from "@/theme/theme";

export default function StandingsTab() {
  const { tournament_id } = useGlobalSearchParams<{
    tournament_id: Tournament["id"];
  }>();

  const tournament = useTournamentStore((state) =>
    state.getTournament(tournament_id),
  );

  const updateRoundRobinStandings = useTournamentStore(
    (state) => state.updateRoundRobinStandings,
  );

  if (!tournament) return null;

  if (tournament.format === TournamentFormat.KNOCKOUT) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <KnockoutBracket matchdays={tournament.matchdays} />
      </View>
    );
  }

  if (tournament.format === TournamentFormat.ROUND_ROBIN) {
    const standingsData = updateRoundRobinStandings(tournament_id);

    return (
      <ScreenContainer>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <RoundRobinTable data={standingsData} />
          </ScrollView>
        </View>
      </ScreenContainer>
    );
  }
}

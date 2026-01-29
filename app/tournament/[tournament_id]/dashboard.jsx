import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";

export default function DashboardTab() {
  const { tournament_id } = useGlobalSearchParams();

  const deleteTournament = useTournamentStore(
    (state) => state.deleteTournament
  );

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Pressable
          onPress={() => {
            deleteTournament(tournament_id);
            router.replace("/(tabs)");
            router.dismissAll();
          }}
        >
          <Text
            style={{
              ...typography.body.medium.bold,
              color: colors["error-600"],
              paddingHorizontal: 16,
              paddingVertical: 8,
              textAlign: "center",
            }}
          >
            Delete tournament
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 24,
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    height: 88,
    width: 88,
    borderRadius: 44,
  },
  image: {
    height: 88,
    width: 88,
    borderRadius: 44,
    overflow: "hidden",
    backgroundColor: colors["grey-200"],
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    marginTop: 12,
    color: colors["primary-600"],
    ...typography.body.medium.bold,
  },
  removeText: {
    marginTop: 12,
    color: colors["error-600"],
    ...typography.body.medium.bold,
  },
});

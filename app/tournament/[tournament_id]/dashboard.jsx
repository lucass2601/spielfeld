import { colors, typography } from "@/theme/theme";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import useTournamentStore from "@/store/useTournamentStore";

export default function DashboardTab() {
  const { tournament_id } = useGlobalSearchParams();

  const deleteTournament = useTournamentStore(
    (state) => state.deleteTournament
  );

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "transparent" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled" // Verhindert, dass Tastatur verschwindet bei Tippen auf ScrollView
          showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>
      </KeyboardAvoidingView>
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

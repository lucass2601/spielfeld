import { colors, typography } from "@/theme/theme";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import Button from "@/components/atoms/Button";

import ScreenContainer from "@/components/layouts/ScreenContainer";

export default function Wizard_Participants() {
  return (
    <ScreenContainer>
      <View style={styles.wizard_header}>
        <Text style={styles.title}>Tournament Participants</Text>
      </View>
      <View style={styles.content}>
        <Text>Tournament Participants</Text>
      </View>
      <Button
        onPress={() => router.push("/wizard/summary")}
        label="Next"
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
    gap: 12,
  },
});

import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppBar title={options.title} step={options.step} totalSteps={4} />
        ),
      }}
    >
      <Stack.Screen
        name="format"
        options={{ title: "Create Tournament", step: "1" }}
      />
      <Stack.Screen
        name="sport"
        options={{ title: "Create Tournament", step: "2" }}
      />
      <Stack.Screen
        name="info"
        options={{ title: "Create Tournament", step: "3" }}
      />

      <Stack.Screen
        name="summary"
        options={{ title: "Create Tournament", step: "4" }}
      />
    </Stack>
  );
}

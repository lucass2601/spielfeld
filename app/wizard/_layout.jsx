import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppBar title="Create Tournament" step={options.step} />
        ),
      }}
    >
      <Stack.Screen name="type" options={{ step: "1" }} />
      <Stack.Screen name="info" options={{ step: "2" }} />
      <Stack.Screen name="participants" options={{ step: "3" }} />
      <Stack.Screen name="summary" options={{ step: "4" }} />
    </Stack>
  );
}

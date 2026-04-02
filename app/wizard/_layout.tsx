import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppBar
            title="Create Tournament"
            textRight={`${options?.title ? options.title : "?"}/4`}
          />
        ),
      }}
    >
      <Stack.Screen name="format" options={{ title: "1" }} />
      <Stack.Screen name="sport" options={{ title: "2" }} />
      <Stack.Screen name="info" options={{ title: "3" }} />
      <Stack.Screen name="summary" options={{ title: "4" }} />
    </Stack>
  );
}

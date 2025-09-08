import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppBar title={options.title} textRight={options.textRight} />
        ),
      }}
    >
      <Stack.Screen
        name="format"
        options={{ title: "Create Tournament", textRight: "1/4" }}
      />
      <Stack.Screen
        name="sport"
        options={{ title: "Create Tournament", textRight: "2/4" }}
      />
      <Stack.Screen
        name="info"
        options={{ title: "Create Tournament", textRight: "3/4" }}
      />

      <Stack.Screen
        name="summary"
        options={{ title: "Create Tournament", textRight: "4/4" }}
      />
    </Stack>
  );
}

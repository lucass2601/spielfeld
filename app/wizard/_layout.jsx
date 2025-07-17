import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <AppBar title={options.title} step={options.step} />
        ),
      }}
    >
      <Stack.Screen
        name="type"
        options={{ title: "Create Tournament", step: "1" }}
      />
      <Stack.Screen
        name="info"
        options={{ title: "Create Tournament", step: "2" }}
      />
      {/* <Stack.Screen
        name="participants/index"
        options={{ title: "Create Tournament", step: "3" }}
      />
      <Stack.Screen
        name="participants/create"
        options={{ title: "Add Participant", step: "3" }}
      />
      <Stack.Screen
        name="participants/edit/[id]"
        options={{ title: "Edit Participant", step: "3" }}
      /> */}

      <Stack.Screen
        name="summary"
        options={{ title: "Create Tournament", step: "3" }}
      />
    </Stack>
  );
}

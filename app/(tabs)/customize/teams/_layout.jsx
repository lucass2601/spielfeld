import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function CustomizeTeamsLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => <AppBar title={options.title} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Customize Teams" }} />
      <Stack.Screen name="create" options={{ title: "Add Team" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Team" }} />
    </Stack>
  );
}

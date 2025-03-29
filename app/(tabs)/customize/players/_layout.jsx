import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function CustomizePlayerLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => <AppBar title={options.title} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Customize Players" }} />
      <Stack.Screen name="create" options={{ title: "Add Player" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Player" }} />
    </Stack>
  );
}

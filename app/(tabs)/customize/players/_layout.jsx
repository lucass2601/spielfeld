import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function CustomizePlayerLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => <AppBar title={options.title} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Edit Player" }} />
      <Stack.Screen name="create" options={{ title: "Add Player" }} />
    </Stack>
  );
}

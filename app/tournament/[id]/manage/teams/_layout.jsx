import { Stack } from "expo-router";

export default function ManageTeams() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal",
      }}
    />
  );
}

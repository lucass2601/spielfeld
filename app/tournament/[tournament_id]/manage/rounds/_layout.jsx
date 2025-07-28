import { Stack } from "expo-router";

export default function ManageRounds() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal",
      }}
    />
  );
}

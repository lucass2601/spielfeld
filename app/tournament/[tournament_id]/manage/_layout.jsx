import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ManageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: Platform.OS === "android" ? "modal" : "transparentModal",
      }}
    />
  );
}

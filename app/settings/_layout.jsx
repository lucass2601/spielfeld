import { Stack } from "expo-router";
import AppBar from "@/components/molcecules/AppBar";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <AppBar title="Settings" />,
      }}
    ></Stack>
  );
}

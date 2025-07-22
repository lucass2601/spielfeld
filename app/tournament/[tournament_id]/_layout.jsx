import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

import { colors, typography } from "@/theme/theme";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TournamentLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: "auto", color: "red" },
        tabBarIndicatorStyle: {
          backgroundColor: colors["primary-600"],
        },
        tabBarLabelStyle: {
          ...typography.body.small.semibold,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="dashboard"
        options={{ title: "Dashboard" }}
      />
      <MaterialTopTabs.Screen name="manage" options={{ title: "Manage" }} />
      <MaterialTopTabs.Screen name="teams" options={{ title: "Teams" }} />
      <MaterialTopTabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <MaterialTopTabs.Screen name="preview" options={{ title: "Preview" }} />
    </MaterialTopTabs>
  );
}

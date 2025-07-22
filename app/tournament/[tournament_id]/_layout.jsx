import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router, withLayoutContext } from "expo-router";

import { colors, typography } from "@/theme/theme";
import { View } from "react-native";
import AppBar from "@/components/molcecules/AppBar";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TournamentLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Tournament Details"
        backPress={() => {
          router.replace("/(tabs)");
          router.dismissAll();
        }}
      />
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
        <MaterialTopTabs.Screen
          name="schedule"
          options={{ title: "Schedule" }}
        />
        <MaterialTopTabs.Screen name="preview" options={{ title: "Preview" }} />
      </MaterialTopTabs>
    </View>
  );
}

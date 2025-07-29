import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router, withLayoutContext, useSegments } from "expo-router";

import { colors, typography } from "@/theme/theme";
import { Platform, View } from "react-native";
import AppBar from "@/components/molcecules/AppBar";
import { useMemo } from "react";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TournamentLayout() {
  const segments = useSegments();

  const nestedHomePageOpened = useMemo(() => {
    return segments.length > 3;
  }, [segments]);

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        !nestedHomePageOpened && (
          <AppBar
            title="Tournament Details"
            backPress={() => {
              router.replace("/(tabs)");
              router.dismissAll();
            }}
          />
        )
      ) : (
        <AppBar
          title="Tournament Details"
          backPress={() => {
            router.replace("/(tabs)");
            router.dismissAll();
          }}
        />
      )}

      <MaterialTopTabs
        screenOptions={{
          swipeEnabled: !nestedHomePageOpened,
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: "auto",
          },
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
        <MaterialTopTabs.Screen name="teams" options={{ title: "Teams" }} />
        <MaterialTopTabs.Screen name="rounds" options={{ title: "Rounds" }} />
        <MaterialTopTabs.Screen name="preview" options={{ title: "Preview" }} />
      </MaterialTopTabs>
    </View>
  );
}

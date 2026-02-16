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
          tabBarScrollEnabled: false,
          tabBarItemStyle: {
            // width: "auto",
            paddingHorizontal: 16,
          },
          tabBarLabelStyle: {
            ...typography.body.small.semibold,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors["primary-600"],
          },
        }}
      >
        {/* <MaterialTopTabs.Screen name="format" options={{ title: "Format" }} />
        <MaterialTopTabs.Screen
          name="teams"
          options={{
            title: "Teams",
            headerShown: !nestedHomePageOpened && Platform.OS === "android",
            tabBarStyle:
              nestedHomePageOpened && Platform.OS === "android"
                ? { display: "none" }
                : {},
          }}
        /> */}

        <MaterialTopTabs.Screen
          name="manage"
          options={{
            title: "Manage",
            headerShown: !nestedHomePageOpened && Platform.OS === "android",
            tabBarStyle:
              nestedHomePageOpened && Platform.OS === "android"
                ? { display: "none" }
                : {},
          }}
        />

        <MaterialTopTabs.Screen
          name="matches"
          options={{
            title: "Matches",
            headerShown: !nestedHomePageOpened && Platform.OS === "android",
            tabBarStyle:
              nestedHomePageOpened && Platform.OS === "android"
                ? { display: "none" }
                : {},
          }}
        />
        <MaterialTopTabs.Screen
          name="standings"
          options={{ title: "Standings" }}
        />
      </MaterialTopTabs>
    </View>
  );
}

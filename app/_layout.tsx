// import {
//   useFonts,
//   Manrope_400Regular,
//   Manrope_500Medium,
//   Manrope_600SemiBold,
//   Manrope_700Bold,
// } from "@expo-google-fonts/manrope";

import { useFonts } from "expo-font";

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { colors } from "@/theme/theme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import useTournamentStore from "@/store/useTournamentStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope_400Regular: require("../assets/fonts/Manrope-Regular.ttf"),
    Manrope_500Medium: require("../assets/fonts/Manrope-Medium.ttf"),
    Manrope_600SemiBold: require("../assets/fonts/Manrope-SemiBold.ttf"),
    Manrope_700Bold: require("../assets/fonts/Manrope-Bold.ttf"),
  });

  const [storeHydrated, setStoreHydrated] = useState(
    useTournamentStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsub = useTournamentStore.persist.onFinishHydration(() => {
      setStoreHydrated(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (storeHydrated && (loaded || error)) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, storeHydrated]);

  if (!storeHydrated || (!loaded && !error)) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <KeyboardProvider>
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: colors.white,
              }}
              edges={["top"]}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="wizard" />
                <Stack.Screen name="tournament/[tournament_id]" />
                <Stack.Screen name="settings" />
              </Stack>
            </SafeAreaView>
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </KeyboardProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

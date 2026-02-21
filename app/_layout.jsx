import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { colors } from "@/theme/theme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import useTournamentStore from "@/store/useTournamentStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const [storeHydrated, setStoreHydrated] = useState(
    useTournamentStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsub = useTournamentStore.persist.onFinishHydration(() => {
      setStoreHydrated(true);
    });
    return unsub;
  }, []);

  const ready = (loaded || error) && storeHydrated;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
          edges={["top"]}
        >
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="wizard"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="tournament/[tournament_id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaView>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}

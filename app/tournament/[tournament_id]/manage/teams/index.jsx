import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { colors } from "@/theme/theme";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import EntityEdtior from "@/components/molcecules/EntityEditor";
import AppBar from "@/components/molcecules/AppBar";

import IconClose from "@/assets/icons/icon-close.svg";

const TeamsTab = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <AppBar
          iconLeft={
            <IconClose width={24} height={24} color={colors["grey-900"]} />
          }
          title="Manage Teams"
          backPress={() => router.dismiss()}
        />
        <ScreenContainer>
          <EntityEdtior />
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TeamsTab;

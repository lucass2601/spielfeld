import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ScreenContainer from "@/components/layouts/ScreenContainer";

import EntityEdtior from "@/components/molcecules/EntityEditor";

import { colors } from "@/theme/theme";

const TeamsTab = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <ScreenContainer>
          <EntityEdtior entity="teams" />
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TeamsTab;

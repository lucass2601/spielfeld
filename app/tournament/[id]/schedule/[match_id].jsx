import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
// import Select from "@/components/molcecules/Select";

import { colors, typography } from "@/theme/theme";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MatchDetails = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <AppBar title="Edit Match" />
        <ScreenContainer>
          <Text style={typography.body.medium.semibold}>Matchup</Text>
          {/* TODO: implement picker (https://github.com/liptonzuma/React-Native-Dropdown/blob/main/components/DropDown.tsx) */}
        </ScreenContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MatchDetails;

import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import { Text } from "react-native";

export const PlayersScreen = () => (
  <>
    <AppBar title="Edit Players" />
    <ScreenContainer>
      <Text>Players Screen</Text>
    </ScreenContainer>
  </>
);

export default PlayersScreen;

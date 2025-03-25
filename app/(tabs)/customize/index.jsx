import ScreenContainer from "@/components/layouts/ScreenContainer";
import CustomizationTile from "@/components/molcecules/CustomizationTile";
import { colors, typography } from "@/theme/theme";
import { View, StyleSheet, Text } from "react-native";

import { useRouter } from "expo-router";

import IconUser from "@/assets/icons/icon-user.svg";
import IconGroup from "@/assets/icons/icon-group.svg";

const customize = () => {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ ...typography.headings.h4 }}>Customize</Text>
      <View style={styles.container}>
        <CustomizationTile
          title="Players"
          icon={
            <IconUser color={colors["primary-600"]} width={20} height={20} />
          }
          onPress={() => router.push("/customize/players")}
        />
        <CustomizationTile
          title="Teams"
          icon={
            <IconGroup color={colors["primary-600"]} width={20} height={20} />
          }
          onPress={() => router.push("/customize/teams")}
        />
      </View>
    </ScreenContainer>
  );
};

export default customize;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

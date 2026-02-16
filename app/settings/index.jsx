import ScreenContainer from "@/components/layouts/ScreenContainer";
import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "@/theme/theme";

import IconTrash from "@/assets/icons/icon-trash.svg";
import IconStar from "@/assets/icons/icon-star.svg";
import IconHelp from "@/assets/icons/icon-help.svg";
import IconEdit from "@/assets/icons/icon-edit.svg";
import IconInfo from "@/assets/icons/icon-info.svg";

import OptionGroup from "@/components/molcecules/OptionGroup";

const Settings = () => {
  const mainSettings = [
    {
      id: 1.1,
      icon: <IconTrash color={colors["error-500"]} height={20} width={20} />,
      title: "Reset Data",
      onPress: () => {},
    },
  ];

  const subSettings = [
    {
      id: 2.1,
      icon: <IconStar color={colors["grey-500"]} height={20} width={20} />,
      title: "Rate Us",
      onPress: () => {},
    },
    {
      id: 2.2,
      icon: <IconHelp color={colors["grey-500"]} height={20} width={20} />,
      title: "Help",
      onPress: () => {},
    },
    {
      id: 2.3,
      icon: <IconEdit color={colors["grey-500"]} height={20} width={20} />,
      title: "Feedback",
      onPress: () => {},
    },
    {
      id: 2.4,
      icon: <IconInfo color={colors["grey-500"]} height={20} width={20} />,
      title: "Legal",
      onPress: () => {},
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.settingsContainer}>
        <OptionGroup options={mainSettings} />
        <OptionGroup options={subSettings} />
        <View style={{ margin: "auto" }}>
          <Text style={styles.version}>Version 0.0.0</Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsContainer: {
    gap: 16,
  },
  version: {
    color: colors["grey-500"],
    ...typography.body.medium.semibold,
  },
});

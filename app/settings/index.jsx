import ScreenContainer from "@/components/layouts/ScreenContainer";
import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import * as MailComposer from "expo-mail-composer";
import Constants from "expo-constants";

import { colors, typography } from "@/theme/theme";

import IconTrash from "@/assets/icons/icon-trash.svg";
import IconStar from "@/assets/icons/icon-star.svg";
import IconHelp from "@/assets/icons/icon-help.svg";
import IconEdit from "@/assets/icons/icon-edit.svg";
import IconInfo from "@/assets/icons/icon-info.svg";

import OptionGroup from "@/components/molcecules/OptionGroup";
import useTournamentStore from "@/store/useTournamentStore";

const APP_STORE_ID = "6759353234";
const HELP_EMAIL = "info@spielfeldapp.com";
const FEEDBACK_EMAIL = "info@spielfeldapp.com";

const Settings = () => {
  const resetAllData = useTournamentStore((state) => state.resetAllData);
  const version = Constants.expoConfig?.version ?? "—";
  const router = useRouter();

  const handleResetData = () => {
    Alert.alert(
      "Reset Data",
      "This will permanently delete all your tournaments and data. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetAllData();
            router.replace("/");
            router.dismissAll();
          },
        },
      ],
    );
  };

  const handleRateUs = () => {
    if (APP_STORE_ID) {
      Linking.openURL(
        `https://apps.apple.com/app/id${APP_STORE_ID}?action=write-review`,
      ).catch(() => Alert.alert("Error", "Could not open the App Store."));
    }
  };

  const handleHelp = async () => {
    await MailComposer.composeAsync({
      recipients: [HELP_EMAIL],
      subject: "Help Request – spielfeld",
      body: `Hi spielfeld team,\n\nI need help with:\n\n[Describe your issue here]\n\n---\nApp version: ${version}`,
    });
  };

  const handleFeedback = async () => {
    await MailComposer.composeAsync({
      recipients: [FEEDBACK_EMAIL],
      subject: "Feedback – spielfeld",
      body: `Hi spielfeld team,\n\nI'd like to share some feedback:\n\n[Your feedback here]\n\n---\nApp version: ${version}`,
    });
  };

  const handleLegal = () => {
    Linking.openURL("https://spielfeldapp.com/legal.html");
  };

  const mainSettings = [
    {
      id: 1.1,
      icon: <IconTrash color={colors["error-500"]} height={20} width={20} />,
      title: "Reset Data",
      onPress: handleResetData,
    },
  ];

  const subSettings = [
    {
      id: 2.1,
      icon: <IconStar color={colors["grey-500"]} height={20} width={20} />,
      title: "Rate Us",
      onPress: handleRateUs,
    },
    {
      id: 2.2,
      icon: <IconHelp color={colors["grey-500"]} height={20} width={20} />,
      title: "Help",
      onPress: handleHelp,
    },
    {
      id: 2.3,
      icon: <IconEdit color={colors["grey-500"]} height={20} width={20} />,
      title: "Feedback",
      onPress: handleFeedback,
    },
    {
      id: 2.4,
      icon: <IconInfo color={colors["grey-500"]} height={20} width={20} />,
      title: "Legal",
      onPress: handleLegal,
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.settingsContainer}>
        <OptionGroup options={mainSettings} />
        <OptionGroup options={subSettings} />
        <View style={{ margin: "auto" }}>
          <Text style={styles.version}>Version {version}</Text>
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

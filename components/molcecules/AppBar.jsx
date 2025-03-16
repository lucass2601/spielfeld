import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { colors, typography } from "@/theme/theme";

import IconArrowBack from "@/assets/icons/icon-arrow-back.svg";

export default function AppBar({ title, step }) {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: colors.white,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <IconArrowBack color={colors["grey-900"]} width={24} height={24} />
      </Pressable>

      <Text
        style={{
          ...typography.body.large.semibold,
          color: colors["grey-900"],
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          ...typography.body.small.medium,
          color: colors["primary-600"],
        }}
      >
        {step} of 4
      </Text>
    </View>
  );
}

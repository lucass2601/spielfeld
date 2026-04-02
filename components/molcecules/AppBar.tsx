import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { colors, typography } from "@/theme/theme";

import IconArrowBack from "@/assets/icons/icon-arrow-back.svg";

type AppBarProps = {
  backPress?: () => void;
  forwardPress?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  textRight?: string;
  title: string;
};

export default function AppBar({
  backPress,
  forwardPress,
  iconLeft,
  iconRight,
  textRight,
  title,
}: AppBarProps) {
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
      <View style={{ width: 32 }}>
        <Pressable onPress={() => (backPress ? backPress() : router.back())}>
          {iconLeft ? (
            iconLeft
          ) : (
            <IconArrowBack color={colors["grey-900"]} width={24} height={24} />
          )}
        </Pressable>
      </View>

      <Text
        style={{
          ...typography.body.large.semibold,
          color: colors["grey-900"],
        }}
      >
        {title}
      </Text>

      <View style={{ width: 32 }}>
        {forwardPress && iconRight ? (
          <Pressable onPress={() => forwardPress()}>{iconRight}</Pressable>
        ) : textRight ? (
          <Text
            style={{
              ...typography.body.small.medium,
              color: colors["primary-600"],
            }}
          >
            {textRight}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

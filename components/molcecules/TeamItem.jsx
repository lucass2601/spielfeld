import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import defaultImage from "@/assets/images/icon.png";

import IconTrash from "@/assets/icons/icon-trash.svg";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { colors } from "@/theme/theme";

function RightAction(prog, drag) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log("showRightProgress:", prog.value);
    console.log("appliedTranslation:", drag.value);

    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable style={styles.rightAction}>
        <IconTrash height={24} width={24} color={colors.white} />
      </Pressable>
    </Reanimated.View>
  );
}

const TeamItem = ({ onPress, imageUri, name }) => {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
      >
        <Pressable onPress={onPress} style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Image
              style={styles.teamIcon}
              source={imageUri ? { uri: imageUri } : defaultImage}
            />
            <Text>{name}</Text>
          </View>
        </Pressable>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default TeamItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors["grey-100"],
  },
  teamIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  styleAnimation: { justifyContent: "center", alignItems: "center" },
  rightAction: {
    width: 50,
    height: "100%",
    backgroundColor: colors["error-600"],
    justifyContent: "center",
    alignItems: "center",
  },
});

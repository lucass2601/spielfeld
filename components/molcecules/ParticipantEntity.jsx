import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import RadioButton from "../atoms/RadioButton";

import { colors } from "@/theme/theme";

import IconChevronLeft from "@/assets/icons/icon-chevron-left.svg";
import defaultImage from "@/assets/images/icon.png";

const ParticipantEntity = ({
  onLongPress,
  onPress,
  imageUri,
  name,
  selectable,
  selected,
}) => {
  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      style={styles.entityContainer}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Image
          style={styles.entityIcon}
          source={imageUri ? { uri: imageUri } : defaultImage}
        />
        <Text>{name}</Text>
      </View>
      {selectable ? (
        <RadioButton selected={selected} />
      ) : (
        <IconChevronLeft width={20} height={20} color={colors["grey-900"]} />
      )}
    </Pressable>
  );
};

export default ParticipantEntity;

const styles = StyleSheet.create({
  entityContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors["grey-100"],
  },
  entityIcon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
  },
});

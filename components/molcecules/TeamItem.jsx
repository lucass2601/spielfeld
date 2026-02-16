import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import defaultImage from "@/assets/images/icon.png";

import IconChevronRight from "@/assets/icons/icon-chevron-right.svg";

import { colors, typography } from "@/theme/theme";

const TeamItem = ({ onPress, imageUri, name, size }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View>
          <Image
            style={styles.entityIcon}
            source={imageUri ? { uri: imageUri } : defaultImage}
          />
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text
            style={[
              { ...typography.body.medium.bold },
              { color: colors["grey-900"] },
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              { ...typography.body.small.regular },
              { color: colors["grey-500"] },
            ]}
          >
            {size > 0
              ? size.length === 1
                ? `${size} Player`
                : `${size} Players`
              : "No Players"}
          </Text>
        </View>
        <View>
          <IconChevronRight
            colors={colors["grey-400"]}
            height={18}
            width={18}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TeamItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors["grey-100"],
  },
  entityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  rightAction: {
    width: 50,
    height: "100%",
    backgroundColor: colors["error-600"],
    justifyContent: "center",
    alignItems: "center",
  },
});

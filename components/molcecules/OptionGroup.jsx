import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { colors, typography } from "@/theme/theme";

import IconChevronRight from "@/assets/icons/icon-chevron-right.svg";

const OptionGroup = ({ options }) => {
  return (
    <View style={styles.optionContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          onPress={option.onPress}
          style={[
            styles.option,
            index === options.length - 1 && styles.hideBorder,
          ]}
          key={`${option.id}-${option.title}`}
        >
          <View style={styles.iconContainer}>
            <Text>{option.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{option.title}</Text>
          </View>
          <View style={styles.action}>
            <IconChevronRight
              colors={colors["grey-400"]}
              height={16}
              width={16}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  option: {
    borderBottomWidth: 1,
    borderColor: colors["grey-200"],
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  hideBorder: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["grey-200"],
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: colors["grey-700"],
    ...typography.body.medium.semibold,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OptionGroup;

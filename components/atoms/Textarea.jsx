import { StyleSheet, TextInput, View, Text } from "react-native";
import { colors, typography } from "@/theme/theme";
import { useState } from "react";

/**
 * Textarea component that mimics Input but supports multiline
 */
const Textarea = ({
  icon = null,
  placeholder = "Enter text",
  value = "",
  onChangeText,
  style,
  label,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.container, isFocused && styles.activeContainer, style]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors["grey-400"]}
          selectionColor={colors["grey-900"]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={true}
          scrollEnabled={true}
          {...props}
        />
      </View>
    </View>
  );
};

export default Textarea;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: "transparent",
    minHeight: 100,
  },
  label: {
    marginBottom: 12,
    color: colors["grey-900"],
    ...typography.body.medium.semibold,
  },
  textarea: {
    flex: 1,
    color: colors["grey-900"],
    ...typography.body.large.regular,
    textAlignVertical: "top",
    minHeight: 100,
    maxHeight: 100,
  },
  iconContainer: {
    marginRight: 12,
  },
  activeContainer: {
    borderColor: colors["primary-600"],
    backgroundColor: "transparent",
  },
});

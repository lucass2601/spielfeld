import { StyleSheet, TextInput, View, Text } from "react-native";
import { colors, typography } from "@/theme/theme";
import React, { useState } from "react";

interface InputProps {
  icon?: React.ReactElement;
  placeholder: string;
  value: string | null;
  onChangeText: (text: string) => void;
  maxLength?: number;
  label?: string;
  inputMode?: "text" | "numeric";
}
/**
 * Input component that supports:
 *   - icon: JSX.Element (optional, left-side icon)
 *   - placeholder: string
 *   - value: string
 *   - onChangeText: function
 *   - maxLength: number (optional, maximum number of characters)
 *
 * Each state can have a unique style.
 */
const Input = ({
  icon,
  placeholder,
  value,
  onChangeText,
  maxLength,
  label,
  inputMode,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    if (!onChangeText) return;
    onChangeText(maxLength ? text.slice(0, maxLength) : text);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          isFocused && styles.activeContainer,
          inputMode === "numeric" && { width: 80 },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value ? value.toString() : ""}
          onChangeText={handleChangeText}
          placeholderTextColor={colors["grey-400"]}
          selectionColor={colors["grey-900"]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          textAlign={inputMode === "numeric" ? "center" : undefined}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: "transparent",
    height: 55,
  },
  label: {
    marginBottom: 12,
    color: colors["grey-900"],
    ...typography.body.medium.semibold,
  },
  input: {
    flex: 1,
    height: "auto",
    color: colors["grey-900"],
    ...typography.body.large.regular,
    textAlignVertical: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  activeContainer: {
    borderColor: colors["primary-600"],
    backgroundColor: "transparent",
  },
});

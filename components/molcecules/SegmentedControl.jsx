import React, { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@/theme/theme";

const SegmentedControl = ({
  options,
  selectedValue,
  onChange,
  style,
  ...props
}) => {
  const [selected, setSelected] = useState(selectedValue);

  const handlePress = (option) => {
    setSelected(option.value);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <View style={[styles.container, style]} {...props}>
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option)}
            style={[styles.segment, isSelected && styles.selectedSegment]}
          >
            <Text
              style={[
                styles.segmentText,
                isSelected && styles.selectedSegmentText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors["grey-50"],
    padding: 4,
  },
  segment: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["grey-50"],
  },
  selectedSegment: {
    backgroundColor: colors.white,
  },
  segmentText: {
    color: colors["grey-500"],
    ...typography.body.small.regular,
  },
  selectedSegmentText: {
    color: colors["primary-600"],
    ...typography.body.small.bold,
  },
});

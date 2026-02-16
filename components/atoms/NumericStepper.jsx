import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, typography } from "@/theme/theme";

const NumericStepper = ({ label, value = 0, onChange, min = 0, max = 99 }) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const isMinDisabled = value <= min;
  const isMaxDisabled = value >= max;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity
          onPress={handleDecrement}
          disabled={isMinDisabled}
          style={[styles.button, isMinDisabled && styles.buttonDisabled]}
        >
          <Text
            style={[
              styles.buttonText,
              isMinDisabled && styles.buttonTextDisabled,
            ]}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          onPress={handleIncrement}
          disabled={isMaxDisabled}
          style={[styles.button, isMaxDisabled && styles.buttonDisabled]}
        >
          <Text
            style={[
              styles.buttonText,
              isMaxDisabled && styles.buttonTextDisabled,
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumericStepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  label: {
    ...typography.body.medium.medium,
    color: colors["grey-900"],
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors["grey-100"],
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: colors["grey-50"],
  },
  buttonText: {
    ...typography.body.large.bold,
    color: colors["grey-900"],
  },
  buttonTextDisabled: {
    color: colors["grey-300"],
  },
  value: {
    ...typography.body.medium.semibold,
    color: colors["grey-900"],
    minWidth: 24,
    textAlign: "center",
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, typography } from "@/theme/theme";
import RadioButton from "../atoms/RadioButton";

const TournamentFormatItem = ({
  icon,
  title,
  onPress,
  disabled = false,
  selected = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        selected && styles.selectedContainer,
        disabled && styles.disabledContainer,
      ]}
    >
      <View style={styles.content}>
        <View>{icon}</View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <RadioButton selected={selected} />
      </View>
    </Pressable>
  );
};

export default TournamentFormatItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
  },
  selectedContainer: {
    backgroundColor: colors["primary-100"],
    borderColor: colors["primary-200"],
  },
  disabledContainer: {
    backgroundColor: colors["grey-50"],
    borderColor: colors["grey-100"],
    opacity: 0.6,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  title: {
    color: colors["grey-900"],
    ...typography.body.medium.bold,
  },
});

import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { colors, typography } from "@/theme/theme";

const ManageItem = ({ title, icon, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View>{title}</View>
    </Pressable>
  );
};

export default ManageItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["grey-50"],
    borderWidth: 1,
    borderColor: colors["grey-100"],
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

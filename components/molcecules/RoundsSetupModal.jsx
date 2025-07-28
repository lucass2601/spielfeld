import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { colors, typography } from "@/theme/theme";
import Button from "../atoms/Button";

const RoundsSetupModal = ({ visible, onDismiss, onSelect }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  How do you want to set up rounds?
                </Text>
              </View>

              <View style={styles.contentContainer}>
                <Button
                  size="large"
                  style={styles.actionButton}
                  label="Generate rounds automatically"
                  variant="tertiary"
                  onPress={() => onSelect("generate")}
                />
                <Button
                  size="large"
                  style={styles.actionButton}
                  label="Enter rounds manually"
                  variant="tertiary"
                  onPress={() => onSelect("manual")}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    height: 300,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    width: "100%",
  },
  modalTitle: {
    color: colors["grey-900"],
    ...typography.body.large.bold,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 24,
    gap: 16,
  },
  actionButton: {
    width: "100%",
  },
});

export default RoundsSetupModal;

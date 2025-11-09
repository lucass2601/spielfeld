import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import { colors, typography } from "@/theme/theme";

import IconChevronDown from "@/assets/icons/icon-chevron-down.svg";
import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";

import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
  label,
  value,
  placeholder,
  title = "Custom Picker",
  options,
  onSubmit,
}) => {
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [tempSelectedOption, setTempSelectedOption] = useState(value || "null");
  const [selectedOption, setSelectedOption] = useState(value || "null");

  const dismissPickerModal = () => {
    setPickerModalVisible(false);
    setTempSelectedOption(selectedOption);
  };

  const confirmPickerModal = () => {
    setPickerModalVisible(false);
    setSelectedOption(tempSelectedOption);
    onSubmit(tempSelectedOption);
  };

  return (
    <View style={{ gap: 12 }}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setPickerModalVisible(true)}
        style={styles.inputContainer}
        activeOpacity={0.7}
      >
        <Text
          style={
            selectedOption === "null"
              ? styles.inactiveInputText
              : styles.inputText
          }
        >
          {options.find((option) => option.value === selectedOption)?.label ||
            placeholder}
        </Text>
        <IconChevronDown width={20} height={20} color={colors["grey-400"]} />
      </TouchableOpacity>

      <Modal
        visible={pickerModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={dismissPickerModal}
      >
        <TouchableWithoutFeedback onPress={dismissPickerModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={dismissPickerModal}>
                    <IconClose color={colors["primary-600"]} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{title}</Text>
                  <TouchableOpacity onPress={confirmPickerModal}>
                    <Text style={styles.confirmButton}>
                      <IconCheck color={colors["success-600"]} />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={tempSelectedOption}
                    onValueChange={(itemValue) =>
                      pickerModalVisible && setTempSelectedOption(itemValue)
                    }
                  >
                    {options.map((option) => (
                      <Picker.Item
                        label={option.label}
                        value={option.value}
                        key={option.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors["grey-50"],
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  inputLabel: {
    color: colors["grey-900"],
    ...typography.body.large.semibold,
  },
  inputText: {
    color: colors["grey-900"],
    ...typography.body.large.regular,
  },
  inactiveInputText: {
    color: colors["grey-400"],
    ...typography.body.large.regular,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 300,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    width: "100%",
  },

  modalTitle: {
    color: colors["grey-900"],
    ...typography.body.large.bold,
  },
  pickerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  pickerWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: "100%",
  },
});

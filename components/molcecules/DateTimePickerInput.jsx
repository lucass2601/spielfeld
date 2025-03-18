import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import { colors, typography } from "@/theme/theme";

import { formatDateTime } from "@/utils/dateUtils";

import IconCalendar from "@/assets/icons/icon-calendar.svg";
import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";
import IconArrowBack from "@/assets/icons/icon-arrow-back.svg";

const DateTimePickerInput = ({
  value,
  onChange,
  label,
  placeholder = "Choose Date",
  minDate,
  maxDate,
}) => {
  const [showModalOnIos, setShowModalOnIos] = useState(false);
  const [currentPickerMode, setCurrentPickerMode] = useState("date");
  const [tempValue, setTempValue] = useState(value);
  const [localValue, setLocalValue] = useState(value);

  const handleTimeChange = (baseDate, event, selectedTime) => {
    if (!selectedTime || event.type !== "set") {
      return;
    }
    const newValue = new Date(baseDate || new Date());
    newValue.setHours(selectedTime.getHours());
    newValue.setMinutes(selectedTime.getMinutes());
    setTempValue(newValue);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleChange = (event, selectedDate, type) => {
    if (!selectedDate || event.type !== "set") {
      return;
    }

    if (Platform.OS === "android") {
      if (type === "date") {
        const newDate = new Date(tempValue || new Date());
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
        DateTimePickerAndroid.open({
          value: newDate,
          onChange: (event, selectedTime) =>
            handleTimeChange(newDate, event, selectedTime),
          mode: "time",
          is24Hour: true,
          minimumDate: minDate,
          maximumDate: maxDate,
        });
      }
    } else {
      setTempValue(selectedDate);
    }
  };

  const handleConfirm = () => {
    if (Platform.OS === "ios" && currentPickerMode === "date") {
      setCurrentPickerMode("time");
      return;
    }

    setLocalValue(tempValue);
    setShowModalOnIos(false);
    onChange(tempValue);
    setCurrentPickerMode("date");
  };

  const showDateTimePicker = (event, newTempValue) => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: tempValue || new Date(),
        onChange: (event, selectedDate) =>
          handleChange(event, selectedDate, "date"),
        mode: "date",
        is24Hour: true,
        minimumDate: minDate,
        maximumDate: maxDate,
      });
    } else if (Platform.OS === "ios") {
      setShowModalOnIos(true);
    }
  };

  const handleCancel = () => {
    if (currentPickerMode === "time" && Platform.OS === "ios") {
      setCurrentPickerMode("date");
      return;
    }
    setShowModalOnIos(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={showDateTimePicker}
        activeOpacity={0.7}
      >
        <IconCalendar width={20} height={20} color={colors["grey-400"]} />
        <Text style={[styles.inputText, !tempValue && styles.placeholder]}>
          {tempValue
            ? formatDateTime(tempValue.toISOString(), "LLL d y, t")
            : placeholder}
        </Text>
      </TouchableOpacity>

      {/* iOS Modal */}
      {Platform.OS === "ios" && (
        <Modal
          visible={showModalOnIos}
          animationType="fade"
          transparent={true}
          onRequestClose={handleCancel}
        >
          <TouchableWithoutFeedback onPress={handleCancel}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={handleCancel}>
                      {currentPickerMode === "time" ? (
                        <IconArrowBack color={colors["grey-400"]} />
                      ) : (
                        <IconClose color={colors["error-600"]} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>
                      {currentPickerMode === "date"
                        ? "Choose Date"
                        : "Choose Time"}
                    </Text>
                    <TouchableOpacity onPress={handleConfirm}>
                      <Text style={styles.confirmButton}>
                        <IconCheck color={colors["success-600"]} />
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.pickerContainer}>
                    {currentPickerMode === "date" && (
                      <View style={styles.pickerWrapper}>
                        <DateTimePicker
                          value={tempValue || new Date()}
                          mode="date"
                          display="spinner"
                          onChange={handleChange}
                          textColor={colors["grey-900"]}
                          themeVariant="light"
                          minimumDate={minDate}
                          maximumDate={maxDate}
                          style={styles.picker}
                        />
                      </View>
                    )}

                    {currentPickerMode === "time" && (
                      <View style={styles.pickerWrapper}>
                        <DateTimePicker
                          value={tempValue || new Date()}
                          mode="time"
                          display="spinner"
                          onChange={handleChange}
                          themeVariant="light"
                          style={styles.picker}
                          minimumDate={minDate}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors["grey-900"],
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: colors["grey-50"],
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 12,
  },
  inputText: {
    color: colors["grey-900"],
    ...typography.body.large.regular,
  },
  placeholder: {
    color: colors["grey-400"],
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
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    height: 300,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    width: "100%",
  },
  confirmButton: {
    color: colors["primary-600"],
    ...typography.body.large.bold,
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
    flex: 1,
  },
  picker: {
    width: "100%",
  },
});

export default DateTimePickerInput;

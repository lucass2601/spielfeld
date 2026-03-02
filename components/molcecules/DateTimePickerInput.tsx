import { View, Pressable, Text, StyleSheet } from "react-native";
import { useCallback, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import IconCalendar from "@/assets/icons/icon-calendar.svg";
import IconClose from "@/assets/icons/icon-close.svg";
import IconCheck from "@/assets/icons/icon-check.svg";

import { formatDateTime } from "@/utils/dateUtils";
import { colors, typography } from "@/theme/theme";

interface DateTimePickerInputProps {
  label?: string;
  placeholder: string;
  value?: Date;
  onChange: (date: Date) => void;
}

const DateTimePickerInput = ({
  label,
  placeholder,
  value,
  onChange,
}: DateTimePickerInputProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());

  const openSheet = () => {
    setTempDate(value ?? new Date());
    sheetRef.current?.present();
  };

  const handleClose = () => {
    sheetRef.current?.dismiss();
  };

  const handleConfirm = () => {
    onChange(tempDate);
    sheetRef.current?.dismiss();
  };

  const handleChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (selected) setTempDate(selected);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Pressable style={styles.inputContainer} onPress={openSheet}>
          <IconCalendar height={20} width={20} color={colors["grey-400"]} />
          <Text style={[styles.inputText, !value && styles.placeholder]}>
            {value ? formatDateTime(value.toISOString()) : placeholder}
          </Text>
        </Pressable>
      </View>

      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView>
          <View style={styles.sheetHeader}>
            <Pressable onPress={handleClose}>
              <IconClose color={colors["primary-600"]} />
            </Pressable>
            <Text style={styles.sheetTitle}>Select Date</Text>
            <Pressable onPress={handleConfirm}>
              <IconCheck color={colors["success-600"]} />
            </Pressable>
          </View>
          <View style={styles.sheetContent}>
            <DateTimePicker
              textColor={colors["grey-900"]}
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={handleChange}
              style={styles.picker}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default DateTimePickerInput;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    ...typography.body.medium.semibold,
    color: colors["grey-900"],
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
  sheetBackground: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  handleIndicator: {
    backgroundColor: colors["grey-300"],
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sheetTitle: {
    color: colors["grey-900"],
    ...typography.body.large.bold,
  },
  sheetContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  picker: {
    width: "100%",
  },
});

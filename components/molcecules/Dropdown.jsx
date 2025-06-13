import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { useState } from "react";

import IconChevronDown from "@/assets/icons/icon-chevron-down.svg";
import IconClose from "@/assets/icons/icon-close.svg";

import { colors, typography } from "@/theme/theme";
import AppBar from "./AppBar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ScreenContainer from "../layouts/ScreenContainer";
import ParticipantEntity from "./ParticipantEntity";

export default function Dropdown({
  data,
  onChange,
  placeholder,
  value,
  modalTitle,
}) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const onSelect = (item) => {
    onChange(item);
    setExpanded(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={toggleExpanded}>
        <Image
          style={styles.buttonImage}
          source={
            value?.imageUri
              ? { uri: value.imageUri }
              : require("@/assets/images/icon.png")
          }
        />
        <View style={styles.button}>
          <Text style={[styles.text, value.value && styles.textSelected]}>
            {value.label || placeholder}
          </Text>
          <IconChevronDown color={colors["grey-400"]} height={24} width={24} />
        </View>
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} animationType="slide">
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.modalContainer}>
                <AppBar
                  title={modalTitle}
                  iconLeft={
                    <IconClose
                      color={colors["grey-900"]}
                      width={24}
                      height={24}
                    />
                  }
                  backPress={toggleExpanded}
                />
                <ScreenContainer>
                  <FlatList
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 12 }} />
                    )}
                    keyExtractor={(item) => item.value}
                    data={data}
                    renderItem={({ item }) => (
                      <ParticipantEntity
                        onPress={() => onSelect(item)}
                        imageUri={item.imageUri}
                        name={item.label}
                        showIcon={false}
                      />
                    )}
                  />
                </ScreenContainer>
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  text: {
    color: colors["grey-400"],
    ...typography.body.medium.medium,
  },
  textSelected: {
    color: colors["grey-900"],
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  buttonImage: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors["grey-50"],
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    flex: 1,
  },
});

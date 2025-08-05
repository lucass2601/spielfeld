import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { colors, typography } from "@/theme/theme";
import SegmentedControl from "./SegmentedControl";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

import IconClose from "@/assets/icons/icon-close.svg";
import Textarea from "../atoms/Textarea";

const AddTeamsModal = ({ onAddTeams, onClose }) => {
  const [mode, setMode] = useState("single"); // "single" oder "bulk"
  const [singleName, setSingleName] = useState("");
  const [bulkNames, setBulkNames] = useState("");

  const handleAddTeams = () => {
    if (mode === "single" && singleName.trim()) {
      onAddTeams([singleName.trim()]);
      setSingleName("");
      onClose();
    }

    if (mode === "bulk" && bulkNames.trim()) {
      const names = bulkNames
        .split(/\n|,/)
        .map((n) => n.trim())
        .filter(Boolean);

      if (names.length > 0) {
        onAddTeams(names);
        setBulkNames("");
        onClose();
      }
    }
  };

  return (
    <View style={{ paddingHorizontal: 24, paddingVertical: 32, flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable onPress={onClose}>
          <IconClose height={24} weight={24} color={colors["primary-600"]} />
        </Pressable>
        <Text
          style={{
            ...typography.body.large.bold,
            color: colors["grey-900"],
          }}
        >
          Add teams
        </Text>
        <View style={{ height: 24, width: 24 }}></View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 16,
          flex: 1,
        }}
      >
        <SegmentedControl
          selectedValue={mode}
          options={[
            { label: "Single", value: "single" },
            { label: "Bulk", value: "bulk" },
          ]}
          onChange={(newMode) => setMode(newMode)}
        />

        <View style={{ marginBottom: "auto", marginTop: 32 }}>
          {/* Inputs */}
          {mode === "single" ? (
            <Input
              placeholder="Enter team"
              value={singleName}
              onChangeText={(newName) => setSingleName(newName)}
            />
          ) : (
            <Textarea
              placeholder="Enter team names separated by commas or new lines"
              value={bulkNames}
              onChangeText={(newNames) => setBulkNames(newNames)}
            />
          )}
        </View>

        <View>
          <Button label="Save" onPress={handleAddTeams} />
        </View>
      </View>
    </View>
  );
};

export default AddTeamsModal;

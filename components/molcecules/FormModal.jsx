import { Modal, View, Text } from "react-native";

import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

import { colors, typography } from "@/theme/theme";

export default function FormModal({
  visible,
  title,
  children,
  onCancel,
  onSave,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 24,
            width: "90%",
          }}
        >
          <Text style={[typography.body.large.bold, { marginBottom: 16 }]}>
            {title}
          </Text>

          {children}

          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button variant="tertiary" label="Cancel" onPress={onCancel} />
            <Button label="Save" onPress={onSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

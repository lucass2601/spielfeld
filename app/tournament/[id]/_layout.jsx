import { Slot, useRouter, usePathname } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";

import AppBar from "@/components/molcecules/AppBar";
import { colors, typography } from "@/theme/theme";

export default function TournamentLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const tabs = [
    { name: "General", href: `/tournament/${id}/general` },
    { name: "Participants", href: `/tournament/${id}/participants` },
    { name: "Rules", href: `/tournament/${id}/rules` },
    { name: "Schedule", href: `/tournament/${id}/schedule` },
    { name: "Preview", href: `/tournament/${id}/preview` },
  ];

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <AppBar
        title="Tournament Details"
        backPress={() => {
          router.replace("/(tabs)");
          router.dismissAll();
        }}
      />
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors["grey-100"],
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: 24,
              gap: 8,
            }}
          >
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Pressable
                  key={tab.href}
                  onPress={() => router.push(tab.href)}
                  style={{
                    marginTop: 32,
                    paddingBottom: 16,
                    paddingHorizontal: 16,
                    borderBottomWidth: isActive && 2,
                    borderBottomColor: isActive && colors["primary-600"],
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: isActive ? colors["grey-900"] : colors["grey-400"],
                      ...typography.body.small.semibold,
                    }}
                  >
                    {tab.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <Slot />
    </View>
  );
}

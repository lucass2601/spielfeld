import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@/theme/theme";

import Avatar from "@/components/atoms/Avatar";
import { RoundRobinRow } from "@/types/tournament";
import { ScrollView } from "react-native-gesture-handler";

const RoundRobinTable = ({
  standingsData,
}: {
  standingsData: RoundRobinRow[];
}) => {
  const isEmpty = !standingsData || standingsData.length === 0;

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.headerText]}>#</Text>
        <Text
          style={[
            styles.cell,
            styles.headerText,
            { flex: 1, textAlign: "left" },
          ]}
        >
          Team
        </Text>
        <Text style={[styles.cell, styles.headerText]}>GP</Text>
        <Text style={[styles.cell, styles.headerText]}>W</Text>
        <Text style={[styles.cell, styles.headerText]}>T</Text>
        <Text style={[styles.cell, styles.headerText]}>L</Text>
        <Text style={[styles.cell, styles.headerText]}>GD</Text>
        <Text style={[styles.cell, styles.headerText]}>PTS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isEmpty ? (
          <View style={styles.emptyMessage}>
            <Text style={styles.emptyTitle}>No standings yet</Text>
            <Text style={styles.emptySubtitle}>Add teams to see the table</Text>
          </View>
        ) : (
          standingsData.map((item, index) => (
            <View key={index} style={[styles.row, { marginTop: 16 }]}>
              <Text style={styles.cell}>{index + 1}</Text>

              <View style={[styles.teamCell, { flex: 1 }]}>
                <Avatar
                  uri={item.imageUri}
                  type="team"
                  style={styles.teamImage}
                />
                <Text
                  style={styles.teamName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
              <Text style={styles.cell}>{item.gamesPlayed}</Text>
              <Text style={styles.cell}>{item.wins}</Text>
              <Text style={styles.cell}>{item.ties}</Text>
              <Text style={styles.cell}>{item.loses}</Text>
              <Text style={styles.cell}>
                {item.goalDifference > 0
                  ? `+${item.goalDifference.toString()}`
                  : item.goalDifference.toString()}
              </Text>
              <Text style={styles.cell}>{item.points}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    width: 32,
    textAlign: "center",
    ...typography.body.medium.bold,
  },
  headerText: {
    paddingVertical: 8,
    color: colors["grey-500"],
    ...typography.body.small.bold,
  },
  teamCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  teamImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors["grey-200"],
  },
  teamName: {
    flex: 1,
    textAlign: "left",
    ...typography.body.medium.bold,
  },
  emptyMessage: {
    alignItems: "center",
    marginTop: 40,
    gap: 6,
  },
  emptyTitle: {
    ...typography.body.large.bold,
    color: colors["grey-800"],
  },
  emptySubtitle: {
    ...typography.body.small.regular,
    color: colors["grey-500"],
  },
});

export default RoundRobinTable;

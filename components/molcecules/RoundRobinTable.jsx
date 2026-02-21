import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@/theme/theme";

import Avatar from "@/components/atoms/Avatar";

const RoundRobinTable = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <View style={styles.table}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
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

      {isEmpty ? (
        <View style={styles.emptyMessage}>
          <Text style={styles.emptyTitle}>No standings yet</Text>
          <Text style={styles.emptySubtitle}>Add teams to see the table</Text>
        </View>
      ) : (
        data.map((item, index) => (
          <View key={index} style={[styles.row, { marginTop: 16 }]}>
            <Text style={styles.cell}>{index + 1}</Text>

            <View style={[styles.teamCell, { flex: 1 }]}>
              <Avatar uri={item.imageUri} type="team" style={styles.teamImage} />
              <Text
                style={styles.teamName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
            <Text style={styles.cell}>{item.gp}</Text>
            <Text style={styles.cell}>{item.w}</Text>
            <Text style={styles.cell}>{item.t}</Text>
            <Text style={styles.cell}>{item.l}</Text>
            <Text style={styles.cell}>{(item.gd > 0 && "+") + item.gd}</Text>
            <Text style={styles.cell}>{item.pts}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {},

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

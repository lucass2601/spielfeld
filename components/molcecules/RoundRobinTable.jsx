import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, typography } from "@/theme/theme";

const RoundRobinTable = ({ data }) => {
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
        <Text style={[styles.cell, styles.headerText]}>PTS</Text>
      </View>

      {/* Rows */}
      {data.map((item, index) => (
        <View key={index} style={[styles.row, { marginTop: 16 }]}>
          <Text style={styles.cell}>{index + 1}</Text>

          <Text style={[styles.cell, { flex: 1, textAlign: "left" }]}>
            {item.name}
          </Text>
          <Text style={styles.cell}>{item.gp}</Text>
          <Text style={styles.cell}>{item.w}</Text>
          <Text style={styles.cell}>{item.t}</Text>
          <Text style={styles.cell}>{item.l}</Text>
          <Text style={styles.cell}>{item.pts}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {},

  row: {
    flexDirection: "row",
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
});

export default RoundRobinTable;

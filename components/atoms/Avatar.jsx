import { Image, StyleSheet } from "react-native";
import { colors } from "@/theme/theme";

import tournamentPlaceholder from "@/assets/images/tournament-placeholder.png";
import teamPlaceholder from "@/assets/images/team-placeholder.png";
import playerPlaceholder from "@/assets/images/player-placeholder.png";

const PLACEHOLDERS = {
  tournament: tournamentPlaceholder,
  team: teamPlaceholder,
  player: playerPlaceholder,
};

/**
 * Circular avatar image with automatic placeholder fallback.
 *
 * Props:
 *   uri    {string|null}        - image URI; falls back to placeholder when falsy
 *   type   {"tournament"|"team"|"player"}   - determines which placeholder to show (default "team")
 *   style  {object}            - applied to the Image; controls size, borderRadius, etc.
 */
export default function Avatar({ uri, type = "team", style }) {
  return (
    <Image
      style={[styles.base, style]}
      source={uri ? { uri } : PLACEHOLDERS[type]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors["grey-200"],
  },
});

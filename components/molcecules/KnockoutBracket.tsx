import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Match, Matchday } from "@/types/match";
import BracketMatchItem from "./BracketMatchItem";
import { colors, typography } from "@/theme/theme";
import getKnockoutRoundAbbrev from "@/utils/getKnockoutRoundAbbrev";
import getKnockoutRoundLabel from "@/utils/getKnockoutRoundLabel";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TENTACLE_WIDTH = 30;
const LINE_RADIUS = 8;
const MATCH_BOX_WIDTH = SCREEN_WIDTH / 2.6;
const MATCH_GAP = 16;
const MATCH_BOX_HEIGHT = 80;
const MATCH_SLOT_HEIGHT = MATCH_BOX_HEIGHT + MATCH_GAP;
const MATCH_BOX_HALF_HEIGHT = MATCH_SLOT_HEIGHT / 2;
const SNAP_TO_INTERVAL = MATCH_BOX_WIDTH + TENTACLE_WIDTH * 2 + 5;
const SCROLL_RANGE = [3, 2, 1, 0, -1, -2, -3];

const customMargin = (rootIndex: number, scrollX: SharedValue<number>) => {
  "worklet";
  const inputRange = SCROLL_RANGE.map((distance) => {
    return SNAP_TO_INTERVAL * (rootIndex - distance);
  });
  const outputRange = SCROLL_RANGE.map((distance) => {
    return (
      Math.pow(2, distance - 1) * MATCH_SLOT_HEIGHT - MATCH_BOX_HALF_HEIGHT
    );
  });
  return interpolate(
    scrollX.value,
    inputRange,
    outputRange,
    Extrapolation.CLAMP,
  );
};

const LeftTentacle = ({
  roundIndex,
  isFirstRound,
}: {
  roundIndex: number;
  isFirstRound: boolean;
}) => {
  return (
    <View
      style={{
        // left: roundIndex % 2 === 0 ? -1.2 : -1,
        opacity: isFirstRound ? 0 : 1,
      }}
    >
      <View style={styles.leftTopTentacle} />
      <View style={styles.leftBottomTentacle} />
    </View>
  );
};

const RightTentacle = ({
  matchIndex,
  isFirstMatch,
  isLastMatch,
}: {
  matchIndex: number;
  isFirstMatch: boolean;
  isLastMatch: boolean;
}) => {
  return (
    <View style={{ height: "100%" }}>
      <View
        style={[
          styles.rightTopTentacle,
          {
            borderColor:
              isFirstMatch || matchIndex % 2 === 0
                ? "transparent"
                : colors["primary-400"],
            bottom: matchIndex % 2 === 0 ? 1 : -1,
          },
        ]}
      />
      <View
        style={[
          styles.rightBottomTentacle,
          {
            borderColor:
              isLastMatch || matchIndex % 2 !== 0
                ? "transparent"
                : colors["primary-400"],
          },
        ]}
      />
    </View>
  );
};

const Brackets = ({
  match,
  roundIndex,
  matchIndex,
  totalRounds,
  scrollX,
  isLastMatch,
}: {
  match: Match;
  roundIndex: number;
  matchIndex: number;
  totalRounds: number;
  scrollX: SharedValue<number>;
  isLastMatch: boolean;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const marginVertical = customMargin(roundIndex, scrollX);
    return {
      marginVertical: marginVertical,
    };
  });

  return (
    <View style={styles.bracketContainer}>
      <LeftTentacle roundIndex={roundIndex} isFirstRound={roundIndex === 0} />
      <Animated.View
        style={[{ paddingVertical: MATCH_GAP / 2 }, animatedStyle]}
      >
        <BracketMatchItem
          height={MATCH_BOX_HEIGHT}
          width={MATCH_BOX_WIDTH}
          match={match}
          teamAFallbackName={
            totalRounds > 0 && roundIndex > 0
              ? `Winner of ${getKnockoutRoundAbbrev(roundIndex - 1, totalRounds)}${matchIndex * 2 + 1}`
              : `BYE`
          }
          teamBFallbackName={
            totalRounds > 0 && roundIndex > 0
              ? `Winner of ${getKnockoutRoundAbbrev(roundIndex - 1, totalRounds)}${matchIndex * 2 + 2}`
              : `BYE`
          }
        />
      </Animated.View>
      <RightTentacle
        matchIndex={matchIndex}
        isFirstMatch={false}
        isLastMatch={isLastMatch}
      />
    </View>
  );
};

const Rounds = ({
  round,
  roundIndex,
  totalRounds,
  scrollX,
}: {
  round: Matchday;
  roundIndex: number;
  totalRounds: number;
  scrollX: SharedValue<number>;
}) => {
  return (
    <View>
      <Text style={styles.roundLabel}>
        {getKnockoutRoundLabel(roundIndex, totalRounds)}
      </Text>
      {round.matches.map((match: Match, matchIndex: number) => (
        <Brackets
          key={match.id}
          match={match}
          matchIndex={matchIndex}
          roundIndex={roundIndex}
          totalRounds={totalRounds}
          scrollX={scrollX}
          isLastMatch={round.matches.length === 1}
        />
      ))}
    </View>
  );
};

const KnockoutBracket = ({ matchdays }: { matchdays: Matchday[] }) => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      // how much the user scrolled to the left
      scrollX.value = contentOffset.x;
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        horizontal
        bounces={false}
        contentInsetAdjustmentBehavior="automatic"
        snapToInterval={SNAP_TO_INTERVAL}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        directionalLockEnabled={true}
        contentContainerStyle={styles.contentContainer}
      >
        {matchdays.map((round, index) => (
          <Rounds
            key={round.id}
            round={round}
            roundIndex={index}
            totalRounds={matchdays.length}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>
    </ScrollView>
  );
};

export default KnockoutBracket;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 24,
  },
  roundLabel: {
    ...typography.body.medium.semibold,
    color: colors["grey-500"],
    textAlign: "center",
    marginBottom: 8,
  },
  bracketContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftTopTentacle: {
    width: TENTACLE_WIDTH,
    height: 20,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    // borderBottomLeftRadius: LINE_RADIUS,
    borderColor: colors["primary-400"],
  },
  leftBottomTentacle: {
    width: TENTACLE_WIDTH,
    height: 20,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    // borderTopLeftRadius: LINE_RADIUS,
    borderColor: colors["primary-400"],
  },
  rightTopTentacle: {
    flex: 1,
    width: TENTACLE_WIDTH,
    borderWidth: 2,
    alignSelf: "baseline",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: LINE_RADIUS,
  },
  rightBottomTentacle: {
    flex: 1,
    width: TENTACLE_WIDTH,
    borderWidth: 2,
    alignSelf: "baseline",
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopEndRadius: LINE_RADIUS,
  },
});

import { useRef } from "react";
import { ScrollView, View } from "react-native";
import Button from "@/components/atoms/Button";

import { Match } from "@/types/match";

interface Round {
  id: string;
  matches: Match[];
}

interface RoundSelectorProps {
  rounds: Round[];
  getLabel: (index: number) => string;
  onSelect: (index: number) => void;
}

export default function RoundSelector({
  rounds,
  getLabel,
  onSelect,
}: RoundSelectorProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollViewWidth = useRef(0);
  const itemLayouts = useRef<Record<number, { x: number; width: number }>>({});

  const handleSelect = (index: number) => {
    onSelect(index);

    const layout = itemLayouts.current[index];
    if (layout && scrollViewRef.current) {
      const targetX = layout.x + layout.width / 2 - scrollViewWidth.current / 2;
      scrollViewRef.current.scrollTo({ x: targetX, animated: true });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onLayout={(e) => {
        scrollViewWidth.current = e.nativeEvent.layout.width;
      }}
      contentContainerStyle={{
        gap: 12,
        marginVertical: 24,
        paddingHorizontal: 24,
        flexDirection: "row",
      }}
    >
      {rounds.map((round, index) => (
        <View
          key={round.id}
          onLayout={(e) => {
            itemLayouts.current[index] = {
              x: e.nativeEvent.layout.x,
              width: e.nativeEvent.layout.width,
            };
          }}
        >
          <Button
            variant="tertiary"
            size="small"
            label={getLabel(index)}
            onPress={() => handleSelect(index)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

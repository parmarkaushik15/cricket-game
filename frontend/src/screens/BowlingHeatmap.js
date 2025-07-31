import React from "react";
import { View, Text } from "react-native";

/**
 * Placeholder for heatmap.
 * In real implementation, use react-native-svg for a pitch visualization.
 */
export default function BowlingHeatmap({ data }) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Bowling Heatmap (Sample):</Text>
      {data.map((point, idx) => (
        <Text key={idx}>
          L:{point.pitchLength.toFixed(1)}m | W:{point.pitchWidth.toFixed(1)}m → {point.outcome}
        </Text>
      ))}
    </View>
  );
}

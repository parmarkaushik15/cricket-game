import React from "react";
import { View, Text } from "react-native";

/**
 * This is a placeholder.
 * In real implementation, you could use react-native-svg for an actual wagon wheel chart
 */
export default function WagonWheel({ data }) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Wagon Wheel (Degrees):</Text>
      <Text>{data.join(", ")}</Text>
    </View>
  );
}

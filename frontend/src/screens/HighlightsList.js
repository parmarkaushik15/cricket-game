import React from "react";
import { View, Text } from "react-native";

export default function HighlightsList({ highlights }) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Highlights:</Text>
      {highlights.map((h, idx) => (
        <Text key={idx}>
          {h.ballNumber} - {h.event}
        </Text>
      ))}
    </View>
  );
}

import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function MatchCard({ match, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#f2f2f2"
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {match.teams[0]} vs {match.teams[1]} ({match.type})
      </Text>
      <Text>Overs: {match.overs}</Text>
    </TouchableOpacity>
  );
}

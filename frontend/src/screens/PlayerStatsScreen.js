import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getPlayers } from "../services/api";

export default function PlayerStatsScreen() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>👤 Player Statistics</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.name} ({item.country}) - {item.role}
            </Text>
            <Text>
              Matches: {item.stats.matches} | Runs: {item.stats.runs} | Wickets: {item.stats.wickets}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

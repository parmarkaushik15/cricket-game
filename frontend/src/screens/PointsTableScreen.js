import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getTournaments } from "../services/api";

export default function PointsTableScreen() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    const data = await getTournaments();
    setTournaments(data);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>🏆 Tournament Points Table</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name} ({item.type})</Text>
            {item.pointsTable.map((team, idx) => (
              <Text key={idx}>
                {team.team}: {team.points} pts (W:{team.won} L:{team.lost})
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

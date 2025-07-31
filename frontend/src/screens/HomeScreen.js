import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { API_BASE } from "../services/api";
import { DEFAULT_TEAMS, MATCH_TYPES, SHOT_TYPES } 
    from "../constants/cricketConstants";


export default function HomeScreen({ navigation }) {
  const [matches, setMatches] = useState([]);

  // Fetch existing matches
  useEffect(() => {
    fetch(`${API_BASE}/matches`)
      .then(res => res.json())
      .then(setMatches)
      .catch(console.error);
  }, []);

  // Create a default match
  const startDefaultMatch = async () => {
    const body = {
      teamA: DEFAULT_TEAMS[0].name,
      teamB: DEFAULT_TEAMS[1].name,
      type: "T20",
      status: "Live",
      scorecard: DEFAULT_TEAMS[0].players.map(p => ({
        batsman: p, runs: 0, balls: 0
      })),
      bowling: DEFAULT_TEAMS[1].players.map(p => ({
        bowler: p, overs: 0, runs: 0
      })),
    };

    const res = await fetch(`${API_BASE}/matches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const newMatch = await res.json();
    setMatches([...matches, newMatch]);
    navigation.navigate("MatchScreen", { matchId: newMatch._id });
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Cricket Game
      </Text>

      <Button title="Start Default Match" onPress={startDefaultMatch} />

      {matches.map(match => (
        <View
          key={match._id}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#eee",
            borderRadius: 8
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {match.teamA} vs {match.teamB}
          </Text>
          <Text>Status: {match.status}</Text>
          <Button
            title="Play Match"
            onPress={() => navigation.navigate("MatchScreen", { matchId: match._id })}
          />
        </View>
      ))}
    </ScrollView>
  );
}

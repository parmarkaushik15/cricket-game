import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { SHOT_TYPES, SHOT_DIRECTIONS, BOWLING_TYPES } from "../constants/cricketConstants";
import { socket, joinMatch, sendBallEvent } from "../services/socket";

export default function MatchScreen({ route }) {
  const { matchId } = route.params || { matchId: "defaultMatch" };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    joinMatch(matchId);

    socket.on("ballUpdate", (data) => {
      setEvents((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("ballUpdate");
    };
  }, []);

  const handleShot = (shot, direction) => {
    const randomBowling = BOWLING_TYPES[Math.floor(Math.random() * BOWLING_TYPES.length)];
    const randomRuns = Math.floor(Math.random() * 7); // 0-6

    sendBallEvent({
      matchId,
      batsman: "Virat Kohli",
      bowler: "Jasprit Bumrah",
      shot,
      direction,
      ballType: randomBowling,
      runs: randomRuns,
      event: randomRuns === 4 ? "FOUR" : randomRuns === 6 ? "SIX" : "RUN",
      ballNumber: `OV${events.length + 1}.${(events.length % 6) + 1}`
    });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Match ID: {matchId}</Text>
      <Text style={{ marginVertical: 10 }}>Select a shot:</Text>
      {SHOT_TYPES.map((shot, idx) => (
        <Button
          key={idx}
          title={`Play ${shot}`}
          onPress={() => handleShot(shot, SHOT_DIRECTIONS[Math.floor(Math.random() * SHOT_DIRECTIONS.length)])}
        />
      ))}
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Events:</Text>
        {events.map((e, i) => (
          <Text key={i}>
            {e.ballNumber} | {e.batsman} → {e.shot} ({e.runs} runs)
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

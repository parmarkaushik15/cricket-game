import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tournaments"; // Adjust if on device/emulator

export default function TournamentScreen({ navigation }) {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const res = await axios.get(API_URL);
      setTournaments(res.data);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
    }
  };

  const renderPointsTable = (pointsTable) => {
    if (!pointsTable || pointsTable.length === 0) {
      return <Text style={styles.noData}>No points data yet</Text>;
    }
    return (
      <View style={styles.pointsTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Team</Text>
          <Text style={styles.tableHeaderText}>P</Text>
          <Text style={styles.tableHeaderText}>W</Text>
          <Text style={styles.tableHeaderText}>L</Text>
          <Text style={styles.tableHeaderText}>Pts</Text>
        </View>
        {pointsTable.map((team, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.tableCell}>{team.played || 0}</Text>
            <Text style={styles.tableCell}>{team.won || 0}</Text>
            <Text style={styles.tableCell}>{team.lost || 0}</Text>
            <Text style={styles.tableCell}>{team.points || 0}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name || "Unnamed Tournament"}</Text>
      <Text style={styles.subtitle}>{item.type || "Unknown Type"}</Text>

      <Text style={styles.sectionTitle}>Points Table:</Text>
      {renderPointsTable(item.pointsTable)}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Home", { tournamentId: item._id })
        }
      >
        <Text style={styles.buttonText}>View Matches</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noData}>No tournaments yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f6fa" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#0A3D62" },
  subtitle: { fontSize: 14, color: "#576574", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  noData: { fontSize: 14, color: "#8395a7", textAlign: "center", marginVertical: 10 },
  pointsTable: { marginTop: 10, marginBottom: 10 },
  tableHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  tableHeaderText: { fontWeight: "bold", color: "#222f3e", width: 50, textAlign: "center" },
  tableRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  teamName: { width: 80, color: "#222f3e" },
  tableCell: { width: 50, textAlign: "center", color: "#222f3e" },
  button: {
    backgroundColor: "#0A3D62",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

// app/navigation.tsx

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";

import MapView, {
  Marker,
  Polyline,
} from "react-native-maps";

const { width, height } = Dimensions.get("window");

type Severity = "safe" | "moderate" | "danger";

type FloodMarker = {
  id: string;
  latitude: number;
  longitude: number;
  severity: Severity;
  title: string;
  description?: string;
};

const initialMarkers: FloodMarker[] = [
  {
    id: "1",
    latitude: 7.0731,
    longitude: 125.6128,
    severity: "danger",
    title: "Roxas Avenue",
  },
  {
    id: "2",
    latitude: 7.0765,
    longitude: 125.615,
    severity: "moderate",
    title: "Matina Crossing",
  },
  {
    id: "3",
    latitude: 7.071,
    longitude: 125.618,
    severity: "safe",
    title: "Bajada",
  },
];

const routeCoordinates = [
  { latitude: 7.071, longitude: 125.618 },
  { latitude: 7.0731, longitude: 125.6128 },
  { latitude: 7.0765, longitude: 125.615 },
];

const vehicleLimits = {
  sedan: 0.3,
  suv: 0.5,
  truck: 0.8,
  pedestrian: 0.2,
};

export default function NavigationScreen() {
  const [markers, setMarkers] = useState(initialMarkers);
  const [selectedVehicle] = useState("sedan");

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selectedSeverity, setSelectedSeverity] =
    useState<Severity>("moderate");

  const [note, setNote] = useState("");

  const [loadingRoute, setLoadingRoute] = useState(false);

  const routeStatus = useMemo(() => {
    const hasDanger = markers.some(
      (m) => m.severity === "danger"
    );

    if (selectedVehicle === "sedan" && hasDanger) {
      return {
        status: "Unsafe Route Detected",
        color: "#ff4444",
      };
    }

    return {
      status: "Safe Route Found",
      color: "#2F4A3E",
    };
  }, [markers]);

  const getMarkerColor = (severity: Severity) => {
    switch (severity) {
      case "safe":
        return "green";
      case "moderate":
        return "orange";
      case "danger":
        return "red";
      default:
        return "gray";
    }
  };

  const handleMapPress = (event: any) => {
    const coordinate = event.nativeEvent.coordinate;

    setSelectedCoords(coordinate);

    setModalVisible(true);
  };

  const submitReport = () => {
    if (!selectedCoords) return;

    setLoadingRoute(true);

    const newMarker: FloodMarker = {
      id: Date.now().toString(),
      latitude: selectedCoords.latitude,
      longitude: selectedCoords.longitude,
      severity: selectedSeverity,
      title: "Community Report",
      description: note,
    };

    setTimeout(() => {
      setMarkers((prev) => [...prev, newMarker]);

      setLoadingRoute(false);

      setModalVisible(false);

      setNote("");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 7.0731,
          longitude: 125.6128,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={getMarkerColor(marker.severity)}
            title={marker.title}
            description={marker.description}
          />
        ))}

        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={5}
          strokeColor="#22BCDE"
        />
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend</Text>

        <View style={styles.legendRow}>
          <View
            style={[styles.dot, { backgroundColor: "red" }]}
          />
          <Text>Dangerous</Text>
        </View>

        <View style={styles.legendRow}>
          <View
            style={[styles.dot, { backgroundColor: "orange" }]}
          />
          <Text>Moderate</Text>
        </View>

        <View style={styles.legendRow}>
          <View
            style={[styles.dot, { backgroundColor: "green" }]}
          />
          <Text>Safe</Text>
        </View>
      </View>

      {/* Fake rerouting banner */}
      {loadingRoute && (
        <View style={styles.banner}>
          <ActivityIndicator color="white" />

          <Text style={styles.bannerText}>
            Recalculating safer route...
          </Text>
        </View>
      )}

      {/* Bottom info card */}
      <View style={styles.bottomCard}>
        <Text style={styles.cardTitle}>
          Moderate Flood Area
        </Text>

        <Text style={styles.cardText}>
          Flood depth: ~0.4m
        </Text>

        <Text
          style={[
            styles.cardStatus,
            { color: routeStatus.color },
          ]}
        >
          {routeStatus.status}
        </Text>

        <Text style={styles.cardNote}>
          Reduce speed / consider alternate route
        </Text>
      </View>

      {/* Report Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Submit Flood Report
          </Text>

          <View style={styles.severityContainer}>
            {["safe", "moderate", "danger"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.severityButton,
                  selectedSeverity === level && {
                    backgroundColor: "#22BCDE",
                  },
                ]}
                onPress={() =>
                  setSelectedSeverity(level as Severity)
                }
              >
                <Text>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Optional note..."
            value={note}
            onChangeText={setNote}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitReport}
          >
            <Text style={styles.submitText}>
              Submit Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ marginTop: 20 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1EA",
  },

  map: {
    width,
    height,
  },

  legend: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },

  legendTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    marginRight: 8,
  },

  bottomCard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    marginBottom: 6,
  },

  cardStatus: {
    fontWeight: "700",
    marginBottom: 8,
  },

  cardNote: {
    color: "#666",
  },

  banner: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: "#2F4A3E",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  bannerText: {
    color: "white",
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F5F1EA",
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },

  severityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  severityButton: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    width: "30%",
    alignItems: "center",
  },

  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
  },

  submitButton: {
    backgroundColor: "#22BCDE",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  submitText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
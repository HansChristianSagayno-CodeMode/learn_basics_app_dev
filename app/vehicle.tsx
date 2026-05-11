import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  
  import { useState } from "react";
  import { router } from "expo-router";
  
  const vehicles = [
    "Sedan",
    "SUV",
    "Truck",
    "Pedestrian",
    "Other",
  ];
  
  export default function Vehicle() {
    const [selectedVehicle, setSelectedVehicle] =
      useState("");
  
    const [showDropdown, setShowDropdown] =
      useState(false);
  
    return (
      <View style={styles.container}>
  
        <Text style={styles.close}>✕</Text>
  
        <View style={styles.headerContainer}>
  
          <Text style={styles.title}>
            Choose Your Vehicle
          </Text>
  
          <Text style={styles.description}>
            Select your vehicle type to calculate
            safe routes based on flood depth limits.
          </Text>
  
        </View>
  
        <View style={styles.vehicleContainer}>
  
          <TouchableOpacity
            style={styles.vehicleCard}
            onPress={() =>
              setShowDropdown(!showDropdown)
            }
          >
            <Text style={styles.vehicleText}>
              {selectedVehicle || "Select Vehicle"}
            </Text>
          </TouchableOpacity>
  
          {showDropdown &&
            vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle}
                style={[
                  styles.dropdownItem,
                  selectedVehicle === vehicle &&
                    styles.selectedCard,
                ]}
                onPress={() => {
                  setSelectedVehicle(vehicle);
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.vehicleText,
                    selectedVehicle === vehicle &&
                      styles.selectedText,
                  ]}
                >
                  {vehicle}
                </Text>
              </TouchableOpacity>
            ))}
  
        </View>
  
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => router.push("/loading")}
        >
          <Text style={styles.doneText}>
            DONE
          </Text>
        </TouchableOpacity>
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F1EA",
      paddingHorizontal: 25,
      paddingTop: 4,
    },
  
    close: {
      fontSize: 24,
      color: "#333",
      marginBottom: 20,
    },
  
    headerContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
  
    title: {
      fontSize: 34,
      fontWeight: "800",
      color: "#111",
      textAlign: "center",
      marginBottom: 15,
      marginTop: -50,
    },
  
    description: {
      fontSize: 15,
      color: "#666",
      textAlign: "center",
      lineHeight: 24,
    },
  
    vehicleContainer: {
      gap: 18,
    },
  
    vehicleCard: {
      backgroundColor: "#F0F0F0",
      paddingVertical: 18,
      borderRadius: 14,
      paddingHorizontal: 20,
      borderWidth: 2,
      borderColor: "transparent",
    },
  
    dropdownItem: {
      backgroundColor: "#F0F0F0",
      paddingVertical: 18,
      borderRadius: 14,
      paddingHorizontal: 20,
      borderWidth: 2,
      borderColor: "transparent",
    },
  
    selectedCard: {
      backgroundColor: "#22BCDE",
      borderColor: "#0B8DAA",
    },
  
    vehicleText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
    },
  
    selectedText: {
      color: "white",
    },
  
    doneButton: {
      marginTop: 40,
      backgroundColor: "#22BCDE",
      paddingVertical: 18,
      borderRadius: 14,
      alignItems: "center",
    },
  
    doneText: {
      color: "white",
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: 1,
    },
  });
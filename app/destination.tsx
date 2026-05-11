import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  
  import { router } from "expo-router";
  
  export default function Destination() {
    return (
      <View style={styles.container}>
  
       
        <Text style={styles.close}>✕</Text>
  
        {/* Header */}
        <View style={styles.headerContainer}>
  
          <Text style={styles.title}>
            Enter Your Destination
          </Text>
  
          <Text style={styles.description}>
            Enter your destination or use your
            current location to find the safest
            route based on flood conditions.
          </Text>
  
        </View>
  
       
        <TouchableOpacity style={styles.locationButton}
        
        >
          <Text style={styles.locationText}>
            📍 Use current location
          </Text>
        </TouchableOpacity>
  
       
        <TextInput
          placeholder="Enter a new address"
          placeholderTextColor="#999"
          style={styles.input}
        />
  
        {/* Suggested Locations */}
        <View style={styles.suggestionContainer}>
  
          <TouchableOpacity style={styles.locationCard}>
            <Text style={styles.locationTitle}>
              Davao International Airport
            </Text>
  
            <Text style={styles.locationSubtitle}>
              Davao Del Sur
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.locationCard}>
            <Text style={styles.locationTitle}>
              Roxas Avenue
            </Text>
  
            <Text style={styles.locationSubtitle}>
              Davao Del Sur
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.locationCard}>
            <Text style={styles.locationTitle}>
              Matina Crossing
            </Text>
  
            <Text style={styles.locationSubtitle}>
              Davao Del Sur
            </Text>
          </TouchableOpacity>
  
        </View>
  
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/vehicle")}
        >
          <Text style={styles.nextButtonText}>
            CONTINUE
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
      marginBottom: -35,
    },
  
    headerContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
  
    title: {
      fontSize: 34,
      fontWeight: "800",
      color: "#111",
      textAlign: "center",
      marginBottom: 15,
    },
  
    description: {
      fontSize: 15,
      color: "#666",
      textAlign: "center",
      lineHeight: 24,
    },
  
    locationButton: {
      borderWidth: 1.5,
      borderColor: "#22BCDE",
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
      marginBottom: 20,
    },
  
    locationText: {
      color: "#22BCDE",
      fontSize: 16,
      fontWeight: "600",
    },
  
    input: {
      backgroundColor: "#F0F0F0",
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 18,
      fontSize: 15,
      marginBottom: 25,
    },
  
    suggestionContainer: {
      gap: 18,
    },
  
    locationCard: {
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
  
    locationTitle: {
      fontSize: 17,
      fontWeight: "600",
      color: "#222",
      marginBottom: 4,
    },
  
    locationSubtitle: {
      fontSize: 13,
      color: "#777",
    },
  
    nextButton: {
      marginTop: 40,
      backgroundColor: "#22BCDE",
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
    },
  
    nextButtonText: {
      color: "white",
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: 1,
    },
  });
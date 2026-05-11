import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
  } from "react-native";
  
  import { useEffect } from "react";
  import { router } from "expo-router";
  
  export default function Loading() {
  
    useEffect(() => {
  
      const timer = setTimeout(() => {
        router.push("/navigation" as any);
      }, 3000);
  
      return () => clearTimeout(timer);
  
    }, []);
  
    return (
      <View style={styles.container}>
  
        {/* Header */}
        <View style={styles.header}>
  
          <Text style={styles.headerText}>
            Route Analysis
          </Text>
  
        </View>
  
        {/* Loading Content */}
        <View style={styles.loadingContainer}>
  
          <ActivityIndicator
            size="large"
            color="#22BCDE"
          />
  
          <Text style={styles.loadingTitle}>
            Analyzing Flood Conditions
          </Text>
  
          <Text style={styles.loadingDescription}>
            Comparing water depth, checking vehicle
            safety limits, and searching for safer
            alternative routes.
          </Text>
  
        </View>
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F1EA",
    },
  
    header: {
      paddingTop: 70,
      paddingBottom: 20,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#E5E5E5",
    },
  
    headerText: {
      fontSize: 22,
      fontWeight: "700",
      color: "#111",
    },
  
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 35,
    },
  
    loadingTitle: {
      marginTop: 30,
      fontSize: 28,
      fontWeight: "800",
      color: "#111",
      textAlign: "center",
      marginBottom: 20,
    },
  
    loadingDescription: {
      fontSize: 15,
      color: "#666",
      textAlign: "center",
      lineHeight: 28,
    },
  });
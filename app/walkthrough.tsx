import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

export default function Walkthrough() {
  return (
    <View style={styles.container}>

      <View style={styles.header_container}>
        <Text style={styles.header_title}>
          WELCOME TO
        </Text>

        <Text style={styles.wave}>
          W.A.V.E
        </Text>
      </View>

      <View style={styles.logoPlaceholder}>
        <Text style={styles.logoText}>
          LOGO HERE
        </Text>
      </View>

      <View style={styles.bottom_container}>

        <Text style={styles.bottom_title_text}>
          Avoid Flooded Roads
        </Text>

        <Text style={styles.bottom_description}>
          Get real-time insights on flood levels and avoid
          dangerous routes before you even start your journey.
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/walkthrough2")}
      >
        <Text style={styles.buttonText}>
          NEXT
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1EA",
    alignItems: "center",
  },

  header_container: {
    marginTop: 10,
    alignItems: "center",
  },

  bottom_container: {
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 30,
  },

  bottom_title_text: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2F2F2F",
    marginBottom: 15,
    textAlign: "center",
  },

  bottom_description: {
    fontSize: 12,
    textAlign: "center",
    color: "#555",
    lineHeight: 28,
  },

  header_title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#000",
    lineHeight: 45,
  },

  wave: {
    fontSize: 44,
    fontWeight: "800",
    color: "#000",
    lineHeight: 45,
  },

  button: {
    backgroundColor: "#22bcde",
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 12,
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  logoPlaceholder: {
    marginTop: 50,
    width: 280,
    height: 250,
    borderWidth: 2,
    borderColor: "#2F4A3E",
    borderStyle: "dashed",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F4A3E",
  },
});
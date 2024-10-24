import { Text, View, StyleSheet } from "react-native";

export default function RefundsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.container__pageTitle}>Mis Devoluciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  container__pageTitle: {
    marginVertical: 20,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    color: "#555555",
  },
});

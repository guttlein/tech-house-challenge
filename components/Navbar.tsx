import { View, Image, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    <View style={styles.container}>
      {/* Menu */}
      <MaterialIcons name="menu" size={24} color="black" />
      {/* Search */}
      <MaterialIcons name="search" size={24} color="black" />
      {/* Logo */}
      <Image source={Logo} />
      {/* User */}
      <MaterialIcons name="person" size={24} color="black" />
      {/* Cart */}
      <View>
        <MaterialIcons name="shopping-cart" size={24} color="black" />
        <View style={styles.notificationBubble}>
          <Text style={styles.notificationText}>2</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  notificationBubble: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#CC3872",
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 7,
    fontWeight: "bold",
  },
});

export default Navbar;

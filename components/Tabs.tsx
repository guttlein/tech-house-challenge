import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../app/HomeScreen";
import TasksScreen from "../app/TasksScreen";
import RefundsScreen from "@/app/RefundsScreen";
import ComunicationsScreen from "@/app/ComunicationsScreen";
import BfsScreen from "@/app/BfsScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabNavBar() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#639605",
        tabBarInactiveTintColor: "#555555",
        tabBarIndicatorStyle: {
          backgroundColor: "#639605",
        },
        tabBarScrollEnabled: true,
      })}
    >
      <Tab.Screen
        options={{
          title: "Mis Datos",
          tabBarLabelStyle: { fontSize: 12, textTransform: "capitalize" },
          tabBarItemStyle: { width: "auto" },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "Mis Tareas",
          tabBarLabelStyle: { fontSize: 12, textTransform: "capitalize" },
          tabBarItemStyle: { width: "auto" },
        }}
        name="TasksScreen"
        component={TasksScreen}
      />
      <Tab.Screen
        options={{
          title: "Mis Devoluciones",
          tabBarLabelStyle: { fontSize: 12, textTransform: "capitalize" },
          tabBarItemStyle: { width: "auto" },
        }}
        name="RefundsScreen"
        component={RefundsScreen}
      />
      <Tab.Screen
        options={{
          title: "Mis Comunicaciones",
          tabBarLabelStyle: { fontSize: 12, textTransform: "capitalize" },
          tabBarItemStyle: { width: "auto" },
        }}
        name="ComunicationsScreen"
        component={ComunicationsScreen}
      />
      <Tab.Screen
        options={{
          title: "Mis Mejores Amigos",
          tabBarLabelStyle: { fontSize: 12, textTransform: "capitalize" },
          tabBarItemStyle: { width: "auto" },
        }}
        name="BfsScreen"
        component={BfsScreen}
      />
    </Tab.Navigator>
  );
}

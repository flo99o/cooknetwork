import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./screens/HomeScreen";
import { ProfilScreen } from "./screens/ProfilScreen";
import { BookScreen } from "./screens/BookScreen";
import Icon from "react-native-vector-icons/FontAwesome5";


export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
            } else if (route.name === "Profil") {
            }
            return <Icon/>;
          },
        })}
      >
        <Tab.Screen name="Profil" component={ProfilScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Book" component={BookScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

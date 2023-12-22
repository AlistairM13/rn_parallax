import { NavigationContainer, Route } from "@react-navigation/native";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";


export interface Game {
  title: string;
  poster: any;
  backdrop: any;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { game: Game };
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ route }) => {

            const headerIconColor = (route.name == "Details") ? "white" : "#0A79DF"
            const headerColor = (route.name == "Details") ? "black" : "white"

            return <View
              style={{
                width: "100%",
                height: 50,
                backgroundColor: headerColor,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
              >
                <MenuIcon headerIconColor={headerIconColor} />
                <Image source={require("./images/ps4_logo_mini.png")} style={{ width: 20, height: 20 }} />
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", gap: 20 }}
              >
                <Icon name="cart-outline" size={25} color={headerIconColor} />
                <Icon name="search" size={25} color={headerIconColor} />
              </View>
            </View>
          }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          // @ts-ignore
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const MenuIcon = ({
  headerIconColor
}: {
  headerIconColor: string
}) => {
  return <Pressable style={{ gap: 4 }}>
    <View style={{ width: 30, borderRadius: 2, height: 2, backgroundColor: headerIconColor }} />
    <View style={{ width: 30, borderRadius: 2, height: 2, backgroundColor: headerIconColor }} />
  </Pressable>
}

export default App;


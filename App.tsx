import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailsScreen";


interface Game {
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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


export default App;


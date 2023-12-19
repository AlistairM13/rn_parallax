
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;


const DATA = [
  {
    title: "Cyberpunk",
    poster: require("./images/cyberpunk_poster.jpg"),
    backdrop: require("./images/cyberpunk_backdrop.jpg"),
  },
  {
    title: "DOOM Eternal",
    poster: require("./images/doom_poster.jpg"),
    backdrop: require("./images/doom_backdrop.jpg"),
  },
  {
    title: "Ghostrunner",
    poster: require("./images/ghostrunner_poster.jpg"),
    backdrop: require("./images/ghostrunner_backdrop.jpg"),
  },
  {
    title: "The Last of Us",
    poster: require("./images/thelastofus_poster.jpg"),
    backdrop: require("./images/thelastofus_backdrop.jpg"),
  },
  {
    title: "Witcher 3: Wild Hunt",
    poster: require("./images/witcher3_poster.jpg"),
    backdrop: require("./images/witcher3_backdrop.jpg"),
  },
  {
    title: "Ghost of Tsushima",
    poster: require("./images/ghostoftsushima_poster.jpg"),
    backdrop: require("./images/ghostoftsushima_backdrop.jpg"),
  },
]

function App(): React.JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      <View>
        {DATA.map((game, index) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height
          ]

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })

          return <Animated.Image
            key={game.title}
            source={game.backdrop}
            style={{
              opacity,
              objectFit: "cover",
              position: "absolute",
              height,
              width
            }}
            blurRadius={5}
          />
        })}
      </View>
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        snapToInterval={height}
        decelerationRate="fast"
        snapToAlignment="center"
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height
          ]

          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [-height * 0.7, 0, height * 0.7]
          })

          return <View style={{
            width,
            height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderRadius: 16,
              }}
            >
              <Animated.Image
                source={item.poster}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT * 1.1,
                  resizeMode: 'cover',
                  borderRadius: 16,
                  transform: [
                    { translateY }
                  ]
                }}
              />
              <Animated.Text style={{
                fontSize: 30,
                textTransform: "capitalize",
                position: "absolute",
                bottom: 10,
                zIndex: 4,
                color: "white",
                transform: [
                  { translateY }
                ]
              }}>{item.title}</Animated.Text>
              <Animated.View
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  transform: [
                    { translateY }
                  ]
                }}
              >
                <LinearGradient
                  colors={["transparent", "transparent", "black"]}
                  style={{
                    height: "105%",
                    width: "100%",
                    borderRadius: 16
                  }}
                />

              </Animated.View>

            </View>
          </View>
        }}
      />
    </View >
  )
}



export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
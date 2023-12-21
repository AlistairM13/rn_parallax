import { memo, useRef } from "react";
import {
    Animated,
    Dimensions,
    View,
    Pressable,
    StyleSheet,
    Text,
    GestureResponderEvent,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { Game, RootStackParamList } from "../App";
import Icon from "react-native-vector-icons/Ionicons";



const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;


const DATA = [
    {
        title: "Cyberpunk 2077",
        poster: require("../images/cyberpunk_poster.jpg"),
        backdrop: require("../images/cyberpunk_backdrop.jpg"),
    },
    {
        title: "DOOM Eternal",
        poster: require("../images/doom_poster.jpg"),
        backdrop: require("../images/doom_backdrop.jpg"),
    },
    {
        title: "Ghostrunner",
        poster: require("../images/ghostrunner_poster.jpg"),
        backdrop: require("../images/ghostrunner_backdrop.jpg"),
    },
    {
        title: "The Last of Us",
        poster: require("../images/thelastofus_poster.jpg"),
        backdrop: require("../images/thelastofus_backdrop.jpg"),
    },
    {
        title: "Witcher 3: Wild Hunt",
        poster: require("../images/witcher3_poster.jpg"),
        backdrop: require("../images/witcher3_backdrop.jpg"),
    },
    {
        title: "Ghost of Tsushima",
        poster: require("../images/ghostoftsushima_poster.jpg"),
        backdrop: require("../images/ghostoftsushima_backdrop.jpg"),
    },
]

type HomeProps = StackScreenProps<RootStackParamList, "Home">

const GameCard = memo(({
    game,
    translateY,
    onPress
}: {
    game: Game,
    translateY: Animated.AnimatedInterpolation<string | number>,
    onPress: (event: GestureResponderEvent) => void
}) => (
    <Pressable
        onPress={onPress}
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
        <SharedElement id={game.title}>
            <Animated.Image
                source={game.poster}
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
        </SharedElement>
        <Animated.View
            style={{
                position: "absolute",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 16,
                paddingBottom: 8,
                justifyContent: "space-between",
                bottom: 10,
                zIndex: 4,
                transform: [
                    { translateY }
                ]
            }}
        >
            <Text style={{
                fontSize: 20,
                textTransform: "capitalize",
                color: "white",
            }}>{game.title}</Text>
            <View
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 40,
                    backgroundColor: "#0A79DF",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Icon
                    name="add"
                    size={20}
                    color="white"
                />
            </View>
        </Animated.View>
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
    </Pressable>
));

export default ({ navigation }: HomeProps): React.JSX.Element => {
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
                keyExtractor={game => game.title}
                renderItem={({ item: game, index }) => {
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
                        <GameCard
                            onPress={() => navigation.navigate("Details", { game })}
                            game={game}
                            translateY={translateY}
                        />
                    </View>
                }}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
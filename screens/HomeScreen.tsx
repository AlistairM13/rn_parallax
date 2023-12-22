import { useRef } from "react";
import {
    Animated,
    Dimensions,
    View,
    Pressable,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { StackScreenProps } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { RootStackParamList } from "../App";
import Icon from "react-native-vector-icons/FontAwesome6";


import { DATA } from '../utils/data'

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;


type HomeProps = StackScreenProps<RootStackParamList, "Home">


export default ({ navigation }: HomeProps): React.JSX.Element => {
    const scrollY = useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <Animated.FlatList
                decelerationRate="fast"
                snapToAlignment="center"
                data={DATA}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                ListHeaderComponent={
                    <View style={{alignItems:"center", paddingVertical:20}}>
                        <Text style={{ color: "#0A79DF", fontWeight:"bold", textTransform:"uppercase", fontSize:12 }}>Great games</Text>
                        <Text style={{ color: "#333", fontWeight:"300", fontSize:35 }}>Coming soon</Text>
                    </View>
                }
                contentContainerStyle={{ alignItems: "center" }}
                keyExtractor={game => game.title}
                renderItem={({ item: game, index }) => {
                    const translateY = scrollY.interpolate({
                        inputRange: [
                            (index - 3) * ITEM_HEIGHT,
                            index * ITEM_HEIGHT,
                            (index + 1) * ITEM_HEIGHT
                        ],
                        outputRange: [
                            -(ITEM_HEIGHT * 0.3), 0, (ITEM_HEIGHT * 0.3)
                        ]
                    })
                    return (

                        <Pressable
                            onPress={() => navigation.navigate("Details", { game })}
                            style={{
                                width: ITEM_WIDTH,
                                height: ITEM_HEIGHT,
                                overflow: "hidden",
                                justifyContent: "center",
                                marginBottom: 32,
                                borderRadius: 16,
                                elevation: 16,
                                position: "relative",
                                shadowColor: "black"
                            }}
                        >
                            <SharedElement id={game.title}>
                                <Animated.Image
                                    source={game.poster}
                                    style={{
                                        width: ITEM_WIDTH,
                                        height: ITEM_HEIGHT * 1.2,
                                        borderRadius: 16,
                                        transform: [{ translateY }],
                                    }}
                                    resizeMode="cover"
                                />
                            </SharedElement>
                            <View
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
                                }}
                            >
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        alignItems: "flex-start"
                                    }}
                                >
                                    <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }} >{game.title}</Text>
                                    <Text style={{ color: "#ddd", fontSize: 16 }} >PlayStation Exclusive</Text>
                                    <Image
                                        source={require("../images/ps4_logo.png")}
                                        style={{ width: 50, height: 20, opacity: 0.8, objectFit: "cover", tintColor: "white" }}
                                    />


                                </View>

                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 40,
                                        backgroundColor: "#0A79DF",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignSelf: "flex-end"
                                    }}
                                >
                                    <Icon
                                        name="plus"
                                        size={20}
                                        color="white"
                                    />
                                </View>
                            </View>
                            {/* Gradient */}
                            <View
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
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
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
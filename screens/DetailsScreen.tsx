import { View, Text, Image, Dimensions, Animated, StatusBar } from 'react-native';
import { useEffect, useRef } from "react";
import { StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";

import { RootStackParamList } from "../App";

const { width, height: wHeight } = Dimensions.get('window');
const height = wHeight + (StatusBar.currentHeight || 32)

type DetailProps = StackScreenProps<RootStackParamList, "Details">

export default function DetailScreen({ route, navigation }: DetailProps): React.JSX.Element {
    const { game } = route.params

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const startFadeInAnimation = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        startFadeInAnimation();
    }, []);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <SharedElement id={game.title}>
                <Image
                    style={{ width, height }}
                    resizeMode="cover"
                    source={game.poster}
                />
            </SharedElement>
            <Animated.View
                style={{
                    position: "absolute",
                    height,
                    width,
                    opacity: fadeAnim, // Bind opacity to the fadeAnim value
                }}
            >
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={["black", "transparent", "transparent", "transparent", "black", "black"]}
                >
                    <View style={{ flex: 1, padding: 40, justifyContent: "space-between" }}>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Icon
                                color="white"
                                onPress={navigation.goBack}
                                name="arrow-back"
                                size={25}
                            />
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 100,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#0A79DF"
                                }}
                            >
                                <Icon
                                    name="game-controller"
                                    size={35}
                                    color="white"
                                    style={{
                                        transform: [{ rotate: "-45deg" }]
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    paddingBottom: 56,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <View>
                                    <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }} >{game.title}</Text>
                                    <Text style={{ color: "#ddd", fontSize: 16 }} >PlayStation Exclusive</Text>
                                    <Image
                                        source={require("../images/ps4_logo.png")}
                                        style={{ width: 50, height: 20, opacity: 0.8, objectFit: "cover", tintColor: "white" }}
                                    />
                                </View>
                                <Image
                                    source={require("../images/rated18.png")}
                                    style={{ height: 50, width: 40 }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#0A79DF",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: 8,
                                    width: "100%",
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>PRE-ORDER NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        </>
    )
}

DetailScreen.sharedElements = (route: RouteProp<RootStackParamList, "Details">) => {
    const { game } = route.params
    return [{
        id: game.title
    }];
}
import { View, Text, Image, Dimensions } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import { SharedElement } from 'react-navigation-shared-element';
import { RootStackParamList } from "../App";

const { width, height } = Dimensions.get('window');
type DetailProps = StackScreenProps<RootStackParamList, "Details">

export default function DetailScreen({ route }: DetailProps): React.JSX.Element {
    const { game } = route.params
    return (
        <View
            style={{
                flex: 1,
                position: "relative",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <SharedElement id={game.title}>
                <Image
                    style={{ width, height }}
                    resizeMode="cover"
                    source={game.poster}
                />
            </SharedElement>
            <Text
                style={{
                    position: "absolute",
                    bottom: 20,
                    fontSize: 36
                }}
            >{game.title}</Text>
        </View>
    )
}

DetailScreen.sharedElements = (route: RouteProp<RootStackParamList, "Details">) => {
    const { game } = route.params
    return [{
        id: game.title,
        resize: "clip"
    }];
}
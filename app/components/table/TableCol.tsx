import { Text, View } from "react-native";

export default function (data: string) {
    return (
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <Text> {data} </Text>
        </View>
    )
}
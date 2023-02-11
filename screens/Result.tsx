import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import type { ScoreBoard } from './Game';

export default function ResultScreen({ navigation, route }) {
    const scoreBoard: ScoreBoard[] = route.params.gameScoreBoard;

    function onRestart() {
        //reset the state and go to the home.

        //return to the home screen.
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}> Game over! </Text>
                <ScrollView style={{ marginTop: 40 }}>
                    {scoreBoard.map((scores, index) =>
                        <View key={index} style={styles.playerView}>
                            <Text> {scores.player.name} </Text>
                            <Text> {scores.score} </Text>
                        </View>
                    )}
                </ScrollView>
                <Text onPress={onRestart} style={styles.resetGameButton}>
                    Restart game
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "500",
        marginTop: 80,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 24,
    },
    playerView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'between',
        borderWidth: 1,
        borderColor: '#ebf3e5',
        marginTop: 8,
        padding: 10,
        fontWeight: 300,
        borderRadius: 5,
    },
    resetGameButton: {
        textAlign: "center",
        padding: 10,
        backgroundColor: '#df6883',
        borderRadius: 5,
        color: "white",
        fontWeight: "500",
        marginTop: 100,
    }
});

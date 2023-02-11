import { useEffect, useState } from "react";
import {
    SafeAreaView, Text,
    StyleSheet,
    View,
    TextInput,
    Button
} from "react-native";

import type { Player } from "../components/Player";

export default function GameScreen({ navigation, route }) {

    const players: Player[] = route.params.players;
    const [round, setRound] = useState<number>(1);

    function nextRound() {
        setRound(prevRound => prevRound + 1)
    }

    function endPlayerTurn() {
        // set the player score.
        // set next player
        nextRound();
    }

    function endGame() {
        // end the game logic.
    }

    useEffect(() => {
        console.log(players)
    }, [players]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}> Round {round} </Text>
                <Text style={{ borderWidth: 1, textAlign: "center" }}> {players[0].name} Turn </Text>
                <TextInput placeholder="Enter score" />
                <Button title="End turn" onPress={endPlayerTurn} />
                <Text onPress={endGame}>
                    End Game
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
});

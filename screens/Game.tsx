import { useEffect, useState } from "react";
import {
    SafeAreaView, Text,
    StyleSheet,
    View,
    TextInput,
} from "react-native";

import type { Player } from "../components/Player";

type ScoreBoard = {
    player: Player;
    score: number,
}

export default function GameScreen({ navigation, route }) {
    const players: Player[] = route.params.players;
    const [gameScoreBoard, setGameScoreBoard] = useState<ScoreBoard[]>([]);

    
    const [round, setRound] = useState<number>(1);
    function nextRound() {
        setRound(prevRound => prevRound + 1)
    }
    
    const [currentTurn, setCurrentTurn] = useState<number>(0);
    function endPlayerTurn(player: Player) {
        // Exchange turns.
        if (currentTurn == players.length - 1) {
            setCurrentTurn(0) //reset the turns.
            nextRound();
        }

        if (currentTurn < players.length - 1) {
            setCurrentTurn(prevTurn => prevTurn + 1)
        }

        // update player score.
        // let playerScore = gameScoreBoard.filter(
        //     score => score.player.id === player.id
        // )[0];

        // setGameScoreBoard(prevBoard =>
        //     [...prevBoard, { player: playerScore.player, score: playerScore.score + 10 }]
        // );

        // console.log(JSON.stringify(gameScoreBoard))
    }

    function endGame() {
        // end the game logic.
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Round {round}
                </Text>

                <Text style={{ textAlign: "center", fontSize: 16, marginVertical: 10, }}>
                    {players[currentTurn].name} Turn
                </Text>
                <TextInput placeholder="Enter score" style={styles.addPlayerScoreInput} />

                <Text onPress={() => endPlayerTurn(players[currentTurn])} style={styles.endTurnButton}>
                    End turn
                </Text>
                <Text onPress={endGame} style={styles.endGameButton}>
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
    addPlayerScoreInput: {
        padding: 5,
        borderColor: '#dae3e5',
        borderBottomWidth: 1,
        marginVertical: 40,
    },
    endTurnButton: {
        textAlign: "center",
        padding: 10,
        backgroundColor: '#00a4a7',
        borderRadius: 5,
        color: "white",
        fontWeight: "500",
        marginTop: 5,
    },
    endGameButton: {
        textAlign: "center",
        padding: 10,
        backgroundColor: '#df6883',
        borderRadius: 5,
        color: "white",
        fontWeight: "500",
        marginTop: 100,
    }
});

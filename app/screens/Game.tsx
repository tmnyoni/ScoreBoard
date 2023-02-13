import { useEffect, useState } from "react";
import {
    SafeAreaView, Text,
    StyleSheet,
    View,
    ScrollView
} from "react-native";
import { AddPlayerScoreInput } from "../components/AddScore";

import type { Player } from "../components/Player";
import { TableRow, TableHeaderRow } from "../components/table/TableRow";

export type ScoreBoard = {
    player: Player;
    score: number,
}

export default function GameScreen({ navigation, route }) {
    const players: Player[] = route.params.players;
    const [gameScoreBoard, setGameScoreBoard] = useState<ScoreBoard[]>([]);

    function isPlayerOnScoreBoard(player: Player) {
        return gameScoreBoard.filter(
            boardItem => boardItem.player.id === player.id
        ).length > 0;
    }

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

        const isPlayerAlreadyExists = isPlayerOnScoreBoard(player);
        if (isPlayerAlreadyExists)
            setGameScoreBoard(prevBoard => [
                ...prevBoard.filter(board => board.player.id !== player.id),
                {
                    player,
                    score: prevBoard.filter(item =>
                        item.player.id === player.id)[0].score + parseInt(currentScore)
                }
            ]);
        else
            setGameScoreBoard(prevBoard => [
                ...prevBoard,
                {
                    player,
                    score: parseInt(currentScore)
                }
            ]);
    }

    const [currentScore, setCurrentScore] = useState<string>('');

    function endGame() {
        navigation.navigate("Results", { gameScoreBoard });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text onPress={endGame} style={styles.endGameButton}>
                End Game
            </Text>

            <View>
                <Text> Game Table </Text>
                <ScrollView style={{ marginTop: 40 }}>
                    <TableHeaderRow />
                    {gameScoreBoard.map((scores, index) =>
                        <TableRow key={index} scores={scores} />
                    )}
                </ScrollView>
            </View>

            <Text style={styles.title}>
                Round {round}
            </Text>

            <Text style={{ textAlign: "center", fontSize: 18, marginVertical: 10, }}>
                {players[currentTurn].name} Turn
            </Text>

            <AddPlayerScoreInput submitPlayerScore={setCurrentScore} />

            <Text
                onPress={() => endPlayerTurn(players[currentTurn])}
                style={styles.endTurnButton}
            >
                End turn
            </Text>


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
        backgroundColor: '#FBFBFB',
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
        width: '40%',
        backgroundColor: '#df6883',
        borderRadius: 5,
        color: "white",
        fontWeight: "500",
        alignSelf: 'flex-end'
    },
    gameTableContainer: {
        marginTop: 20,
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
});

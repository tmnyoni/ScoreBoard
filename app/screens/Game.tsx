import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    SafeAreaView, Text,
    StyleSheet,
    View,
    ScrollView,
    Pressable,
    Button
} from "react-native";

import * as Progress from 'react-native-progress';

import { AddPlayerScoreInput } from "../components/AddScore";

import type { Player } from "../components/Player";
import { TableRow, TableHeaderRow } from "../components/table/TableRow";

import MenuIcon from '../assets/menu.svg';
import { showToastWithGravityAndOffset } from "../components/Toast";
import { GameType } from "./Home";
import { MINUTE } from "../lib/timer";
import TimerProgres from "../components/Timer";
import TimerProgress from "../components/Timer";

export type ScoreBoard = {
    player: Player;
    score: number,
}

export default function GameScreen({ navigation, route }) {
    const players: Player[] = route.params.players;
    const gameType: GameType = route.params.gameType;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Settings', {})}>
                    <View style={styles.menuButton}>
                        <MenuIcon width={30} height={30} color='#000' />
                    </View>
                </Pressable>
            )
        })
    }, [navigation]);

    const [gameScoreBoard, setGameScoreBoard] = useState<ScoreBoard[]>(initScoreBoard());
    function initScoreBoard() {
        const scoreBoard: ScoreBoard[] = [];
        for (let i = 0; i < players.length; i++) {
            scoreBoard.push({ player: players[i], score: 0 })
        }
        return scoreBoard;
    }

    const [round, setRound] = useState<number>(1);
    function nextRound() {
        setRound(prevRound => prevRound + 1)
    }

    const [currentTurn, setCurrentTurn] = useState<number>(0);
    function endPlayerTurn(player: Player) {
        if (!currentScore) {
            showToastWithGravityAndOffset('You have not entered player score');
            return;
        }

        setGameScoreBoard(prevBoard => {
            const playersList = [...prevBoard.filter(board => board.player.id !== player.id)];
            const newPlayer = {
                player,
                score: prevBoard.filter(item =>
                    item.player.id === player.id)[0].score + (currentScore
                        ? parseInt(currentScore)
                        : 0)
            }
            playersList.push(newPlayer);

            return playersList.sort((a, b) => b.score - a.score);
        });

        if (currentTurn < players.length - 1)
            setCurrentTurn(prevTurn => prevTurn + 1)

        // Exchange turns.
        else if (currentTurn == players.length - 1) {
            setCurrentTurn(0) //reset the turns.
            nextRound();
        }

        setCurrentScore(null);
    }

    const [currentScore, setCurrentScore] = useState<string>(null);

    function endGame() {
        clearInterval(timerId.current);
        navigation.navigate("Results", { gameScoreBoard });
    }

    const [seconds, setSeconds] = useState(MINUTE);
    const timerId = useRef<ReturnType<typeof setInterval>>(null);
    function startTimer() {
        if (!seconds)
            setSeconds(MINUTE)

        timerId.current = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
    }

    useEffect(() => {
        if (!seconds) {
            stopTimer();
            clearInterval(timerId.current);
        }

        setProgress((seconds / MINUTE))
    }, [seconds]);

    function stopTimer() {
        clearInterval(timerId.current);
        timerId.current = null;
    }

    function resetTimer() {
        stopTimer();
        setSeconds(MINUTE);
    }

    const [progress, setProgress] = useState<number>(0);

    return (
        <SafeAreaView style={styles.container}>
            <Text
                onPress={endGame}
                style={styles.endGameButton}
            >
                End Game
            </Text>

            <View style={{ marginTop: 30 }}>
                {gameType === 'Tournament' &&
                    <View style={{ alignItems: 'center' }}>
                       <TimerProgress progress={progress}/>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Pressable onPress={startTimer}
                                style={[styles.endTurnButton, { margin: 1 }]}
                            >
                                <Text style={{ color: "#fbfbfb", }}>
                                    Start
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={stopTimer}
                                style={[styles.endTurnButton, { margin: 1 }]}
                            >
                                <Text style={{ color: "#fbfbfb", }}>
                                    Stop
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={resetTimer}
                                style={[styles.endTurnButton, { margin: 1 }]}
                            >
                                <Text style={{ color: "#fbfbfb", }}>
                                    Reset </Text>
                            </Pressable>
                        </View>
                    </View>}

                <Text style={styles.title}>
                    Round {round}
                </Text>

                <Text style={{ textAlign: "center", fontSize: 28, marginVertical: 10, }}>
                    {players[currentTurn].name}'s Turn
                </Text>

                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <AddPlayerScoreInput
                        updateCurrentScore={setCurrentScore}
                        currentScore={currentScore}
                    />
                    <Text
                        onPress={() => endPlayerTurn(players[currentTurn])}
                        style={styles.endTurnButton}
                    >
                        End turn
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 40 }}>
                <Text> Game Table </Text>
                <ScrollView style={{ marginTop: 20 }}>
                    <TableHeaderRow />
                    {gameScoreBoard.map((scores, index) =>
                        <TableRow key={index} index={index + 1} scores={scores} />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "900",
        marginTop: 30,
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#33595C',
        borderRadius: 5,
        color: "white",
        fontWeight: "500",
        marginTop: 5,
    },
    endGameButton: {
        textAlign: "center",
        paddingVertical: 8,
        width: '30%',
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
    menuButton: {
        padding: 6,
        borderRadius: 4,
    }
});

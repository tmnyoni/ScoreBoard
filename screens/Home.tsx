import { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    SafeAreaView,
    StatusBar
} from 'react-native';

import { Player } from '../components/Player';
import { AddPlayerInput } from '../components/AddPlayer';
import { StatusBar as ExpoStatusBar} from 'expo-status-bar';

export default function HomeScreen({navigation}) {
    const [players, setPlayers] = useState<Player[]>([]);

    function addPlayer(player: Player) {
        setPlayers(
            (prevPlayers) => [...prevPlayers, player]
        );
    }

    function removePlayer(playerId: string) {
        setPlayers(players.filter(
            (player) => player.id !== playerId
        ));
    }

    function startGame(){
        navigation.navigate("Game Page");
    }

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="auto" />

            <Text style={styles.title}>
                Add Players
            </Text>

            <ScrollView style={{ marginTop: 40 }}>
                {players.map((player) => (
                    <Player
                        key={player.id}
                        player={player}
                        removePlayer={removePlayer}
                    />
                ))}
            </ScrollView>

            <AddPlayerInput addPlayer={addPlayer}/>
            <Text style={styles.startButton} onPress={startGame}>
                Start Game
            </Text>

        </SafeAreaView >
    );
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
    startButton: {
        marginTop: 24,
        marginBottom: 24,
        borderRadius: 5,
        backgroundColor: '#00a4a7',
        padding: 10,
        textAlign: 'center',
        color: '#fff',
    },
});

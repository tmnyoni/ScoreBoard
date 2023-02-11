import { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    SafeAreaView,
    StatusBar
} from 'react-native';

import type { Player } from '../components/Player';
import { PlayerItem } from '../components/Player';

import { AddPlayerInput } from '../components/AddPlayer';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [noPlayerError, setNoPlayerError] = useState<string>()

    function addPlayer(player: Player) {
        setNoPlayerError('');

        setPlayers(
            (prevPlayers) => [...prevPlayers, player]
        );
    }

    function removePlayer(playerId: string) {
        setPlayers(players.filter(
            (player) => player.id !== playerId
        ));
    }

    function startGame() {
        if (players.length > 0)
            navigation.navigate("Game", { players });
        else
            setNoPlayerError('You haven\'t added players');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="auto" />

            <Text style={styles.title}>
                Add Players
            </Text>

            {noPlayerError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        {noPlayerError}
                    </Text>
                </View>
            )}

            <ScrollView style={{ marginTop: 40 }}>
                {players.map((player) => (
                    <PlayerItem
                        key={player.id}
                        player={player}
                        removePlayer={removePlayer}
                    />
                ))}
            </ScrollView>

            <AddPlayerInput addPlayer={addPlayer} />
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
    errorContainer: {
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    errorText: {
        color: "red",
    }
});

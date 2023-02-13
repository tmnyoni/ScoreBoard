import { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

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

            <View>
                <Text style={styles.title}>
                    Select game mode
                </Text>
                <View style={styles.tabBar}>
                    <Text style={styles.tab}> Classic </Text>
                    <Text style={[styles.tab, styles.activeTab]}> Tournament </Text>
                </View>
            </View>

            <View style={styles.playersContainer}>
                <Text style={styles.title}> Players </Text>

                {noPlayerError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {noPlayerError}
                        </Text>
                    </View>
                )}

                <ScrollView>
                    {players.map((player) => (
                        <PlayerItem
                            key={player.id}
                            player={player}
                            removePlayer={removePlayer}
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.bottomView}>
                <AddPlayerInput addPlayer={addPlayer} />
                <Text style={styles.startButton} onPress={startGame}>
                    Start Game
                </Text>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: "100%",
        backgroundColor: '#FBFBFB',
        padding: 24,
        fontSize: 16,
        flex: 1,
    },
    playersContainer: {
        marginTop: 40,
    },
    title: {
        color: '#121212',
    },
    startButton: {
        marginTop: 24,
        marginBottom: 24,
        borderRadius: 8,
        backgroundColor: '#33595C',
        padding: 15,
        textAlign: 'center',
        color: '#fff',
        width: '50%'
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
    },
    tabBar: {
        marginTop: 4,
        padding: 4,
        backgroundColor: '#6FABB0',
        borderRadius: 8,
        flexDirection: 'row'
    },
    tab: {
        padding: 8,
        borderRadius: 4,
        flex: 1,
        color: "#FBFBFB",
        textAlign: 'center'
    },
    activeTab: {
        backgroundColor: '#FBFBFB',
        color: '33595C',
    },
    bottomView: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        marginTop: 50,
    }
});

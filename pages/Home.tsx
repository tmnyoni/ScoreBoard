import { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';

import { Player } from '../components/Player';
import { AddPlayerInput } from '../components/AddPlayer';

export default function HomePage() {
    const [players, setPlayers] = useState<Player[]>([]);

    function setPlayer(player: Player) {
        setPlayers((prevPlayers) => [...prevPlayers, player]);
    }

    function removePlayer(playerId: string) {
        setPlayers(players.filter((player) => player.id !== playerId));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Add Players </Text>
            <ScrollView style={{ marginTop: 40 }}>
                {players.map((player) => (
                    <Player key={player.id} player={player} removePlayer={removePlayer} />
                ))}
            </ScrollView>
            <AddPlayerInput setPlayer={setPlayer} />
            <Text style={styles.startButton}> Start Game </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
        fontWeight: "500",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24,
    },
    startButton: {
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#00a4a7',
        padding: 8,
        textAlign: 'center',
        color: '#fff',
    },
});

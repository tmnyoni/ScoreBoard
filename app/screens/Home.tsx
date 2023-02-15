import { useState, useLayoutEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    SafeAreaView,
    StatusBar,
    FlatList,
    Pressable,
    ToastAndroid
} from 'react-native';

import type { Player } from '../components/Player';
import { PlayerItem } from '../components/Player';
import { AddPlayerInput } from '../components/AddPlayer';

import MenuIcon from '../assets/menu.svg';

export default function HomeScreen({ navigation }) {
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

    const [players, setPlayers] = useState<Player[]>([]);

    function addPlayer(player: Player) {
        const isPlayerNameTaken = checkIfPlayerNameIsNotTaken(player.name);

        if (isPlayerNameTaken) {
            showToastWithGravityAndOffset('Player name already taken');
            return;
        }

        setPlayers(
            (prevPlayers) => [...prevPlayers, player]
        );
    }

    function checkIfPlayerNameIsNotTaken(playerName: string) {
        return players.some(player => player.name === playerName);
    }

    function removePlayer(playerId: string) {
        setPlayers(players.filter(
            (player) => player.id !== playerId
        ));
    }

    function startGame() {
        if (players.length < 1) {
            showToastWithGravityAndOffset('You need 2 or more players');
            return;
        }

        navigation.navigate("Game", { players });
    }

    function showToastWithGravityAndOffset(message: string) {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="auto" />

            <View>
                <Text style={styles.title}>
                    Select game mode
                </Text>
                <View style={styles.tabBar}>
                    <Text style={styles.tab}>
                        Classic
                    </Text>
                    <Text style={[styles.tab, styles.activeTab]}>
                        Tournament
                    </Text>
                </View>
            </View>

            <View style={styles.playersContainer}>
                <Text style={styles.title}> Players </Text>
                <FlatList
                    data={players}
                    renderItem={({ item }) => (
                        <PlayerItem
                            key={item.id}
                            player={item}
                            removePlayer={removePlayer}
                        />
                    )}
                    keyExtractor={player => player.id}
                />
            </View>

            <View style={styles.bottomViewContainer}>
                <View style={styles.bottomView}>
                    <AddPlayerInput addPlayer={addPlayer} />
                    <Pressable onPress={startGame}>
                        <Text style={styles.startButton} onPress={startGame}>
                            Start Game
                        </Text>
                    </Pressable>
                </View>
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
        marginVertical: 24,
        borderRadius: 8,
        backgroundColor: '#33595C',
        paddingVertical: 15,
        textAlign: 'center',
        color: '#fff',
        paddingHorizontal: 50,
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
    bottomViewContainer: {
        backgroundColor: '#FBFBFB',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 20,
        alignSelf: 'center',
        borderTopWidth: 1,
        borderColor: '#f6f6f6',
        shadowColor: '#0001'
    },
    bottomView: {
        padding: 24,
        width: '100%',
    },
    menuButton: {
        padding: 6,
        borderRadius: 4,
    }
});

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
} from 'react-native';

import type { Player } from '../components/Player';
import { PlayerItem } from '../components/Player';
import { AddPlayerInput } from '../components/AddPlayer';

import MenuIcon from '../assets/menu.svg';
import { showToastWithGravityAndOffset } from '../components/Toast';
import { ExclamationCircle } from '../components/icons';

export type GameType = 'Classic' | 'Tournament';

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

    const [gameType, setGameType] = useState<GameType>('Classic');
    function toggleGameType(currentGametype: GameType) {
        currentGametype === 'Classic'
            ? setGameType('Classic')
            : setGameType('Tournament')
    }

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

        navigation.navigate("Game", { players, gameType });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="auto" />

            <View>
                <Text style={styles.title}>
                    Select game mode
                </Text>
                <View style={styles.gameTypeTabbar}>
                    <Pressable
                        onPress={() => toggleGameType('Classic')}
                        style={[{ flex: 1, borderRadius: 4, justifyContent: 'center', paddingVertical: 10 },
                        gameType === 'Classic' && { backgroundColor: '#FBFBFB' }]}
                    >
                        <Text style={{ textAlign: 'center', color: '#121212' }}>
                            Classic
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => toggleGameType('Tournament')}
                        style={[{ flex: 1, justifyContent: 'center', borderRadius: 4, },
                        gameType === 'Tournament' && { backgroundColor: '#FBFBFB' }]}
                    >
                        <Text style={{ textAlign: 'center', color: '#121212' }}>
                            Tournament
                        </Text>
                    </Pressable>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
                    <ExclamationCircle />
                    {gameType === 'Classic' &&
                        <Text style={styles.tabNote}>
                            The classic mode doesn&apos;t have a timer. Each player make
                            their move as soon as they are ready to play. For faster game player
                            it better to use Tournament mode.
                        </Text>
                    }

                    {gameType === 'Tournament' &&
                        <Text style={styles.tabNote}>
                            Tournament mode uses a timer, set to 1 min by default,
                            each player have to make their move, if they fail they should get a zero
                            or given a penalty depending on your arrangement.
                        </Text>}
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
                        <Text style={styles.startButton}>
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
        marginTop: 30,
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
    gameTypeTabbar: {
        width: '100%',
        marginTop: 4,
        padding: 4,
        backgroundColor: '#6FABB0',
        borderRadius: 8,
        flexDirection: 'row'
    },
    tab: {
        paddingVertial: 20,
        borderRadius: 4,
        flex: 1,
    },
    tabText: {
        color: "#FBFBFB",
        textAlign: 'center',
        paddingVertial: 20,
    },
    tabTextActive: {
        color: '33595C',
        textAlign: 'center'
    },
    activeTab: {
        backgroundColor: '#FBFBFB',
    },
    tabNote: {
        fontSize: 12,
        color: 'gray',
        lineHeight: 15,
        flexDirection: 'row',
        flex: 1,
        marginLeft: 2,
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

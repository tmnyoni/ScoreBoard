import React, { useLayoutEffect } from "react";
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    ScrollView,
    Pressable
} from "react-native";
import { TableHeaderRow, TableRow } from "../components/table/TableRow";
import type { ScoreBoard } from './Game';

import { MenuIcon } from '../components/icons';

export default function ResultScreen({ navigation, route }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Settings', {})}>
                    <View style={styles.menuButton}>
                        <MenuIcon />
                    </View>
                </Pressable>
            )
        })
    }, [navigation]);

    const scoreBoard: ScoreBoard[] = route.params.gameScoreBoard;

    function onRestart() {
        //reset the state and go to the home.

        //return to the home screen.
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ marginTop: 0 }}>
                    <Text> Game Table </Text>
                    <ScrollView style={{ marginTop: 20 }}>
                        <TableHeaderRow />
                        {scoreBoard.map((scores, index) =>
                            <TableRow key={index} index={index + 1} scores={scores} />
                        )}
                    </ScrollView>
                </View>

                <View>
                    <Text style={styles.title}> Game over! </Text>
                    <Text onPress={onRestart} style={styles.resetGameButton}>
                        Restart game
                    </Text>
                </View>
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
    resetGameButton: {
        textAlign: "center",
        padding: 10,
        backgroundColor: '#df6883',
        borderRadius: 5,
        color: "white",
        fontWeight: "500",
        marginTop: 100,
    },
    menuButton: {
        padding: 6,
        borderRadius: 4,
    }
});

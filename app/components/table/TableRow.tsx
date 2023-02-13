import { View, Text, StyleSheet } from "react-native";
import { Player } from "../Player";

export type ScoreBoard = {
    player: Player;
    score: number,
}

export function TableRow(props: { index: number, scores: ScoreBoard }) {
    const { index, scores } = props;
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingVertical: 6 }}>
            <Text style={{ flex: 1, alignSelf: 'stretch' }}> {index}</Text>
            <Text style={{ flex: 3, alignSelf: 'stretch' }}> {scores.player.name} </Text>
            <Text style={{ flex: 1, alignSelf: 'stretch', textAlign: 'right' }}> {scores.score} </Text>
        </View>
    )
}

export function TableHeaderRow() {
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingVertical: 6 }}>
            <Text style={styles.headerRow}> POS </Text>
            <Text style={[styles.headerRow, { flex: 3 }]}> Player </Text>
            <Text style={[styles.headerRow, { textAlign: 'right' }]}> Points </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        flex: 1,
        alignSelf: 'stretch',
        textTransform: 'uppercase',
        color: '#6B6B6B',
        fontSize: 14,
        fontWeight: '500',
    }
})
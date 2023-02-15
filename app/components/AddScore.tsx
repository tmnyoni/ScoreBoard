import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import type { Player } from './Player';

type Props = {
    updateCurrentScore: (score: string) => void;
    currentScore: string;
};

export function AddPlayerScoreInput(props: Props) {
    const { updateCurrentScore, currentScore } = props;

    return (
        <TextInput
            value={currentScore}
            keyboardType="numeric"
            placeholder="Enter score"
            style={styles.addPlayerScoreInput}
            onChangeText={updateCurrentScore}
        />
    );
}

const styles = StyleSheet.create({
    addPlayerScoreInput: {
        padding: 5,
        borderColor: '#dae3e5',
        borderBottomWidth: 1,
        width: '60%',
        textAlign: 'center',
    },
});

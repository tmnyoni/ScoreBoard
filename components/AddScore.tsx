import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import type { Player } from './Player';

type Props = {
    submitPlayerScore: (score: string) => void;
};

export function AddPlayerScoreInput(props: Props) {
    const { submitPlayerScore } = props;

    return (
        <TextInput
            keyboardType="numeric"
            placeholder="Enter score"
            style={styles.addPlayerScoreInput}
            onChangeText={submitPlayerScore}
        />
    );
}

const styles = StyleSheet.create({
    addPlayerScoreInput: {
        padding: 5,
        borderColor: '#dae3e5',
        borderBottomWidth: 1,
    },
});

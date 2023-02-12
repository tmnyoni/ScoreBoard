import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import type { Player } from './Player';

import { v4 as uuidv4 } from 'uuid';
export function generateId() {
    return uuidv4();
}

export type Props = {
    addPlayer: (player: Player) => void;
};

export function AddPlayerInput(props: Props) {
    const { addPlayer } = props;

    const id = generateId();
    const [name, setName] = useState<string>();

    function onSubmitInput() {
        addPlayer({ id, name });
    }

    return (
        <TextInput
            placeholder="Enter player name"
            style={styles.addPlayerInput}
            onChangeText={setName}
            onSubmitEditing={onSubmitInput}
        />
    );
}

const styles = StyleSheet.create({
    addPlayerInput: {
        padding: 5,
        borderColor: '#dae3e5',
        borderBottomWidth: 1,
        width: '100%',
    },
});

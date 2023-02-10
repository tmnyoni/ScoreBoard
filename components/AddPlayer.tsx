import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import type { Player } from './Player';

export type Props = {
    setPlayer: (player: Player) => void;
};

import { v4 as uuidv4 } from 'uuid';

export function AddPlayerInput(props: Props) {
    const { setPlayer } = props;
    const [name, setName] = useState('');
    const id = uuidv4();

    function submitInput() {
        setPlayer({ id, name });
    }

    return (
        <TextInput
            placeholder="Enter player name"
            style={styles.addPlayerInput}
            onChangeText={setName}
            onSubmitEditing={submitInput}
        />
    );
}

const styles = StyleSheet.create({
    addPlayerInput: {
        padding: 5,
        borderColor: '#dae3e5',
        borderBottomWidth: 1,
    },
});

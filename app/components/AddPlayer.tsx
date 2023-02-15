import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { generateId } from '../lib/utils';
import type { Player } from './Player';

export type Props = {
    addPlayer: (player: Player) => void;
};

export function AddPlayerInput(props: Props) {
    const { addPlayer } = props;

    const id = generateId();
    const [name, setName] = useState<string>(null);

    function onSubmitInput() {
        addPlayer({ id, name });
        setName(null);
    }

    return (
        <TextInput
            value={name}
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

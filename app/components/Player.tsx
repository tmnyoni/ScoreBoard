import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    Pressable,
} from 'react-native';
import { TrashIcon } from './icons';

export type Player = {
    id: string;
    name: string;
};

type Props = {
    player: Player;
    removePlayer: (id: string) => void;
};

export function PlayerItem(props: Props) {
    const { player, removePlayer } = props;

    return (
        <View style={styles.playerView}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
                <Text>
                    {player.name}
                </Text>
            </View>

            <Pressable onPress={() => removePlayer(player.id)} style={styles.deleteButton}>
                <TrashIcon />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    playerView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyItem: 'between',
        borderWidth: 1,
        borderColor: '#6FABB0',
        marginTop: 8,
        padding: 8,
        fontWeight: 300,
        borderRadius: 5,
    },
    deleteButton: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
});

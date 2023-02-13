import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';

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
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text>
                    {player.name}
                </Text>
            </View>

            <Text
                style={styles.deleteButton}
                onPress={() => removePlayer(player.id)}
            >
                Delete
            </Text>
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
        padding: 10,
        fontWeight: 300,
        borderRadius: 5,
    },
    deleteButton: {
        roundedRadius: 5,
        backgroundColor: '#df6883',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        color: '#fff',
        borderRadius: 4,
    },
});

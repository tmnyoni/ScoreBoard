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

export function Player(props: Props) {
    const { player, removePlayer } = props;

    return (
        <View style={styles.playerView}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 2 }}> {player.name} </Text>
            </View>
            <Text style={styles.deleteButton}>
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
        borderColor: '#dae3e5',
        marginTop: 5,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 300,
        borderRadius: 5,
    },
    deleteButton: {
        roundedRadius: 5,
        backgroundColor: '#df6883',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        color: '#fff',
        borderRadius: 4,
    },
});

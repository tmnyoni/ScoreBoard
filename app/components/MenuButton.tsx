import {
    StyleSheet,
    View,
    Pressable
} from 'react-native';

import MenuIcon from '../assets/menu.svg';

export default function MenuButton(navigation) {
    function gotoSettings() {
        navigation.navigate('Settings', {})
    }

    return (
        <Pressable onPress={() => navigation.navigate('Settings', {})}>
            <View style={styles.menuButton}>
                <MenuIcon width={30} height={30} color='#000' />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    menuButton: {
        padding: 6,
        borderRadius: 4,
    }
});
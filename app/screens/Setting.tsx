import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Linking,
} from 'react-native';

export default function SettingScreen({ navigation }) {

    function openExternalLink(url: string) {
        Linking.openURL(url);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="auto" />
            <View style={styles.versionContainer}>
                <Text style={styles.versionTitle}>
                    Version
                </Text>

                <View style={styles.version}>
                    <Text> 0.2.0  </Text>
                    <Text style={styles.versionTag}> Beta  </Text>
                </View>
            </View>

            <View style={styles.creditsContainer}>
                <Text style={styles.title}> Credits </Text>
                <Text style={styles.centerText}> Designer & Developer </Text>
                <Text style={styles.centerText}> Tawanda M. Nyoni  </Text>

                <Text style={[styles.centerText, { marginTop: 10 }]} onPress={() => {
                    openExternalLink('https://tmnyoni.ml')
                }}>
                    Portfolio
                </Text>
                <Text style={styles.centerText} onPress={() => {
                    openExternalLink('https://github.com/tmnyoni')
                }}>
                    Github Account
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: "100%",
        backgroundColor: '#FBFBFB',
        padding: 24,
        fontSize: 16,
        flex: 1,
        alignItems: 'center'
    },
    playersContainer: {
        marginTop: 40,
    },
    title: {
        color: '#121212',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 40,
    },
    versionContainer: {
        alignItems: 'center'
    },
    versionTitle: {
        color: '#121212',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 10,
    },
    version: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    versionTag: {
        padding: 3,
        backgroundColor: '#6FABB0',
        color: '#FBFBFB',
        borderRadius: 3,
        textAlign: 'center'
    },
    centerText: {
        textAlign: 'center'
    },
    creditsContainer: {
        justifyContent: 'center',
    }
});
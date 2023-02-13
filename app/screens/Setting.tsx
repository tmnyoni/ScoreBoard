import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    SafeAreaView,
    StatusBar,
    FlatList
} from 'react-native';

export default function SettingScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="auto" />
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
    },
    playersContainer: {
        marginTop: 40,
    },
    title: {
        color: '#121212',
    },
});
import {
    ToastAndroid
} from 'react-native';

const xOffset = 25;
const yOffset = 50;

export function showToastWithGravityAndOffset(message: string) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        xOffset,
        yOffset,
    );
};
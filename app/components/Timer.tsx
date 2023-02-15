



import * as Progress from 'react-native-progress';
import { MINUTE } from '../lib/timer';

type Props = {
    progress: number
}

export default function TimerProgress(props: Props) {
    const { progress } = props;

    function formatProgress(updateProgress: number) {
        const minutes = Math.floor(updateProgress);

        let seconds_ = Math.round((updateProgress * MINUTE) % MINUTE);
        let secondsAsString: string;
        if (seconds_.toString().length < 2) {
            secondsAsString = '0' + seconds_.toString();
        }

        return `${minutes}:${secondsAsString ?? seconds_}`
    }

    return (
        <Progress.Circle
            size={110}
            borderWidth={1}
            progress={progress}
            showsText={true}
            formatText={formatProgress}
            color={'#33595C'}
            thickness={8}
        />
    )
}
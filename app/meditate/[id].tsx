import { View, ImageBackground, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import meditationImages from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import BackButton from '@/components/BackButton'
import { router, useLocalSearchParams } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContext } from '@/context/TimerContext'

const Meditate = () => {
    const { id } = useLocalSearchParams();

    const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

    // const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (secondsRemaining == 0) {
            setMeditating(false)
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setDuration(secondsRemaining - 1);
            }, 1000);
        }


        return () => {
            clearTimeout(timerId);
        }
    }, [secondsRemaining, isMeditating])

    useEffect(() => {
        return () => {
            audioSound?.unloadAsync();
            setDuration(10);
        }
    }, [audioSound])


    // Format the time left to ensure two digits are displayed

    const formattedTimeMinute = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
    const formattedTimeSecond = String(secondsRemaining % 60).padStart(2, "0");

    const toggleMeditationSessionStatus = async () => {
        if (secondsRemaining === 0) setDuration(10);

        setMeditating(!isMeditating);

        await toggleSound();
    }

    const toggleSound = async () => {
        const sound = audioSound ? audioSound : await initializeSound();

        const status = await sound?.getStatusAsync();

        if (status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync();
            setPlayingAudio(true);
        } else {
            await sound.pauseAsync();
            setPlayingAudio(false)
        }
    }

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

        const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

        setSound(sound);

        return sound;
    }

    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus();

        router.push("/(modal)/adjust-meditation-duration")
    }

    return (
        <View className='flex-1'>
            <ImageBackground source={meditationImages[Number(id) - 1]} resizeMode='cover' className='flex-1'>
                <AppGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']}>
                    <BackButton />
                    <View className='flex-1 justify-center'>
                        <View className='mx-auto bg-neutral-200 rounded-full justify-center items-center w-44 h-44'>
                            <Text className='text-4xl text-blue-800 font-rmono'>{formattedTimeMinute}:{formattedTimeSecond}</Text>
                        </View>
                    </View>

                    <View className='mb-5'>
                        <CustomButton title="Adjust Duration" onPress={handleAdjustDuration} />
                        <CustomButton title={isMeditating ? 'Stop': 'Start Meditating'}
                            containerStyles='mt-4'
                            onPress={toggleMeditationSessionStatus} />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Meditate
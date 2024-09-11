import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import BackButton from '@/components/BackButton'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { TimerContext } from '@/context/TimerContext'

const AdjustMeditationDuration = () => {
    const { setDuration } = useContext(TimerContext);

    const handlePress = (duration: number) => {
        setDuration(duration)
        router.back();
    }

    return (
        <View className='flex-1 relative'>
            <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
                <BackButton />
                <View className='justify-center h-full'>
                    <Text className='text-white text-3xl font-bold text-center mb-10'>Adjust Meditation Duration</Text>
                    <View>
                        <CustomButton title='10 seconds' onPress={() => handlePress(10)} containerStyles='mb-5' ></CustomButton>
                        <CustomButton title='5 minutes' onPress={() => handlePress(5 * 60)} containerStyles='mb-5' ></CustomButton>
                        <CustomButton title='10 minutes' onPress={() => handlePress(10 * 60)} containerStyles='mb-5' ></CustomButton>
                        <CustomButton title='15 minutes' onPress={() => handlePress(15 * 60)} containerStyles='mb-5' ></CustomButton>
                    </View>
                </View>
            </AppGradient>

        </View>
    )
}

export default AdjustMeditationDuration
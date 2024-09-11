import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React from 'react'
import { Pressable } from 'react-native';

const BackButton = () => {
    return (
        <Pressable onPress={() => router.back()} className='absolute top-16 z-10 ml-4'>
            <AntDesign name="leftcircleo" size={40} color="white" />
        </Pressable>
    )
}

export default BackButton
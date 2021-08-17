import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MedHome from '../screens/MedHome';
import MedicalSchedule from '../screens/MedicalSchedule';
import Routine from '../screens/Routine';
import PacientForm from '../screens/PacientForm';
import GeneratePDF from '../screens/GeneratePDF';
import RecordList from '../screens/RecordList';

import * as Font from 'expo-font';
import { useFonts, Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { Ionicons } from '@expo/vector-icons';
import AppLoading  from 'expo-app-loading';

const { Navigator, Screen } = createStackNavigator();



export default function AppStack(){
    const [isReady, setIsready] = useState(false);

    async function load() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Satisfy_400Regular,
            ...Ionicons.font,
        });

        /*useFonts({
            Satisfy_400Regular,
        });*/
    
        setIsready(true);
    }
    
    useEffect(() => {
        load();
    }, [])

    if (!isReady) {
        return <AppLoading />;
    }else{
        return(
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }}>
                    <Screen name="MedHome" component={MedHome} />
                    <Screen name="RecordList" component={RecordList} />
                    <Screen name="MedicalRecord" component={PacientForm} />
                    <Screen name="MedicalSchedule" component={MedicalSchedule} />
                    <Screen name="Routine" component={Routine} />
                    <Screen name="PDF" component={GeneratePDF} />
                </Navigator>
            </NavigationContainer>
        )
    }
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MedHome from '../screens/MedHome';
import MedicalRecord from '../screens/MedicalRecord';
import MedicalSchedule from '../screens/MedicalSchedule';
import Routine from '../screens/Routine';

const { Navigator, Screen } = createStackNavigator();

export default function AppStack(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="MedHome" component={MedHome} />
                <Screen name="MedicalRecord" component={MedicalRecord} />
                <Screen name="MedicalSchedule" component={MedicalSchedule} />
                <Screen name="Routine" component={Routine} />
            </Navigator>
        </NavigationContainer>
    )
}
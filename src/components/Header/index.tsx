import React from 'react';
import { ScreenHeader, BackButton } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


function Header(){

    const { goBack } = useNavigation();

    function handleGoBackScreen(){
        goBack();
    }

    return (
        <ScreenHeader>
            <BackButton onPress={handleGoBackScreen}>
                <Ionicons name="arrow-back" size={24} color={'#48D1CC'}></Ionicons>
            </BackButton>
        </ScreenHeader>
    )
}

export default Header;

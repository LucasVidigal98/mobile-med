import React, { useState } from 'react';
import { BackButton, PageHeader, Container, DayText, ButtonDay, TextInfo } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import WrapperScreen from '../../components/Wrapper';

function MedicalSchedule() {
    const [daySelected, setDaySelected] = useState(false);
    const [day, setDay] = useState('');

    const { goBack, navigate } = useNavigation();

    function handleGoBack(){
        
        if(daySelected) {
            setDaySelected(false);
        }else{
            goBack();
        }

    }

    function handleGoMedical(){
        navigate('Routine');
    }

    function handleSelectDay(day:string){
        setDay(day);
        setDaySelected(true)
    }

    return (
       <WrapperScreen>
           <PageHeader>
                <BackButton onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color={'#48D1CC'}></Ionicons>
                </BackButton>
            </PageHeader>
            
            {!daySelected && (
                <Container>
                    <TextInfo>Selecione o dia semana para definir um novo horário</TextInfo>
                    <ButtonDay onPress={() => handleSelectDay('Segunda-Feira')}>
                        <DayText>Segunda-Feira</DayText>
                    </ButtonDay>

                    <ButtonDay onPress={() => handleSelectDay('Terça-Feira')}>
                        <DayText>Terça-Feira</DayText>
                    </ButtonDay>

                    <ButtonDay onPress={() => handleSelectDay('Quarta-Feira')}>
                        <DayText>Quarta-Feira</DayText>
                    </ButtonDay>

                    <ButtonDay onPress={() => handleSelectDay('Quinta-Feira')}>
                        <DayText>Quinta-Feira</DayText>
                    </ButtonDay>

                    <ButtonDay onPress={() => handleSelectDay('Sexta-Feira')}>
                        <DayText>Sexta-Feira</DayText>
                    </ButtonDay>

                    <ButtonDay onPress={() => handleSelectDay('Sábado')}>
                        <DayText>Sábado</DayText>
                    </ButtonDay>

                    <ButtonDay onPress={() => handleSelectDay('Domingo')}>
                        <DayText>Domingo</DayText>
                    </ButtonDay>
                </Container>
            )} 

            {daySelected && (
                <Container>
                    <TextInfo>{day}</TextInfo>
                    <ButtonDay onPress={handleGoMedical}>
                        <DayText>TESTE</DayText>
                    </ButtonDay>
                </Container>
            )}      
       </WrapperScreen>
    )
}

export default MedicalSchedule;

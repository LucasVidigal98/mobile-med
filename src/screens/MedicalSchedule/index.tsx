import React, { useEffect, useState } from 'react';
import { 
    BackButton, 
    PageHeader, 
    Container, 
    DayText, 
    ButtonDay, 
    ButtonGrid,
    FinishButton,
    TextInfo, 
    ScheduleContainer,
} from './styles';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';

import WrapperScreen from '../../components/Wrapper';
import ScheduleView from '../../components/ScheduleView';

function MedicalSchedule() {
    const [daySelected, setDaySelected] = useState(false);
    const [day, setDay] = useState('');
    const [infoDay, setInfoDay] = useState([{
        hour: '',
        active: false,
        medicine: '', 
        typeMedication: '', 
        amount: 0,
        amount_dose: '', 
        dose: '', 
        dosage: '', 
        routine: '', 
        observation: '',
        imgRou: '',
        imgMed: ''
    }]);

    const { goBack, navigate } = useNavigation();

    useEffect(() => {
        setInterval(() => {
            loadInfo();
        }, 1000)
    }, []);

    function handleGoBack(){
        
        if(daySelected) {
            setDaySelected(false);
        }else{
            goBack();
        }

    }

    async function handleSelectDay(day:string){
        setDay(day);

        switch(day){
            case "Diario":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'all');
                break;
            case "Segunda-Feira":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'monday');
                break;
            case "Terça-Feira":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'tuesday');
                break;
            case "Quarta-Feira":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'wednesday');
                break;
            case "Quinta-Feira":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'thursday');
                break;
            case "Sexta-Feira":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'friday');
                break;
            case "Sábado":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'saturday');
                break;
            case "Domingo":
                await AsyncStorage.setItem('@mobile-med/currentDay', 'sunday');
                break;
        }

        loadInfo();
        setDaySelected(true);
    }

    async function goPDF(){
        navigate('PDF');
    }

    async function loadInfo(){
        const currentDay = await AsyncStorage.getItem("@mobile-med/currentDay");
        const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
        let currentRecordConverted = parseInt(currentRecord as string) - 1;
        const info = await AsyncStorage.getItem(
        `@mobile-med/Record/${currentRecordConverted}`);
        const parsedInfo = JSON.parse(info as string);
        setInfoDay(parsedInfo["days"][currentDay as string]);
    }

    return (
       <WrapperScreen>
           <PageHeader>
                <BackButton onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color={'#48D1CC'}></Ionicons>
                </BackButton>
            </PageHeader>
            
            {!daySelected && (

                <ScrollView>
                    <Container>
                        <TextInfo>Selecione o dia semana para definir um novo horário</TextInfo>

                        <ButtonGrid>
                            <ButtonDay onPress={() => handleSelectDay('Diario')}>
                                <DayText>Diário</DayText>
                            </ButtonDay>

                            <ButtonDay onPress={() => handleSelectDay('Segunda-Feira')}>
                                <DayText>Segunda-Feira</DayText>
                            </ButtonDay>
                        </ButtonGrid>

                        <ButtonGrid>
                            <ButtonDay onPress={() => handleSelectDay('Terça-Feira')}>
                                <DayText>Terça-Feira</DayText>
                            </ButtonDay>

                            <ButtonDay onPress={() => handleSelectDay('Quarta-Feira')}>
                                <DayText>Quarta-Feira</DayText>
                            </ButtonDay>
                        </ButtonGrid>

                        <ButtonGrid>
                            <ButtonDay onPress={() => handleSelectDay('Quinta-Feira')}>
                                <DayText>Quinta-Feira</DayText>
                            </ButtonDay>

                            <ButtonDay onPress={() => handleSelectDay('Sexta-Feira')}>
                                <DayText>Sexta-Feira</DayText>
                            </ButtonDay>
                        </ButtonGrid>

                        <ButtonGrid>
                            <ButtonDay onPress={() => handleSelectDay('Sábado')}>
                                <DayText>Sábado</DayText>
                            </ButtonDay>

                            <ButtonDay onPress={() => handleSelectDay('Domingo')}>
                                <DayText>Domingo</DayText>
                            </ButtonDay>
                        </ButtonGrid>

                        <FinishButton onPress={goPDF}>
                            <DayText>Finalizar</DayText>
                        </FinishButton>
                    </Container>
                </ScrollView>
            )} 

            {daySelected && (
                <Container>
                    <TextInfo>{day}</TextInfo>

                    <ScrollView>

                        <ScheduleContainer>
                            <ScrollView horizontal>
                                
                                {infoDay.map((info, index) => {
                                    if(index >= 0 && index <= 5){
                                        return (
                                            <ScheduleView hour={info.hour} routineObject={info} key={index}/>
                                        )
                                    }
                                })}
                            </ScrollView>
                        </ScheduleContainer>

                        <ScheduleContainer>
                            <ScrollView horizontal>
                                
                                {infoDay.map((info, index) => {
                                    if(index > 5 && index <= 11){
                                        return (
                                            <ScheduleView hour={info.hour} routineObject={info} key={index}/>
                                        )
                                    }
                                })}
                            </ScrollView>
                        </ScheduleContainer>

                        <ScheduleContainer>
                            <ScrollView horizontal>
                                
                                {infoDay.map((info, index) => {
                                    if(index > 11 && index <= 17){
                                        return (
                                            <ScheduleView hour={info.hour} routineObject={info} key={index}/>
                                        )
                                    }
                                })}
                            </ScrollView>
                        </ScheduleContainer>

                        <ScheduleContainer>
                            <ScrollView horizontal>
                                
                                {infoDay.map((info, index) => {
                                    if(index > 17 && index <= 24){
                                        return (
                                            <ScheduleView hour={info.hour} routineObject={info} key={index}/>
                                        )
                                    }
                                })}
                            </ScrollView>
                        </ScheduleContainer>

                    </ScrollView>
                </Container>
            )}      
       </WrapperScreen>
    )
}

export default MedicalSchedule;

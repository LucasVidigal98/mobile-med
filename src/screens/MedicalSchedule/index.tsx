import React, { useState } from 'react';
import { 
    BackButton, 
    PageHeader, 
    Container, 
    DayText, 
    ButtonDay, 
    TextInfo, 
    ScheduleContainer,
} from './styles';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import WrapperScreen from '../../components/Wrapper';
import ScheduleView from '../../components/ScheduleView';

import ExampleRecord from '../../ExampleRecord.json';
import { RoutineInterface } from '../../components/ScheduleView';

function MedicalSchedule() {
    const [daySelected, setDaySelected] = useState(false);
    const [day, setDay] = useState('');
    const [infoDay, setInfoDay] = useState([{
        hour: '',
        active: false,
        medicine: '', 
        typeMedication: '', 
        amount: 0, 
        dose: '', 
        dosage: '', 
        routine: '', 
        observation: '',
    }]);

    const { goBack, navigate } = useNavigation();

    function handleGoBack(){
        
        if(daySelected) {
            setDaySelected(false);
        }else{
            goBack();
        }

    }

    function handleSelectDay(day:string){
        setDay(day);

        if(day === "Segunda-Feira"){
            loadInfoMonday();
        } else if(day === "Terça-Feira"){

        }

        setDaySelected(true)
    }

    function loadInfoMonday(){
        setInfoDay(ExampleRecord.days['monday']);
    }

    function loadInfoTuesday(){
        setInfoDay(ExampleRecord.days['tuesday']);
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

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { InfoText, Container, ContinueButton, TextButton } from './styles';

import Input from '../../components/Input';
import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';

export default function MedicalRecord() {
    
    const { navigate } = useNavigation();
    
    function handleGoReceita(){
        navigate("MedicalSchedule");
    }

    return (
        <WrapperScreen>
           <Header />
            
            <Container>
                <InfoText>Preencha os dados do paciente para continuar</InfoText>
                <Input label="Nome"/>
                <Input label="Idade"/>
                <Input label="Sexo"/>
                <Input label="Naturalidade"/>
                <Input label="Escolaridade"/>
                <Input label="Estado Civil"/>
                <Input label="Profissão"/>
                <ContinueButton onPress={handleGoReceita}>
                    <TextButton>Continuar</TextButton>
                </ContinueButton>
            </Container>
        </WrapperScreen>
    )
}

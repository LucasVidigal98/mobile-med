import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    InfoText, 
    Container, 
    ContinueButton, 
    TextButton
} from './styles';
import { ShapeInput, LabelInput, RecordInput } from '../../components/Input/styles';
import { Picker } from '@react-native-picker/picker';
import { Alert, AsyncStorage } from 'react-native';

import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import PickerContainer from '../../components/PickerContainer';
import { InputContainer } from '../Routine/styles';

export default function PacientForm() {
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [age, setAge] = useState('');
    const [fromTo, setFromTo] = useState('');
    const [degree, setDegree] = useState('');
    const [career, setCareer] = useState('');
    const [genre, setGenre] = useState(0);
    const [matrialStatus, setMatrialStatus] = useState(0);
    
    const { navigate } = useNavigation();
    
    const showAlert = () => {
        return Alert.alert('Preencha todos os campos para continuar!');
    }
    
    function handleGoRoutine(){
        navigate("MedicalSchedule");
    }

    async function handleAddPacient(){
        let nRecords = '0';
        nRecords = await AsyncStorage.getItem('@mobile-med/nRecords') as string;

        if(nRecords === null){
            await AsyncStorage.setItem('@mobile-med/nRecords', '0');
            nRecords = '0';
        }
        
        //name === '' || CPF === '' || age === '' || fromTo === '' || degree === '' || career === ''
        if(name === ''){
            showAlert();
        }else{
            let genreToString = '';
            let matrialStatusToString = '';
            switch (genre){
                case 0:
                    genreToString = "Masculino";
                    break;
                case 1:
                    genreToString = "Feminino";
                    break;
                case 2:
                    genreToString = "Outro";
                    break;
            }

            switch (matrialStatus){
                case 0:
                    matrialStatusToString = "Solteiro(a)";
                    break;
                case 1:
                    matrialStatusToString = "Casado(a)";
                    break;
                case 2:
                    matrialStatusToString = "Divorciado(a)";
                    break;
            }

            const pacient = {
                name,
                CPF,
                age,
                fromTo,
                degree,
                career,
                genreToString,
                matrialStatusToString
            }
            
            const id = Math.random().toString(36).substr(2, 9);
            const exampleRecord = require('../../ExampleRecord.json');
            const days = exampleRecord.days;
            const record = {
                id,
                pacient,
                days
            }

            const key = `@mobile-med/Record/${nRecords}`;
            let newNRecords:number = parseInt(nRecords);
            newNRecords += 1;
            await AsyncStorage.setItem(key, JSON.stringify(record));
            await AsyncStorage.setItem('@mobile-med/nRecords', newNRecords.toString());
            handleGoRoutine();
        }
    }

    return (
        <WrapperScreen>
           <Header />
            
            <Container>
                <InfoText>Preencha os dados do paciente para continuar</InfoText>
                <ShapeInput>
                    <LabelInput>Nome</LabelInput>
                    <RecordInput onChangeText={(text) => setName(text)}/>
                </ShapeInput>

                <ShapeInput>
                    <LabelInput>Idade</LabelInput>
                    <RecordInput onChangeText={(text) => setAge(text)}/>
                </ShapeInput>
                
                <InputContainer>
                    <PickerContainer label="Sexo">
                        <Picker
                            selectedValue={genre}
                            style={
                                {
                                    height: 25, 
                                    width: '100%',
                                }
                            }
                            onValueChange={(itemValue, itemIndex) =>
                                setGenre(itemValue as number)
                            }
                    
                        >
                        
                            <Picker.Item label="Masculino" value={0}/>
                            <Picker.Item label="Feminino" value={1}/>
                            <Picker.Item label="Outro" value={2}/>
                        </Picker>
                    </PickerContainer>
                    <PickerContainer label="Estado Cívil">
                        <Picker
                            selectedValue={matrialStatus}
                            style={
                                {
                                    height: 25, 
                                    width: '100%',
                                }
                            }
                            onValueChange={(itemValue, itemIndex) =>
                                setMatrialStatus(itemValue as number)
                            }
                    
                        >
                        
                            <Picker.Item label="Solteiro(a)" value={0}/>
                            <Picker.Item label="Casado(a)" value={1}/>
                            <Picker.Item label="Divorciado(a)" value={2}/>
                        </Picker>
                    </PickerContainer>
                </InputContainer>
                
                {/*<ShapeInput>
                    <LabelInput>Naturalidade</LabelInput>
                    <RecordInput onChangeText={(text) => setFromTo(text)}/>
                </ShapeInput>

                <ShapeInput>
                    <LabelInput>Escolaridade</LabelInput>
                    <RecordInput onChangeText={(text) => setDegree(text)}/>
                </ShapeInput>
               
                <ShapeInput>
                    <LabelInput>Profissão</LabelInput>
                    <RecordInput onChangeText={(text) => setCareer(text)}/>
                </ShapeInput>*/}

                <ContinueButton onPress={handleAddPacient}>
                    <TextButton>Continuar</TextButton>
                </ContinueButton>
            </Container>
        </WrapperScreen>
    )
}

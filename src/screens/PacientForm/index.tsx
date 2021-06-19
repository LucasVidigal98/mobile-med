import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    InfoText, 
    Container, 
    ContinueButton, 
    TextButton
} from './styles';
import { ShapeInput, LabelInput, RecordInput } from '../../components/Input/styles';
import { Alert, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Container as CT, Header as HD, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';

import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import PickerContainer from '../../components/PickerContainer';
import { InputContainer } from '../Routine/styles';
import { ScrollView } from 'react-native-gesture-handler';

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
            
            <CT>
                <Content style={{backgroundColor: 'none'}}>
                    <InfoText>Preencha os dados do paciente para continuar</InfoText>
                    <Form>
                        <Item rounded style={{marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC'}}>
                            <Icon active type="FontAwesome" name="user" style={{ color: '#48D1CC' }}/>
                            <Input placeholder="Paciente" onChangeText={(text) => setName(text)}/>
                        </Item>
                        <Item rounded style={{marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC'}}>
                            <Icon active type="FontAwesome" name="birthday-cake" style={{ color: '#48D1CC' }}/>
                            <Input placeholder="Idade" onChangeText={(text) => setAge(text)}/>
                        </Item>
                        <Item rounded picker style={{marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC'}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#48D1CC"
                                selectedValue={genre}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGenre(itemValue as number)}
                            >
                                <Picker.Item label="Masculino" value={0}/>
                                <Picker.Item label="Feminino" value={1}/>
                                <Picker.Item label="Outro" value={2}/>
                            </Picker>

                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={matrialStatus}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMatrialStatus(itemValue as number)}
                            >
                                <Picker.Item label="Solteiro(a)" value={0}/>
                                <Picker.Item label="Casado(a)" value={1}/>
                                <Picker.Item label="Divorciado(a)" value={2}/>
                            </Picker>
                        </Item>

                        <Item rounded style={{marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC'}}>
                            <Icon active type="FontAwesome" name="building" style={{ color: '#48D1CC' }}/>
                            <Input placeholder="Naturalidade" onChangeText={(text) => setFromTo(text)}/>
                        </Item>

                        <Item rounded style={{marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC'}}>
                            <Icon active type="FontAwesome" name="graduation-cap" style={{ color: '#48D1CC' }}/>
                            <Input placeholder="Escolaridade" onChangeText={(text) => setDegree(text)}/>
                        </Item>

                        <Item rounded style={{marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC'}}>
                            <Icon active type="FontAwesome" name="briefcase" style={{ color: '#48D1CC' }}/>
                            <Input placeholder="Profissão" onChangeText={(text) => setCareer(text)}/>
                        </Item>
                    </Form>
                </Content>
            
                <ContinueButton onPress={handleAddPacient}>
                    <TextButton>Continuar</TextButton>
                </ContinueButton>
            </CT>
        </WrapperScreen>
    )
}

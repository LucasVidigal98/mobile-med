import React, { useEffect, useState } from 'react';
import { Container, TextInfo, InputContainer, AddMidiaButton, PickerContainer, LabelPicker, InfoContainer, InfoContainerText, AddButton, RemoveButton } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import Input from '../../components/Input';

import TypeOfMedication from '../../veiculos.json';
import Dosage from '../../dose.json';

function Routine() {
    const [typeMedication, setTypeMedication] = useState(TypeOfMedication.veiculos[0]);
    const [dosage, setDosage] = useState(Dosage.dose[0]);
    const [addNewMedication, setaddNewMedication] = useState(false);
    const [addNewRoutine, setAddNewRoutine] = useState(false);

    function handleaddNewMedication(){
        setaddNewMedication(true);
    }

    function handleAddNewRoutine(){
        setAddNewRoutine(true);
    }

    function handleRemoveMedication(){
        setaddNewMedication(false);
    }

    return (
        <WrapperScreen>
            <Header />

            <Container>
                <TextInfo>Inforções do Horário</TextInfo>
                
                {!addNewMedication && (
                    <InfoContainer style={{alignItems: "center", justifyContent: "center"}}>
                        <InfoContainerText>Medicação</InfoContainerText>
                        <AddButton onPress={handleaddNewMedication}>
                            <Ionicons name="ios-add-circle" size={65} color={'#48D1CC'}/>
                        </AddButton>
                    </InfoContainer>
                )}

                {addNewMedication && (
                    <InfoContainer>
                        <InfoContainerText>Medicação</InfoContainerText>
                        <InputContainer>
                            <Input label="Medicamento"/>
                            <AddMidiaButton>
                                <Ionicons name="ios-image-outline" size={18} color={'white'}></Ionicons>
                            </AddMidiaButton>
                        </InputContainer>

                        <InputContainer>
                            <PickerContainer style={{width: '80%'}}>
                                <LabelPicker>Veículo</LabelPicker>
                                <Picker
                                    selectedValue={typeMedication}
                                    style={
                                        {
                                            height: 25, 
                                            width: '100%',
                                        }
                                    }
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTypeMedication(itemValue as string)
                                    }
                                >
                                    {TypeOfMedication.veiculos.map(type => (
                                        <Picker.Item label={type} value={type} key={type}/>
                                    ))}
                                </Picker>
                            </PickerContainer>
                        </InputContainer>
                        
                        <InputContainer>
                            <Input label="Quantidade" aditionalStyle />
                            <PickerContainer>
                                <LabelPicker>Dose</LabelPicker>
                                <Picker
                                    selectedValue={dosage}
                                    style={
                                        {
                                            height: 25, 
                                            width: '100%',
                                        }
                                    }
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDosage(itemValue as string)
                                    }
                                >
                                    {Dosage.dose.map(d => (
                                        <Picker.Item label={d} value={d} key={d}/>
                                    ))}
                                </Picker>
                            </PickerContainer>
                        </InputContainer>
                        
                        <InputContainer>
                            <Input label="Posologia"/>
                            <RemoveButton onPress={handleRemoveMedication}>
                                <Ionicons name="ios-remove" size={18} color={'white'}></Ionicons>
                            </RemoveButton>
                        </InputContainer>
                        
                    </InfoContainer>
                )}

                {!addNewRoutine && (
                    <InfoContainer style={{alignItems: "center", justifyContent: "center"}}>
                        <InfoContainerText>Rotina</InfoContainerText>
                        <AddButton onPress={handleAddNewRoutine}>
                            <Ionicons name="ios-add-circle" size={65} color={'#48D1CC'}/>
                        </AddButton>
                    </InfoContainer>
                )}

                {addNewRoutine && (
                    <InfoContainer>
                    <InfoContainerText>Rotina</InfoContainerText>

                    <InputContainer>
                            <PickerContainer style={{width: '80%'}}>
                                <LabelPicker>Rotina</LabelPicker>
                                <Picker
                                    selectedValue={typeMedication}
                                    style={
                                        {
                                            height: 25, 
                                            width: '100%',
                                        }
                                    }
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTypeMedication(itemValue as string)
                                    }
                                >
                                    
                                    <Picker.Item label="Almoço" value="Almoço" />
                                    <Picker.Item label="Café" value="Almoço" />
                                    <Picker.Item label="Jantar" value="Almoço" />
                                </Picker>
                            </PickerContainer>
                        </InputContainer>

                        <InputContainer>
                            <Input label="Observações"/>
                        </InputContainer>
                </InfoContainer>
                )}
            </Container>
        </WrapperScreen>
    )
}

export default Routine;
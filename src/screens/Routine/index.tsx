import React, { useEffect, useState } from 'react';
import { 
    Container,
    ContainerHeader, 
    TextInfo, 
    InputContainer, 
    AddMidiaButton,
    InfoContainer,
    HeaderInfoContainer,
    InfoContainerText, 
    AddButton, 
    RemoveButton,
    SaveButton
} from './styles';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import Input from '../../components/Input';

import TypeOfMedication from '../../veiculos.json';
import Dosage from '../../dose.json';
import PickerContainer from '../../components/PickerContainer';

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

    function handleRemoveRoutine(){
        setAddNewRoutine(false);
    }

    return (
        <WrapperScreen>
            <Header />

            <Container>
                <ContainerHeader>
                    <TextInfo>Inforções do Horário</TextInfo>

                    <SaveButton>
                        <Ionicons name="bookmark-outline" size={18} color={'white'}></Ionicons>
                    </SaveButton>
                </ContainerHeader>
                
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
                        <HeaderInfoContainer>
                            <InfoContainerText>Medicação</InfoContainerText>

                            <RemoveButton onPress={handleRemoveMedication}>
                                <Ionicons name="ios-remove" size={20} color={'white'}></Ionicons>
                            </RemoveButton>
                        </HeaderInfoContainer>
            
                        <InputContainer>
                            <Input label="Medicamento"/>
                            <AddMidiaButton>
                                <Ionicons name="ios-image-outline" size={18} color={'white'}></Ionicons>
                            </AddMidiaButton>
                        </InputContainer>

                        <InputContainer>
                            <PickerContainer label='Veículo' adtionalWidth='80%'>
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
                            <PickerContainer label='Dose'>
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
                        <HeaderInfoContainer>
                            <InfoContainerText>Rotina</InfoContainerText>

                            <RemoveButton onPress={handleRemoveRoutine}>
                                <Ionicons name="ios-remove" size={20} color={'white'}></Ionicons>
                            </RemoveButton>
                        </HeaderInfoContainer>
                    

                    <InputContainer>
                            <PickerContainer label='Rotina' adtionalWidth='80%'>
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
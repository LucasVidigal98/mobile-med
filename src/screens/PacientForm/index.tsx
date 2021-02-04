import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    InfoText, 
    Container, 
    ContinueButton, 
    TextButton,
} from './styles';
import { Picker } from '@react-native-picker/picker';

import Input from '../../components/Input';
import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import PickerContainer from '../../components/PickerContainer';
import { InputContainer } from '../Routine/styles';

export default function PacientForm() {
    const [genre, setGenre] = useState(0);
    const [matrialStatus, setMatrialStatus] = useState(0);
    
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
                <Input label="CPF" />
                <Input label="Idade"/>
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
                
                <Input label="Naturalidade"/>
                <Input label="Escolaridade"/>
               
                <Input label="Profissão"/>
                <ContinueButton onPress={handleGoReceita}>
                    <TextButton>Continuar</TextButton>
                </ContinueButton>
            </Container>
        </WrapperScreen>
    )
}

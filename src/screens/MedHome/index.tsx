import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
  Conatiner, 
  Options, 
  OptionsTetx, 
  OptionsButtonsArea, 
  OptionButton,
  ButtonText 
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

import WrapperScreen from '../../components/Wrapper';
import { AsyncStorage } from 'react-native';

export default function MedHome() {

  const { navigate } = useNavigation();

  async function handleNavigateGoToMedicalRecord(){
    await AsyncStorage.setItem('@mobile-med/edit', 'false');
    navigate("MedicalRecord");
  }

  function handleNavigateGoToRecordList(){
    navigate("RecordList");
  }

  return (
    <WrapperScreen>
      <Conatiner>
        <Options>
          <OptionsTetx>Mediquei</OptionsTetx>
          <OptionsButtonsArea>
            <OptionButton onPress={handleNavigateGoToRecordList}>
              <Ionicons name="ios-albums-outline" size={65} color={'#48D1CC'}/>
              <ButtonText>Listar Receituário</ButtonText>
            </OptionButton>
            <OptionButton onPress={handleNavigateGoToMedicalRecord}>
              <Ionicons name="ios-add-circle" size={65} color={'#48D1CC'}/>
              <ButtonText>Novo Receituário</ButtonText>
            </OptionButton>
          </OptionsButtonsArea>
        </Options>
      </Conatiner>
    </WrapperScreen>
  );
}
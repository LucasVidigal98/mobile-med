import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { 
  Conatiner, 
  Header, 
  HeaderText, 
  HeaderCfg, 
  Options, 
  OptionsTetx, 
  OptionsButtonsArea, 
  OptionButton,
  ButtonText 
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

import WrapperScreen from '../../components/Wrapper';

export default function MedHome() {

  const { navigate } = useNavigation();

  function handleNavigateGoToMedicalRecord(){
    navigate("MedicalRecord");
  }

  function handleNavigateGoToRecordList(){
    navigate("RecordList");
  }

  return (
    <WrapperScreen>
      <Conatiner>
        <Options>
          <OptionsTetx>NOME APLICATIVO</OptionsTetx>
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
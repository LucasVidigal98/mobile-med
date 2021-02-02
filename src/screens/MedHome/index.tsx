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

  return (
    <WrapperScreen>
      <Conatiner>
        <Header>
          <HeaderText>Olá Fulano, Seja Bem-Vindo</HeaderText>
          <HeaderCfg>
            <Ionicons name="construct" size={24} color={'#48D1CC'}/>
          </HeaderCfg>
        </Header>

        <Options>
          <OptionsTetx>O que deseja fazer?</OptionsTetx>
          <OptionsButtonsArea>
            <OptionButton>
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
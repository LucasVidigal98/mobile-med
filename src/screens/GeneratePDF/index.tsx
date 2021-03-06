import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native';
import WrapperScreen from '../../components/Wrapper';
import { ButtonText, OptionButton, Options, OptionsButtonsArea, OptionsTetx } from '../MedHome/styles';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

function GeneratePDF() {
  const [record, setRecord] = useState('');

  const { navigate } = useNavigation();

    useEffect(() => {
        loadInfo();
    }, [])

    async function loadInfo(){
        const currentDay = await AsyncStorage.getItem("@mobile-med/currentDay");
        const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
        let currentRecordConverted = parseInt(currentRecord as string) - 1;
        const info = await AsyncStorage.getItem(
        `@mobile-med/Record/${currentRecordConverted}`);
        const parsedInfo = JSON.parse(info as string);
        setRecord(parsedInfo);
    }

    function generatePDF(){

      const json = JSON.stringify(record);
      console.log('teste');
      api.post('pdf',{
        json
      }).then((res) => {
        console.log(res.data);
      }).catch(err => console.log(err));
    }

    function goHome(){
        navigate('MedHome');
    }

    return (
        <WrapperScreen>
        <Options>
          <OptionsTetx>O que deseja fazer?</OptionsTetx>
          <OptionsButtonsArea>
            <OptionButton onPress={generatePDF}>
              <Ionicons name="ios-document" size={65} color={'#48D1CC'}/>
              <ButtonText>Gerar Pdf</ButtonText>
            </OptionButton>
            <OptionButton onPress={goHome}>
              <Ionicons name="ios-home" size={65} color={'#48D1CC'}/>
              <ButtonText>Voltar à Home</ButtonText>
            </OptionButton>
          </OptionsButtonsArea>
        </Options>
        </WrapperScreen>
    )
}

export default GeneratePDF;

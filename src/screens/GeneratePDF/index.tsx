import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native';
import WrapperScreen from '../../components/Wrapper';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { ButtonText, OptionButton, Options, OptionsButtonsArea, OptionsTetx } from '../MedHome/styles';
import { TextInfo } from '../MedicalSchedule/styles';

import api from '../../services/api';

function GeneratePDF() {
  const [record, setRecord] = useState('');
  const [gettingPdf, setGettingPdf] = useState(false);
  const [pdfId, setPdfId] = useState(null);
  const [errorPdf, setErrorPdf] = useState(false);

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

    async function generatePDF(){
      setGettingPdf(true);
      setPdfId(null);
      setErrorPdf(false);

      const json = JSON.stringify(record);
      console.log('teste');
      api.post('pdf',{
        json
      }).then(async (res) => {
        const id = res.data.id;
        console.log(id);
        setGettingPdf(false);
        setPdfId(id);
      }).catch(err => {
        setErrorPdf(true)
        console.log(err);
      });
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

        {gettingPdf && <TextInfo>Gerando PDF do receituário, Aguarde alguns instantes ...</TextInfo>}
        {pdfId && <TextInfo>{`Seu PDF está pronto, para obte-lo acesse  http://192.168.0.108:3333/get_pdf=${pdfId}.pdf`}</TextInfo>}
        {errorPdf && <TextInfo>Erro ao gerar PDF, verefique sua conexão</TextInfo>}

        </WrapperScreen>
    )
}

export default GeneratePDF;

import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { AsyncStorage, Linking } from 'react-native';
import WrapperScreen from '../../components/Wrapper';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { ButtonText, OptionButton, Options, OptionsButtonsArea, OptionsTetx } from '../MedHome/styles';
import { TextInfo } from '../MedicalSchedule/styles';

import api from '../../services/api';

const LinkButton = styled.TouchableOpacity`
  background: #48D1CC;
  width: 150px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const LinkText = styled.Text`
  color: white;
`;

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

function GeneratePDF() {
  const [record, setRecord] = useState('');
  const [gettingPdf, setGettingPdf] = useState(false);
  const [pdfId, setPdfId] = useState(null);
  const [errorPdf, setErrorPdf] = useState(false);
  const [isDailyRoutine, setIsDailyRoutine] = useState(false);

  const { navigate } = useNavigation();

  useEffect(() => {
    loadInfo();
  }, []);

  function checkIsDailyRoutine(record: any): boolean {
    let isDailyRoutine: boolean = false;
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    record.days.all.forEach((item: any) => {
      if (item.active && (item.medicine !== "" || item.routine !== "")) {
        isDailyRoutine = true;
      }
    });

    if (isDailyRoutine) {
      days.forEach((day: string) => {
        record.days[day].forEach((item: any) => {
          if (item.active && (item.medicine !== "" || item.routine !== "")) {
            isDailyRoutine = false;
          }
        })
      });
    }

    return isDailyRoutine;
  }

  async function loadInfo() {
    let edit = false;
    edit = (await AsyncStorage.getItem("@mobile-med/edit") === "true") ? true : false;

    if (!edit) {
      const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
      let currentRecordConverted = parseInt(currentRecord as string) - 1;
      const info = await AsyncStorage.getItem(
        `@mobile-med/Record/${currentRecordConverted}`);
      const parsedInfo = JSON.parse(info as string);
      setRecord(parsedInfo);
      setIsDailyRoutine(checkIsDailyRoutine(parsedInfo));
    } else {
      const info = await AsyncStorage.getItem('@mobile-med/editRecord');
      const parsedInfo = JSON.parse(info as string);
      const id = parsedInfo["id"];
      const nRecords = await AsyncStorage.getItem("@mobile-med/nRecords");
      for (let i = 0; i < parseInt(nRecords as string); i++) {
        const record = await AsyncStorage.getItem(
          `@mobile-med/Record/${i}`
        );

        if (id === JSON.parse(record as string)["id"]) {
          const editRecord = JSON.parse(record as string);
          setRecord(editRecord);
          setIsDailyRoutine(checkIsDailyRoutine(editRecord));
          break;
        }
      }
    }
  }

  async function generatePDF() {
    setGettingPdf(true);
    setPdfId(null);
    setErrorPdf(false);

    const json = JSON.stringify(record);
    api.post('pdf', {
      json,
      all: isDailyRoutine
    }).then(async (res) => {
      const id = res.data.id;
      setGettingPdf(false);
      setPdfId(id);
    }).catch(err => {
      setErrorPdf(true)
      console.log(err);
    });
  }

  async function goHome() {
    await AsyncStorage.setItem('@mobile-med/edit', 'false');
    navigate('MedHome');
  }

  return (
    <WrapperScreen>
      <Options>
        <OptionsTetx>Mediquei</OptionsTetx>
        <OptionsButtonsArea>
          <OptionButton onPress={generatePDF}>
            <Ionicons name="ios-document" size={65} color={'#48D1CC'} />
            <ButtonText>Gerar Pdf</ButtonText>
          </OptionButton>
          <OptionButton onPress={goHome}>
            <Ionicons name="ios-home" size={65} color={'#48D1CC'} />
            <ButtonText>Voltar à Home</ButtonText>
          </OptionButton>
        </OptionsButtonsArea>
      </Options>

      <Container>
        {gettingPdf && <TextInfo>Gerando PDF do receituário, Aguarde alguns instantes ...</TextInfo>}
        {pdfId && (
          <>
            <TextInfo>{`Seu PDF está pronto, para obte-lo acesse  https://mobile-med-api.herokuapp.com/get_pdf/?id=${pdfId}`}</TextInfo>
            <LinkButton onPress={() => { Linking.openURL(`https://mobile-med-api.herokuapp.com/get_pdf/?id=${pdfId}`) }}>
              <LinkText>Acessar Navegador</LinkText>
            </LinkButton>
          </>
        )}
        {errorPdf && <TextInfo>Erro ao gerar PDF, verefique sua conexão</TextInfo>}
      </Container>
    </WrapperScreen>
  )
}

export default GeneratePDF;

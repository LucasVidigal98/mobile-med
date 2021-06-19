import React, { useEffect, useState } from "react";
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
  SaveButton,
  SaveButtonImg,
  ContainerForm
} from "./styles";
import {
  ShapeInput,
  LabelInput,
  RecordInput,
} from "../../components/Input/styles";

import { Container as CT, Header as HD, Content, Form, Item, Input, Label, Icon, Picker, Button, Text } from 'native-base';

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AsyncStorage, Alert, KeyboardAvoidingView } from "react-native";

import Header from "../../components/Header";
import WrapperScreen from "../../components/Wrapper";

import TypeOfMedication from "../../veiculos.json";
import Dosage from "../../dose.json";
import Range from '../../Range.json';
import RoutineObject from "../../Rotina.json";
import PickerContainer from "../../components/PickerContainer";
import SavingDisk from '../../assets/icons/saving-disk.png';

import TemplateImageMed from '../../templateImageMed.json';
import TemplateImageRou from '../../templateImageRou.json';

function Routine() {
  const showAlert = (message: string) => {
    return Alert.alert(message);
  }
  const [medicine, setMedicine] = useState('');
  const [active, setActive] = useState(false);
  const [amount, setAmount] = useState(0);
  const [typeMedication, setTypeMedication] = useState(
    TypeOfMedication.veiculos[0]
  );
  const [dose, setDose] = useState(Dosage.dose[0]);
  const [dosage, setDosage] = useState('');
  const [amountDose, setAmountDose] = useState('');
  const [routine, setRoutine] = useState(RoutineObject.Rotina[0]);
  const [observation, setObservation] = useState('');
  const [imgRou, setImgRou] = useState('');
  const [imgMed, setImgMed] = useState('');
  const [addNewMedication, setaddNewMedication] = useState(false);
  const [addNewRoutine, setAddNewRoutine] = useState(false);
  const [hour, setHour] = useState("");
  const [routineInfo, setRoutineInfo] = useState([
    {
      hour: "",
      active: false,
      medicine: "",
      typeMedication: "",
      amount: 0,
      dose: "",
      amount_dose: "",
      dosage: "",
      routine: "",
      observation: "",
      imgRou: "",
      imgMed: ""
    },
  ]);
  const [hourInfo, setHourInfo] = useState({
    hour: "",
    active: false,
    medicine: "",
    typeMedication: "",
    amount: 0,
    dose: "",
    dosage: "",
    amount_dose: "",
    routine: "",
    observation: "",
    imgRou: "",
    imgMed: ""
  });

  const { goBack } = useNavigation();

  async function getDayInfo() {
    const currentDay = await AsyncStorage.getItem("@mobile-med/currentDay");
    const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
    let currentRecordConverted = parseInt(currentRecord as string) - 1;
    const info = await AsyncStorage.getItem(
      `@mobile-med/Record/${currentRecordConverted}`
    );
    const parsedInfo = JSON.parse(info as string);
    setRoutineInfo(parsedInfo["days"][currentDay as string]);
    setHour((await AsyncStorage.getItem("@mobile-med/currentHour")) as string);
  }

  useEffect(() => {
    getDayInfo();
  }, []);

  useEffect(() => {
    let activeMedication = false;
    let activeRoutine = false;
    routineInfo.forEach(routine => {
      if (routine.hour === hour) {
        activeMedication = routine.medicine !== "" ? true : false;
        activeRoutine = routine.routine !== "" ? true : false;
        setHourInfo(routine);
      }
    });

    if (activeRoutine) {
      setAddNewRoutine(true);
    }

    if (activeMedication) {
      setaddNewMedication(true);
    }

  }, [hour]);

  useEffect(() => {
    setMedicine(hourInfo.medicine);
    setDosage(hourInfo.dosage);
    setActive(hourInfo.active);
    setAmount(hourInfo.amount);
    setObservation(hourInfo.observation);
    setAmountDose(hourInfo.amount_dose);

    let i;
    for (i = 0; i < TypeOfMedication.veiculos.length; i++) {
      if (hourInfo.typeMedication === TypeOfMedication.veiculos[i]) {
        setTypeMedication(TypeOfMedication.veiculos[i]);
        break;
      }
    }
    for (i = 0; i < Dosage.dose.length; i++) {
      if (hourInfo.dose === Dosage.dose[i]) {
        setDose(Dosage.dose[i]);
        break;
      }
    }
    for (i = 0; i < RoutineObject.Rotina.length; i++) {
      if (hourInfo.routine === RoutineObject.Rotina[i]) {
        setRoutine(RoutineObject.Rotina[i]);
        break;
      }
    }

    handleSaveDb();
  }, [hourInfo]);

  function handleaddNewMedication() {
    setaddNewMedication(true);
  }

  function handleAddNewRoutine() {
    setAddNewRoutine(true);
  }

  function handleRemoveMedication() {
    setaddNewMedication(false);
  }

  function handleRemoveRoutine() {
    setAddNewRoutine(false);
  }

  async function handleSaveDb() {
    let index: number = 0;
    for (let i = 0; i < routineInfo.length; i++) {
      if (routineInfo[i].hour === hourInfo.hour) {
        break;
      }

      index++;
    }

    routineInfo[index] = hourInfo;

    const currentDay = await AsyncStorage.getItem("@mobile-med/currentDay");
    const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
    let currentRecordConverted = parseInt(currentRecord as string) - 1;
    const info = await AsyncStorage.getItem(
      `@mobile-med/Record/${currentRecordConverted}`
    );
    const parsedInfo = JSON.parse(info as string);
    parsedInfo["days"][currentDay as string] = routineInfo;
    await AsyncStorage.setItem(`@mobile-med/Record/${currentRecordConverted}`, JSON.stringify(parsedInfo));
  }

  function handleSave() {
    if (medicine !== '' && ((amount === 0 || dose === "" || dosage === "" || dose === ""))) {
      showAlert('Preencha todos os campos da medicação!');
      return;
    }
    //ammount == numero

    let medIndex: number = 0;
    if (addNewMedication) {
      for (let i = 0; i < TypeOfMedication.veiculos.length; i++) {
        if (TypeOfMedication.veiculos[i] === typeMedication) {
          break;
        }

        medIndex++;
      }
    }

    let rouIndex: number = 0;
    if (addNewRoutine) {
      for (let i = 0; i < RoutineObject.Rotina.length; i++) {
        if (RoutineObject.Rotina[i] === routine) {
          break;
        }

        rouIndex++;
      }
    }

    setHourInfo({
      hour,
      medicine: addNewMedication ? medicine : "",
      amount: addNewMedication ? amount : 0,
      active: true,
      dosage: addNewMedication ? dosage : "",
      amount_dose: addNewMedication ? amountDose : "",
      dose: addNewMedication ? dose : "",
      observation: addNewRoutine ? observation : "",
      routine: addNewRoutine ? routine : "",
      typeMedication: addNewMedication ? typeMedication : "",
      imgRou: addNewRoutine ? TemplateImageRou.image[rouIndex] : "",
      imgMed: addNewMedication ? TemplateImageMed.image[medIndex] : ""
    });

    showAlert('Informações Salvas com sucesso!');
    goBack();
  }

  return (
    <WrapperScreen>
      <Header />

      <Container>
        <ContainerHeader>
          <Button iconLeft rounded style={{ backgroundColor: "#48D1CC" }}>
            <Icon name='save' />
            <Text>Salvar</Text>
          </Button>

          <TextInfo>Horário - {hour}</TextInfo>
        </ContainerHeader>

        <ScrollView style={{ maxHeight: '100%' }}>
          <KeyboardAvoidingView behavior="padding" enabled>

            {(!addNewMedication) && (
              <InfoContainer
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <InfoContainerText>Medicação</InfoContainerText>
                <AddButton onPress={handleaddNewMedication}>
                  <Ionicons name="ios-add-circle" size={65} color={"#48D1CC"} />
                </AddButton>
              </InfoContainer>
            )}

            {(addNewMedication) && (
              <InfoContainer>
                <HeaderInfoContainer>
                  <InfoContainerText>Medicação</InfoContainerText>

                  <RemoveButton onPress={handleRemoveMedication}>
                    <Ionicons
                      name="ios-remove"
                      size={20}
                      color={"white"}
                    ></Ionicons>
                  </RemoveButton>
                </HeaderInfoContainer>
                
                <Form>
                  <Item rounded style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                    <Input placeholder="Medicamento" defaultValue={active ? medicine : ''} onChangeText={text => setMedicine(text)} />
                  </Item>

                  <Item style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#FFF' }}>
                    <Label style={{ fontSize: 15 }}>Quantidade</Label>
                  </Item>

                  <Item rounded picker style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                      placeholder="Select your SIM"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#48D1CC"
                      selectedValue={amount as any}
                      onValueChange={(itemValue, itemIndex) =>
                        setAmount(itemValue as number)}
                    >
                      {Range.Range.map(i => (
                        <Picker.Item label={i as any} value={i} key={i} />
                      ))}
                    </Picker>
                  </Item>

                  <Item style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#FFF' }}>
                    <Label style={{ fontSize: 15 }}>Forma farmaceutica</Label>
                  </Item>

                  <Item rounded picker style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                      placeholder="Select your SIM"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#48D1CC"
                      selectedValue={amount as any}
                      onValueChange={(itemValue, itemIndex) =>
                        setAmount(itemValue as number)}
                    >
                      {TypeOfMedication.veiculos.map((type) => (
                        <Picker.Item label={type} value={type} key={type} />
                      ))}
                    </Picker>
                  </Item>

                  <Item style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#FFF' }}>
                    <Label style={{ fontSize: 15 }}>Dose</Label>
                  </Item>

                  <Item rounded picker style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                      placeholder="Select your SIM"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#48D1CC"
                      selectedValue={amountDose}
                      onValueChange={(itemValue, itemIndex) =>
                        setAmountDose(itemValue as any)}
                    >
                      {Range.Range.map(i => (
                        <Picker.Item label={i as any} value={i} key={i} />
                      ))}
                    </Picker>

                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                      placeholder="Select your SIM"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={dose}
                      onValueChange={(itemValue, itemIndex) =>
                        setDosage(itemValue as string)}
                    >
                      {Dosage.dose.map((d) => (
                        <Picker.Item label={d} value={d} key={d} />
                      ))}
                    </Picker>
                  </Item>

                  <Item rounded style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                    <Input placeholder="Posologia" defaultValue={active ? dosage : ''} onChangeText={text => setDosage(text)} />
                  </Item>
                </Form>
              </InfoContainer>
            )}

            {(!addNewRoutine) && (
              <InfoContainer
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <InfoContainerText>Rotina</InfoContainerText>
                <AddButton onPress={handleAddNewRoutine}>
                  <Ionicons name="ios-add-circle" size={65} color={"#48D1CC"} />
                </AddButton>
              </InfoContainer>
            )}

            {(addNewRoutine) && (
              <InfoContainer>
                <HeaderInfoContainer>
                  <InfoContainerText>Rotina</InfoContainerText>

                  <RemoveButton onPress={handleRemoveRoutine}>
                    <Ionicons
                      name="ios-remove"
                      size={20}
                      color={"white"}
                    ></Ionicons>
                  </RemoveButton>
                </HeaderInfoContainer>

                <Item style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#FFF' }}>
                  <Label style={{ fontSize: 15 }}>Rotina</Label>
                </Item>

                <Item rounded picker style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined, height: 50, marginRight: 10, marginLeft: 10 }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#48D1CC"
                    selectedValue={amount as any}
                    onValueChange={(itemValue, itemIndex) =>
                      setAmount(itemValue as number)}
                  >
                    {RoutineObject.Rotina.map(r => (
                      <Picker.Item label={r} value={r} key={r} />
                    ))}
                  </Picker>
                </Item>

                <Item rounded style={{ marginRight: 10, marginLeft: 10, marginTop: 10, borderColor: '#48D1CC' }}>
                  <Input placeholder="Observações" defaultValue={active ? observation : ''} onChangeText={text => setObservation(text)} />
                </Item>
              </InfoContainer>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    </WrapperScreen>
  );
}

export default Routine;


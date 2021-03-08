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
} from "./styles";
import {
  ShapeInput,
  LabelInput,
  RecordInput,
} from "../../components/Input/styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage, Alert, KeyboardAvoidingView } from "react-native";

import Header from "../../components/Header";
import WrapperScreen from "../../components/Wrapper";

import TypeOfMedication from "../../veiculos.json";
import Dosage from "../../dose.json";
import RoutineObject from "../../Rotina.json";
import PickerContainer from "../../components/PickerContainer";
import SavingDisk from '../../assets/icons/saving-disk.png';

import TemplateImageMed from '../../templateImageMed.json';
import TemplateImageRou from '../../templateImageRou.json';

function Routine() {
  const showAlert = (message:string) => {
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
    routineInfo.forEach(routine => {
      if(routine.hour === hour){
        setHourInfo(routine);
      }
    });
  }, [hour]);

  useEffect(() => {
    setMedicine(hourInfo.medicine);
    setDosage(hourInfo.dosage);
    setActive(hourInfo.active);
    setAmount(hourInfo.amount);
    setObservation(hourInfo.observation);

    let i;
    for(i = 0; i<TypeOfMedication.veiculos.length; i++){
      if(hourInfo.typeMedication === TypeOfMedication.veiculos[i]){
        setTypeMedication(TypeOfMedication.veiculos[i]);
        break;
      }
    }
    for(i = 0; i<Dosage.dose.length; i++){
      if(hourInfo.dose === Dosage.dose[i]){
        setDose(Dosage.dose[i]);
        break;
      }
    }
    for(i = 0; i<RoutineObject.Rotina.length; i++){
      if(hourInfo.routine === RoutineObject.Rotina[i]){
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

  async function handleSaveDb(){
    let index:number = 0;
    for(let i=0; i<routineInfo.length; i++){
      if(routineInfo[i].hour === hourInfo.hour){
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
    if(medicine !== '' && ((amount === 0 || dose === "" || dosage === "" || dose === ""))){
      showAlert('Preencha todos os campos da medicação!');
      return;
    }
    //ammount == numero

    let medIndex:number = 0;
    if(addNewMedication){
      for(let i=0; i<TypeOfMedication.veiculos.length; i++){
        if(TypeOfMedication.veiculos[i] === typeMedication){
          break;
        }

        medIndex++;
      }
    }

    let rouIndex:number = 0;
    if(addNewRoutine){
      for(let i=0; i<RoutineObject.Rotina.length; i++){
        if(RoutineObject.Rotina[i] === routine){
          break;
        }
    
        rouIndex++;
      }
    }
    
    setHourInfo({
      hour,
      medicine: addNewMedication? medicine : "",
      amount: addNewMedication? amount : 0,
      active: true,
      dosage: addNewMedication? dosage : "",
      amount_dose: addNewMedication? amountDose: "",
      dose: addNewMedication? dose: "",
      observation: addNewRoutine?  observation : "",
      routine: addNewRoutine? routine: "",
      typeMedication: addNewMedication? typeMedication: "",
      imgRou: addNewRoutine? TemplateImageRou.image[rouIndex] : "",
      imgMed: addNewMedication? TemplateImageMed.image[medIndex] : ""
    });

    showAlert('Informações Salvas com sucesso!');
    goBack();
  }

  return (
    <WrapperScreen>
      <Header />

      <Container>
        <ContainerHeader>
          <SaveButton onPress={handleSave}>
            <SaveButtonImg source={SavingDisk}/>
          </SaveButton>

          <TextInfo>Horário - {hour}</TextInfo>
        </ContainerHeader>

        <KeyboardAvoidingView behavior="padding" enabled>
          {(!addNewMedication && !hourInfo.active) && (
            <InfoContainer
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <InfoContainerText>Medicação</InfoContainerText>
              <AddButton onPress={handleaddNewMedication}>
                <Ionicons name="ios-add-circle" size={65} color={"#48D1CC"} />
              </AddButton>
            </InfoContainer>
          )}

          {(addNewMedication || hourInfo.active) && (
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

              <InputContainer>
                <ShapeInput>
                  <LabelInput>Medicamento</LabelInput>
                  <RecordInput defaultValue={active ? medicine : ''} onChangeText={text => setMedicine(text)}/>
                </ShapeInput>

                <AddMidiaButton>
                  <Ionicons
                    name="ios-image-outline"
                    size={18}
                    color={"white"}
                  ></Ionicons>
                </AddMidiaButton>
              </InputContainer>

              <InputContainer>
                <ShapeInput>
                    <LabelInput>Quantidade</LabelInput>
                    <RecordInput defaultValue={active ? amount.toString() : ''} onChangeText={text => setAmount(parseInt(text))}/>
                </ShapeInput>
              </InputContainer>

              <InputContainer>
                <PickerContainer label="Veículo" adtionalWidth="80%">
                  <Picker
                    selectedValue={typeMedication}
                    style={{
                      height: 25,
                      width: "100%",
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setTypeMedication(itemValue as string)
                    }
                  >
                    {TypeOfMedication.veiculos.map((type) => (
                      <Picker.Item label={type} value={type} key={type} />
                    ))}
                  </Picker>
                </PickerContainer>
              </InputContainer>

              <InputContainer>
                <ShapeInput style={{ width: "38%" }}>
                  <LabelInput>Dose</LabelInput>
                  <RecordInput defaultValue={active ? amountDose : ''} onChangeText={text => setAmountDose(text)}/>
                </ShapeInput>

                <PickerContainer label="">
                  <Picker
                    selectedValue={dose}
                    style={{
                      height: 25,
                      width: "100%",
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setDose(itemValue as string)
                    }
                  >
                    {Dosage.dose.map((d) => (
                      <Picker.Item label={d} value={d} key={d} />
                    ))}
                  </Picker>
                </PickerContainer>
              </InputContainer>

              <InputContainer>
                <ShapeInput>
                  <LabelInput>Posologia</LabelInput>
                  <RecordInput defaultValue={active ? dosage : ''} onChangeText={text => setDosage(text)}/>
                </ShapeInput>
              </InputContainer>
            </InfoContainer>
          )}

          {(!addNewRoutine && !hourInfo.active) && (
            <InfoContainer
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <InfoContainerText>Rotina</InfoContainerText>
              <AddButton onPress={handleAddNewRoutine}>
                <Ionicons name="ios-add-circle" size={65} color={"#48D1CC"} />
              </AddButton>
            </InfoContainer>
          )}

          {(addNewRoutine || hourInfo.active) && (
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

              <InputContainer>
                <PickerContainer label="Rotina" adtionalWidth="80%">
                  <Picker
                    selectedValue={routine}
                    style={{
                      height: 25,
                      width: "100%",
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setRoutine(itemValue as string)
                    }
                  >
                    {RoutineObject.Rotina.map(r => (
                      <Picker.Item label={r} value={r} key={r} />
                    ))}
                  </Picker>
                </PickerContainer>
              </InputContainer>
              
              <InputContainer>
                <ShapeInput>
                  <LabelInput>Observações</LabelInput>
                  <RecordInput defaultValue={active ? observation : ''} onChangeText={text => setObservation(text)}/>
                </ShapeInput>
              </InputContainer>
            </InfoContainer>
          )}
        </KeyboardAvoidingView>
      </Container>
    </WrapperScreen>
  );
}

export default Routine;


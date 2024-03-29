import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  ContainerHeader,
  TextInfo,
  InfoContainer,
  HeaderInfoContainer,
  InfoContainerText,
  AddButton,
  RemoveButton,
} from "./styles";


import { Form, Item, Input, Label, Icon, Picker, Button, Text, View } from 'native-base';
import { Camera } from 'expo-camera';

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Alert, KeyboardAvoidingView, TouchableOpacity, Image, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from "../../components/Header";
import WrapperScreen from "../../components/Wrapper";

import TypeOfMedication from "../../veiculos.json";
import Dosage from "../../dose.json";
import RoutineObject from "../../Rotina.json";

import TemplateImageMed from '../../templateImageMed.json';
import TemplateImageRou from '../../templateImageRou.json';

function Routine() {
  const showAlert = (message: string) => {
    return Alert.alert(message);
  }
  const [medicine, setMedicine] = useState('');
  const [active, setActive] = useState(false);
  const [amount, setAmount] = useState(1);
  const [typeMedication, setTypeMedication] = useState(
    TypeOfMedication.veiculos[0]
  );
  const [dose, setDose] = useState('mg');
  const [dosage, setDosage] = useState('1');
  const [amountDose, setAmountDose] = useState('1');
  const [routine, setRoutine] = useState(RoutineObject.Rotina[0]);
  const [observation, setObservation] = useState('');
  const [imgRou, setImgRou] = useState('');
  const [imgMed, setImgMed] = useState('');
  const [addNewMedication, setaddNewMedication] = useState(false);
  const [addNewRoutine, setAddNewRoutine] = useState(false);
  const [addNewImage, setAddNewImage] = useState(false);
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
      imgMed: "",
      imgs: []
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
    imgMed: "",
    imgs: []
  });

  const [camera, setCamera] = useState(false);
  const camRef = useRef<any>();
  const [hasPermission, setHasPermission] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [openImage, setOpenImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [camera]);


  useEffect(() => {
    getDayInfo();
  }, []);

  useEffect(() => {
    let activeMedication = false;
    let activeRoutine = false;
    let activeImage = false;
    routineInfo.forEach(routine => {
      if (routine.hour === hour) {
        activeMedication = routine.medicine !== "" ? true : false;
        activeRoutine = routine.routine !== "" ? true : false;
        if (routine.imgs !== undefined) {
          activeImage = routine.imgs.length > 0 ? true : false;
          activeImage ? setImages(routine.imgs) : setImages([]);
        }
        setHourInfo(routine);
      }
    });

    if (activeRoutine) {
      setAddNewRoutine(true);
    }

    if (activeMedication) {
      setaddNewMedication(true);
    }

    if (activeImage) {
      setAddNewImage(true);
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

  function handleAddNewImage() {
    setAddNewImage(true);
  }

  function handleRemoveMedication() {
    setaddNewMedication(false);
  }

  function handleRemoveRoutine() {
    setAddNewRoutine(false);
  }

  function handleRemoveImage() {
    setAddNewImage(false);
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
    const edit = (await AsyncStorage.getItem("@mobile-med/edit") === "true") ? true : false;
    const currentDay = await AsyncStorage.getItem("@mobile-med/currentDay");
    if (edit) {
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
          for (let i = 0; i < parsedInfo["days"][currentDay as string].length; i++) {
            if (editRecord["days"][currentDay as string][i].hour === routineInfo[index].hour) {
              editRecord["days"][currentDay as string][i] = routineInfo[index];
            }
          }
          await AsyncStorage.setItem(`@mobile-med/Record/${i}`, JSON.stringify(editRecord));
          break;
        }
      }
    } else {
      const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
      let currentRecordConverted = parseInt(currentRecord as string) - 1;
      const info = await AsyncStorage.getItem(
        `@mobile-med/Record/${currentRecordConverted}`
      );
      const parsedInfo = JSON.parse(info as string);
      for (let i = 0; i < parsedInfo["days"][currentDay as string].length; i++) {
        if (parsedInfo["days"][currentDay as string][i].hour === routineInfo[index].hour) {
          parsedInfo["days"][currentDay as string][i] = routineInfo[index];
          break;
        }
      }

      await AsyncStorage.setItem(`@mobile-med/Record/${currentRecordConverted}`, JSON.stringify(parsedInfo));
    }
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
      imgMed: addNewMedication ? TemplateImageMed.image[medIndex] : "",
      imgs: addNewImage ? images as any : [],
    });

    showAlert('Informações Salvas com sucesso!');
    goBack();
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setImages([...images, data.uri]);
      setCamera(false);
    }
  }

  function getImageName(uri: string) {
    const name = uri.split('/').pop();
    return name;
  }

  function handleOpenImage(index: number) {
    setOpenImage(true);
    setCurrentImage(index);
  }

  function handleDeleteImage(index: number) {
    const imagesCopy = images;
    imagesCopy.splice(index, 1);
    setImages(imagesCopy);
    setOpenImage(false);
  }

  return (
    <WrapperScreen>
      {(camera && hasPermission) && (
        <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', top: 50 }}>
          <Camera style={{ flex: 1 }} ref={camRef}>

            <TouchableOpacity onPress={() => { setCamera(false) }}>
              <Ionicons name="close" style={{ top: 10, fontSize: 60, color: '#fff' }} />
            </TouchableOpacity>

            <View style={{ alignItems: 'center', justifyContent: 'center', top: '80%' }}>
              <TouchableOpacity
                onPress={takePicture}>
                <Ionicons name="camera" style={{ fontSize: 60, color: '#fff' }} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}

      {(!camera) && (
        <>
          <Header />

          <Container>
            <ContainerHeader>
              <Button iconLeft rounded style={{ backgroundColor: "#48D1CC" }} onPress={handleSave}>
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
                        <Input placeholder="0" defaultValue={active ? amount.toString() : ''} onChangeText={text => setAmount(parseInt(text))} />
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
                          selectedValue={typeMedication as any}
                          onValueChange={(itemValue, itemIndex) =>
                            setTypeMedication(itemValue as any)}
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
                        <Input placeholder="0" defaultValue={active ? amountDose : ''} onChangeText={text => setAmountDose(text)} />
                        <Input placeholder="mg" defaultValue={active ? dose : 'mg'} onChangeText={text => setDose(text)} />
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
                        selectedValue={routine as any}
                        onValueChange={(itemValue, itemIndex) =>
                          setRoutine(itemValue as string)}
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

                {(!addNewImage) && (
                  <InfoContainer
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <InfoContainerText>Imagens</InfoContainerText>
                    <AddButton onPress={handleAddNewImage}>
                      <Ionicons name="ios-add-circle" size={65} color={"#48D1CC"} />
                    </AddButton>
                  </InfoContainer>
                )}

                {(addNewImage) && (
                  <InfoContainer>
                    <HeaderInfoContainer>
                      <InfoContainerText>Imagens</InfoContainerText>

                      <RemoveButton onPress={handleRemoveImage}>
                        <Ionicons
                          name="ios-remove"
                          size={20}
                          color={"white"}
                        ></Ionicons>
                      </RemoveButton>
                    </HeaderInfoContainer>

                    <TouchableOpacity
                      style={{ width: 30, height: 30, backgroundColor: '#48D1CC', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}
                      onPress={() => { setCamera(!camera) }}
                    >
                      <Ionicons name="camera" style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, width: '100%' }}>
                      {images.map((image, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{ top: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                          onPress={() => { handleOpenImage(index) }}
                        >
                          <Text style={{ fontSize: 10 }} >{getImageName(image)}</Text>
                          <Ionicons name="ios-checkmark-circle" style={{ color: '#4BB543', marginLeft: 5 }} />
                        </TouchableOpacity>
                      ))}
                    </View>

                    {openImage && (
                      <Modal
                        animationType="slide"
                        transparent={false}
                        visible={openImage}
                      >
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { setOpenImage(false) }}>
                              <Ionicons name="close" style={{ color: '#fff', top: 20, bottom: 20, fontSize: 60 }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { handleDeleteImage(currentImage) }}>
                              <Ionicons name="ios-trash" style={{ color: 'red', top: 20, bottom: 20, fontSize: 60 }} />
                            </TouchableOpacity>
                          </View>

                          <Image source={{ uri: images[currentImage] }} style={{ width: '100%', height: '100%', top: 30 }} ></Image>
                        </View>
                      </Modal>
                    )}

                    {(!hasPermission) && (
                      <Text>Permissão de acesso a câmera negada!</Text>
                    )}

                  </InfoContainer>
                )}
              </KeyboardAvoidingView>
            </ScrollView>
          </Container>
        </>)}
    </WrapperScreen>
  );
}

export default Routine;


import styled from 'styled-components/native';
import Constants from "expo-constants";
import { Platform } from "react-native";

const statisBarHight = 
    Platform.OS === "android" ? Constants.statusBarHeight : 0;

export const Container = styled.View`
    flex: 1;
    margin-top: ${statisBarHight + 1 + "px"};
    align-items: center;
`;

export const InfoText = styled.Text`
    font-size: 16px;
`;

export const ContinueButton = styled.TouchableOpacity`
    border-radius: 8px;
    width: 65%;
    height: 46px;
    background: #48D1CC;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;
`;

export const TextButton = styled.Text`
    color: white;
`;

export const ContainerInput = styled.View`
    margin-top: 1px;
    width: 65%;
    margin-bottom: 0px;
`;

export const LabelInput = styled.Text`
    font-size: 13px;
`;

export const RecordInput = styled.TextInput`
    width: 100%;
    height: 36px;
    border-radius: 8px;
    border: 1px solid lightgrey;
    padding: 5px;
`;
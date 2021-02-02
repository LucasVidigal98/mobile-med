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
    margin-top: 1px;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: white;
`;
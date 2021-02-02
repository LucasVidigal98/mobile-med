import styled from 'styled-components/native';
import Constants from "expo-constants";
import { Platform } from "react-native";

const statisBarHight = 
    Platform.OS === "android" ? Constants.statusBarHeight : 0;

export const PageHeader = styled.View`
    margin-top: ${statisBarHight + 1 + "px"};
    margin-left: ${14 + 'px'};
    margin-bottom: 3px;
`;

export const BackButton = styled.TouchableOpacity`
    padding: 0;
    margin: 0;
`;

export const TextInfo = styled.Text`
    font-size: 15px;
    margin-bottom: 10px;
`;

export const ButtonDay = styled.TouchableOpacity`
    width: 85%;
    height: 50px;
    border-radius: 8px;
    background: #48D1CC;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
`;

export const DayText = styled.Text`
    color: white;
    font-size: 16px;
`;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
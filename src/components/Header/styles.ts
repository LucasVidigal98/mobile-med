import styled from 'styled-components/native';
import Constants from "expo-constants";
import { Platform } from "react-native";

const statisBarHight = 
    Platform.OS === "android" ? Constants.statusBarHeight : 0;

export const ScreenHeader = styled.View`
    margin-top: ${statisBarHight + 1 + "px"};
    margin-left: ${14 + 'px'};
    margin-bottom: 3px;
`;

export const BackButton = styled.TouchableOpacity`
    padding: 0;
    margin: 0;
`;
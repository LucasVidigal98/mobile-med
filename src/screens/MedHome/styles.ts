import styled from "styled-components/native";
import Constants from "expo-constants";
import { Platform } from "react-native";

const statisBarHight = 
    Platform.OS === "android" ? Constants.statusBarHeight : 0;

export const Conatiner = styled.View `
    flex: 1;
    margin-left: ${14 + "px"};
    margin-top: ${statisBarHight + 1 + "px"} ;
    align-items: center;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const HeaderText = styled.Text`
    font-size: 18px;
`;

export const HeaderCfg = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-left: 18px;
    border: 1px solid #48D1CC;
    align-items: center;
    justify-content: center;
`;

export const Options = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 64px;
`;

export const OptionsTetx = styled.Text`
    font-size: 64px;
    font-family: 'Satisfy_400Regular';
`;

export const OptionsButtonsArea = styled.View`
    flex-direction: row;
    margin-top: 120px;
`;

export const OptionButton = styled.TouchableOpacity`
    width: 140px;
    height: 140px;
    border-radius: 8px;
    border: 1px solid lightgrey;
    margin-right: 18px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text``;
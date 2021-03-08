import styled from 'styled-components/native';
import Constants from "expo-constants";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

export const TextInfo = styled.Text`
    font-size: 18px;
    margin-left: 15px; 
`;

export const SaveButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background: #228B22;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const SaveButtonImg = styled.Image`
    width: 16px;
    height: 16px;
`;

export const InfoContainer = styled.View`
    border: 1px solid #48D1CC;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 30px;
    margin-left: 25px;
    margin-right: 10px;
`;

export const HeaderInfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const InfoContainerText = styled.Text`
    color: #48D1CC;
    margin-top: -30px;
`;

export const AddButton = styled.TouchableOpacity`
    width: 150px;
    height: 150px;
    align-items: center;
    justify-content: center;
`;

export const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const AddMidiaButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #48D1CC;
    margin-left: 5px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`;

export const RemoveButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: red;
    margin-left: 5px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
`;
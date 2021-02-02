import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const InfoContainer = styled.View`
    border: 1px solid #48D1CC;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 30px;
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

export const TextInfo = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
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
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: red;
    margin-left: 5px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`;

export const PickerContainer = styled.View`
    margin-top: 5px;
    width: 38%;
    margin-bottom: 0px;
    border: 1px solid lightgrey;
    border-radius: 8px;
    padding: 2px;
    margin-left: 5px;
`;

export const LabelPicker = styled.Text`
    font-size: 13px;
`;
import styled from 'styled-components/native';

export const ViewShape = styled.TouchableOpacity`
    width: 130px;
    height: 190px;
    border: 1px solid #48D1CC;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    margin-left: 14px;
`;

export const TimeBar = styled.View`
    width: 100%;
    height: 30px;
    background: #48D1CC;
    position: absolute;
    top: 0%;
    align-items: center;
    justify-content: center;
`;

export const TimeBarText = styled.Text`
    color: white;
`;

export const ViewShapeContent = styled.View`
    align-items: center;
    justify-content: center;
`;

export const ViewShapeText = styled.Text`
    font-size: 14px;
    margin-bottom: 5px;
`;

export const ViewShapeRoutine = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
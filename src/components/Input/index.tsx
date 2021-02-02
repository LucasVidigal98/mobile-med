import React from 'react';
import { Container, LabelInput, RecordInput } from './styles';

interface InputProps{
    label: string;
    aditionalStyle?: {};
}

const Input:React.FC<InputProps> = ({ label, aditionalStyle }) => {
    return (
        <Container style={aditionalStyle ? {width: '38%'} : {}}>
            <LabelInput>{label}</LabelInput>
            <RecordInput ></RecordInput>
        </Container>
    )
}

export default Input;

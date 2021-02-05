import React from 'react';
import { ShapeInput, LabelInput, RecordInput } from './styles';

interface InputProps{
    label: string;
    aditionalStyle?: {};
}

const Input:React.FC<InputProps> = ({ label, aditionalStyle }) => {
    return (
        <ShapeInput style={aditionalStyle ? {width: '38%'} : {}}>
            <LabelInput>{label}</LabelInput>
            <RecordInput />
        </ShapeInput>
    )
}

export default Input;

import React from 'react';
import { PickerContent, LabelPicker } from './styles';

interface PickerContainerProps {
    adtionalWidth?: string;
    label: string
}

const PickerContainer:React.FC<PickerContainerProps> = ({ adtionalWidth, label, children }) => {
    return (
        <PickerContent style={{width : adtionalWidth ? adtionalWidth : '38%'}}>
            <LabelPicker>{label}</LabelPicker>
            {children}
        </PickerContent>
    )
}

export default PickerContainer;

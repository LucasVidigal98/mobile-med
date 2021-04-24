import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import { TextInfo } from '../MedicalSchedule/styles';

function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadInfo();
    }, []);

    async function loadInfo(){
        const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
        let currentRecordConverted = parseInt(currentRecord as string) - 1;
        
        const partialRecords = [];

        for(let i=0; i<currentRecordConverted+1; i++){
            const info = await AsyncStorage.getItem(
                `@mobile-med/Record/${i}`);
            const parsedInfo = JSON.parse(info as string);
            partialRecords.push(parsedInfo);
        }

        setRecords(partialRecords as []);
        partialRecords.forEach(r => {
            console.log(r.id);
        })
    }

    return (
       <WrapperScreen>
           <Header />
           <TextInfo>Listar Receituários</TextInfo>
       </WrapperScreen>
    )
}

export default RecordList;

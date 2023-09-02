import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import WrapperScreen from '../../components/Wrapper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Container as CT, Text, Card, CardItem, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';

type recordType = {
    id: any,
    pacient: any
}

function RecordList() {
    const [records, setRecords] = useState([] as recordType[]);

    useEffect(() => {
        loadInfo();
    }, []);

    async function loadInfo() {
        await AsyncStorage.setItem("@mobile-med/edit", "false");
        const currentRecord = await AsyncStorage.getItem("@mobile-med/nRecords");
        let currentRecordConverted = parseInt(currentRecord as string) - 1;

        const partialRecords = [];

        for (let i = 0; i < currentRecordConverted + 1; i++) {
            const info = await AsyncStorage.getItem(
                `@mobile-med/Record/${i}`);
            const parsedInfo = JSON.parse(info as string);
            partialRecords.push(parsedInfo);
        }

        setRecords(partialRecords);
    }

    async function onCardPress(record: any) {
        await AsyncStorage.setItem("@mobile-med/editRecord", JSON.stringify(record));
        await AsyncStorage.setItem("@mobile-med/edit", "true");
        navigate("MedicalSchedule", { edit: true });
    }

    const { navigate } = useNavigation();

    return (
        <WrapperScreen>
            <Header />
            <CT>
                <ScrollView>
                    {records.length === 0 && (
                        <Text style={{ fontSize: 22, color: 'black', marginLeft: 25 }}>Não há receituários Salvos!</Text>
                    )}
                    {records.map(record => {
                        return (
                            <TouchableOpacity key={record.id} onPress={() => onCardPress(record as recordType)}>
                                <Card style={{ width: '90%', marginBottom: 15, marginLeft: 25, marginRight: 25 }}>
                                    <CardItem header bordered>
                                        <Text style={{ fontSize: 22, color: '#48D1CC' }}>Receituário</Text>
                                        <Text style={{ color: 'black' }}> {record.id} </Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body>
                                            <Text>
                                                Paciente: {record.pacient.name}
                                            </Text>

                                            <Text>
                                                Idade: {record.pacient.age}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </CT>
        </WrapperScreen>
    )
}

export default RecordList;

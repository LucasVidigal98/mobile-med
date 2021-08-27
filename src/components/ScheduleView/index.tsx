import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TimeBar, TimeBarText, ViewShape, ViewShapeContent, ViewShapeRoutine, ViewShapeText, RoutineImage } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage } from 'react-native';

export interface RoutineInterface {
    hour: string;
    active: boolean;
    medicine: string;
    typeMedication: string;
    amount: number;
    amount_dose: string;
    dose: string;
    dosage: string;
    routine: string;
    observation: string;
    imgRou: string;
    imgMed: string;
}

interface ScheuleViewProps {
    hour: string;
    routineObject: RoutineInterface;
}

const ScheduleView: React.FC<ScheuleViewProps> = ({ hour, routineObject }) => {
    const { navigate } = useNavigation();

    async function handleGoMedical() {
        await AsyncStorage.setItem('@mobile-med/currentHour', hour);
        navigate('Routine');
    }

    return (
        <ViewShape onPress={handleGoMedical}>
            <TimeBar>
                <TimeBarText>{hour}</TimeBarText>
            </TimeBar>

            {(routineObject.active) && (
                <ViewShapeContent>
                    {routineObject.medicine !== "" && (
                        <>
                            <ViewShapeText>{routineObject.medicine}</ViewShapeText>
                            <ViewShapeText>{routineObject.typeMedication}</ViewShapeText>
                            <ViewShapeRoutine>
                                <ViewShapeText>{`${routineObject?.amount}x`}</ViewShapeText>
                                <ViewShapeText>{`${routineObject?.amount_dose} ${routineObject?.dose}`}</ViewShapeText>
                            </ViewShapeRoutine>
                        </>
                    )}

                    {routineObject.routine !== "" && (
                        <>
                            <ViewShapeRoutine>
                                <ViewShapeText>{(routineObject.routine === "Nenhum" ? '' : routineObject.routine)}</ViewShapeText>
                            </ViewShapeRoutine>

                            <ViewShapeText style={{ marginBottom: 0 }}>{routineObject.observation}</ViewShapeText>
                        </>
                    )}

                    {routineObject.imgMed.length > 0 && (
                        <>
                            <ViewShapeText style={{ marginBottom: 0 }}>Imagens Anexadas</ViewShapeText>
                        </>
                    )}
                </ViewShapeContent>
            )}

            {(!routineObject.active || (routineObject.medicine === "" && routineObject.routine === "" && routineObject.imgMed.length === 0)) && (
                <ViewShapeContent>
                    <Ionicons name="ios-add-circle" size={50} color={'#48D1CC'} />
                </ViewShapeContent>
            )}
        </ViewShape>
    )
}

export default ScheduleView;

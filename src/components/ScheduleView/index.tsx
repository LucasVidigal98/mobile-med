import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TimeBar, TimeBarText, ViewShape, ViewShapeContent, ViewShapeRoutine, ViewShapeText } from './styles';
import { Ionicons } from "@expo/vector-icons";

export interface RoutineInterface {
    hour: string;
    active: boolean;
    medicine: string; 
    typeMedication: string; 
    amount: number; 
    dose: string; 
    dosage: string; 
    routine: string; 
    observation: string;
}

interface ScheuleViewProps {
    hour: string;
    routineObject: RoutineInterface;
}

const ScheduleView:React.FC<ScheuleViewProps> = ({ hour, routineObject }) => {
    const { navigate } = useNavigation();
    
    function handleGoMedical(){
        navigate('Routine');
    }

    return (
      <ViewShape onPress={handleGoMedical}>
         <TimeBar>
             <TimeBarText>{hour}</TimeBarText>
         </TimeBar>
        
        {routineObject.active && (
            <ViewShapeContent>
                <ViewShapeText>{routineObject.medicine}</ViewShapeText>
                <ViewShapeText>{routineObject.typeMedication}</ViewShapeText>
                <ViewShapeRoutine>
                    <ViewShapeText>{`${routineObject?.amount}x`}</ViewShapeText>
                    <Ionicons name="ios-beaker" color={'black'} style={{marginBottom: 5}}/>
                </ViewShapeRoutine>

                <ViewShapeRoutine>
                    <ViewShapeText>{routineObject.routine}</ViewShapeText>
                    <Ionicons name="ios-sunny" color={'black'} style={{marginBottom: 5}}/>
                </ViewShapeRoutine>

                <ViewShapeText style={{marginBottom: 0}}>{routineObject.observation}</ViewShapeText>
            </ViewShapeContent>
        )}

        {!routineObject.active && (
            <ViewShapeContent>
                <Ionicons name="ios-add-circle" size={50} color={'#48D1CC'}/>
            </ViewShapeContent>
        )}
      </ViewShape>
    )
}

export default ScheduleView;

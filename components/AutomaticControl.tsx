import {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {IconButton, Text} from 'react-native-paper';
import {
  SensorTypes,
  orientation,
  setUpdateIntervalForType,
} from 'react-native-sensors';

interface props {
  activated: boolean;
  connectedDevice: BluetoothDevice;
}

const PITCH_BASE = -0.5;
const PITCH_DIFFERENCE = 0.3;
const ROLL_BASE = 0;
const ROLL_DIFFERENCE = 0.4;

export default function AutomaticControl({activated, connectedDevice}: props) {
  const sendToDevice = (data: string) => {
    connectedDevice.write(data);
  };

  const [pitch, setPitch] = useState<number>(0);
  const [roll, setRoll] = useState<number>(0);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.orientation, 200);
    const subscription = orientation.subscribe(
      ({qx, qy, qz, qw, pitch, roll, yaw, timestamp}) => {
        setPitch(pitch);
        setRoll(roll);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const getDirection: string = useMemo(() => {
    if (!activated) return 'pause-octagon';

    if (
      pitch > PITCH_BASE + PITCH_DIFFERENCE &&
      roll > ROLL_BASE + ROLL_DIFFERENCE
    ) {
      // Adelante y Derecha
      return 'arrow-top-right';
    } else if (
      pitch > PITCH_BASE + PITCH_DIFFERENCE &&
      roll < ROLL_BASE - ROLL_DIFFERENCE
    ) {
      // Adelante y Izquierda
      return 'arrow-top-left';
    } else if (
      pitch < PITCH_BASE - PITCH_DIFFERENCE &&
      roll > ROLL_BASE + ROLL_DIFFERENCE
    ) {
      // Atrás y Derecha
      return 'arrow-bottom-right';
    } else if (
      pitch < PITCH_BASE - PITCH_DIFFERENCE &&
      roll < ROLL_BASE - ROLL_DIFFERENCE
    ) {
      // Atrás y Izquierda
      return 'arrow-bottom-left';
    } else if (pitch > PITCH_BASE + PITCH_DIFFERENCE) {
      // Adelante
      return 'arrow-up';
    } else if (pitch < PITCH_BASE - PITCH_DIFFERENCE) {
      // Atrás
      return 'arrow-down';
    } else if (roll > ROLL_BASE + ROLL_DIFFERENCE) {
      // Derecha
      return 'arrow-right';
    } else if (roll < ROLL_BASE - ROLL_DIFFERENCE) {
      // Izquierda
      return 'arrow-left';
    } else {
      // Detenido
      return 'pause-octagon';
    }
  }, [activated, pitch, roll]);

  useEffect(() => {
    const value = getDirection;
    if (value == 'pause-octagon') {
      sendToDevice('S');
    } else if (value == 'arrow-up') {
      sendToDevice('F');
    } else if (value == 'arrow-down') {
      sendToDevice('B');
    } else if (value == 'arrow-left') {
      sendToDevice('L');
    } else if (value == 'arrow-right') {
      sendToDevice('R');
    } else if (value == 'arrow-top-left') {
      sendToDevice('G');
    } else if (value == 'arrow-top-right') {
      sendToDevice('I');
    } else if (value == 'arrow-bottom-left') {
      sendToDevice('H');
    } else if (value == 'arrow-bottom-right') {
      sendToDevice('J');
    }
  }, [getDirection]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
      }}>
      <Text style={{color: '#333', marginHorizontal: 50, textAlign: 'center'}}>
        Cambia la orientación de tu móvil para mover el coche
      </Text>
      <IconButton
        size={120}
        iconColor="#00c8ff"
        icon={getDirection}></IconButton>
    </View>
  );
}

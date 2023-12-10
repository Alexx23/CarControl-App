import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {Button, Text} from 'react-native-paper';
import styles from '../util/styles';

export default function BluetoothDisconnected() {
  return (
    <>
      <Text style={styles.titleText}>Tienes el Bluetooth desactivado</Text>
      <Button
        onPress={() => RNBluetoothClassic.openBluetoothSettings()}
        mode={'contained'}
        buttonColor="#0097FF"
        textColor="#fff"
        style={[{marginTop: 30}]}>
        Activar Bluetooth
      </Button>
    </>
  );
}

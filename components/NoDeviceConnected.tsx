import {Button, Text} from 'react-native-paper';
import styles from '../util/styles';

interface props {
  onPress: () => void;
}

export default function NoDeviceConnected({onPress}: props) {
  return (
    <>
      <Text style={styles.titleText}>Por favor, conéctate a tu coche</Text>
      <Button
        onPress={onPress}
        mode={'contained'}
        buttonColor="#0097FF"
        textColor="#fff"
        style={[{marginTop: 30}]}>
        Conectar
      </Button>
    </>
  );
}

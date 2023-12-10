import {View} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {IconButton} from 'react-native-paper';

interface props {
  connectedDevice: BluetoothDevice;
}

export default function ManualControl({connectedDevice}: props) {
  const sendToDevice = (data: string) => {
    connectedDevice.write(data);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
      }}>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          onPress={() => sendToDevice('G')}
          size={70}
          iconColor="#00c8ff"
          icon={'arrow-top-left'}></IconButton>
        <IconButton
          onPress={() => sendToDevice('F')}
          size={70}
          iconColor="#0097FF"
          icon={'arrow-up'}></IconButton>
        <IconButton
          onPress={() => sendToDevice('I')}
          size={70}
          iconColor="#00c8ff"
          icon={'arrow-top-right'}></IconButton>
      </View>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          onPress={() => sendToDevice('L')}
          size={70}
          iconColor="#0097FF"
          icon={'arrow-left'}></IconButton>
        <IconButton
          onPress={() => sendToDevice('S')}
          size={70}
          iconColor="#0062ff"
          icon={'pause-octagon'}></IconButton>
        <IconButton
          onPress={() => sendToDevice('R')}
          size={70}
          iconColor="#0097FF"
          icon={'arrow-right'}></IconButton>
      </View>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          onPress={() => sendToDevice('H')}
          size={70}
          iconColor="#00c8ff"
          icon={'arrow-bottom-left'}></IconButton>
        <IconButton
          onPress={() => sendToDevice('B')}
          size={70}
          iconColor="#0097FF"
          icon={'arrow-down'}></IconButton>
        <IconButton
          onPress={() => sendToDevice('J')}
          size={70}
          iconColor="#00c8ff"
          icon={'arrow-bottom-right'}></IconButton>
      </View>
    </View>
  );
}

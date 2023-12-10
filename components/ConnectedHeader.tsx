import {useState} from 'react';
import {View} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {Button, IconButton, Text} from 'react-native-paper';

interface props {
  connectedDevice: BluetoothDevice;
  onDisconnect: () => void;
  controlMode: 'manual' | 'automatic';
  onSwitchControlMode: () => void;
}

export default function ConnectedHeader({
  connectedDevice,
  onDisconnect,
  controlMode,
  onSwitchControlMode,
}: props) {
  const [isLightsOn, setIsLightsOn] = useState<boolean>(false);

  const toggleLights = () => {
    if (isLightsOn) {
      connectedDevice.write('2');
      setIsLightsOn(false);
    } else {
      connectedDevice.write('1');
      setIsLightsOn(true);
    }
  };

  return (
    <>
      <View
        style={{
          height: 50,
          backgroundColor: '#0097FF',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text style={{fontSize: 18, color: 'white'}}>
          {connectedDevice.name}
        </Text>
        <IconButton
          icon={'close'}
          iconColor="white"
          size={30}
          style={{position: 'absolute', right: 10}}
          onPress={onDisconnect}></IconButton>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Button
          onPress={onSwitchControlMode}
          mode="contained"
          textColor="black"
          buttonColor="#FFC900">
          Cambiar a modo {controlMode == 'manual' ? 'orientación' : 'manual'}
        </Button>
        <IconButton
          style={{marginTop: 30}}
          onPress={toggleLights}
          size={70}
          iconColor="#0097FF"
          icon={isLightsOn ? 'lightbulb-outline' : 'lightbulb-on'}></IconButton>
      </View>
    </>
  );
}

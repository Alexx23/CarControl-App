import {useEffect, useState} from 'react';
import {NativeModules, PermissionsAndroid, Platform} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothNativeDevice,
} from 'react-native-bluetooth-classic';
import BluetoothModule from 'react-native-bluetooth-classic/lib/BluetoothModule';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

type VoidCallback = (result: boolean) => void;

interface props {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanDevices(): void;
  connectToDevice: (deviceId: BluetoothDevice) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: BluetoothDevice | null;
  allDevices: BluetoothDevice[];
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
  isLoading: boolean;
  isBluetoothEnabled: boolean;
  isConnecting: boolean;
}

function useBluetooth(): props {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState<boolean>(false);
  const [allDevices, setAllDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const requestPermissions = async (cb: VoidCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const addFakeDevice = () => {
    const bluetoothNativeDevice: BluetoothNativeDevice = {
      name: 'Dispositivo para probar',
      address: '00:00:00:00:00:00',
      id: 'fake-device-id',
      rssi: 0,
      extra: new Map(),
    };
    const bluetoothModule = new BluetoothModule(
      NativeModules.RNBluetoothClassic,
    );
    const fakeDevice = new BluetoothDevice(
      bluetoothNativeDevice,
      bluetoothModule,
    );
    setAllDevices((prevState: BluetoothDevice[]) => {
      if (!isDuplicteDevice(prevState, fakeDevice)) {
        return [...prevState, fakeDevice];
      }
      return prevState;
    });
  };

  const isDuplicteDevice = (
    devices: BluetoothDevice[],
    nextDevice: BluetoothDevice,
  ) => devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanDevices = () => {
    if (isScanning) return;
    setIsScanning(true);
    RNBluetoothClassic.startDiscovery()
      .then((devices: BluetoothDevice[]) => {
        devices.forEach((device: BluetoothDevice) => {
          if (device.name != null && device.name.includes('HC-06')) {
            setAllDevices((prevState: BluetoothDevice[]) => {
              if (!isDuplicteDevice(prevState, device)) {
                return [...prevState, device];
              }
              return prevState;
            });
          }
        });
        addFakeDevice();
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsScanning(false);
      });
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    if (device.id == 'fake-device-id') {
      fakeConnectToDevice(device);
    } else {
      realConnectToDevice(device);
    }
  };

  const realConnectToDevice = async (device: BluetoothDevice) => {
    setIsConnecting(true);
    device
      .connect()
      .then(res => {
        setConnectedDevice(device);
        RNBluetoothClassic.cancelDiscovery();
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsConnecting(false);
      });
  };

  const fakeConnectToDevice = async (device: BluetoothDevice) => {
    setIsConnecting(true);
    setTimeout(() => {
      setConnectedDevice(device);
      RNBluetoothClassic.cancelDiscovery();
      setIsConnecting(false);
    }, 3000);
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      connectedDevice.disconnect();
      setConnectedDevice(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      RNBluetoothClassic.isBluetoothEnabled().then(res => {
        setIsLoading(false);
        setIsBluetoothEnabled(res);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    scanDevices,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    isScanning,
    setIsScanning,
    isLoading,
    isBluetoothEnabled,
    isConnecting,
  };
}

export default useBluetooth;

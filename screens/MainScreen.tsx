import React, {useMemo, useState} from 'react';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';
import AutomaticControl from '../components/AutomaticControl';
import BluetoothDisconnected from '../components/BluetoothDisconnected';
import ConnectedHeader from '../components/ConnectedHeader';
import ManualControl from '../components/ManualControl';
import NoDeviceConnected from '../components/NoDeviceConnected';
import ConnectionModal from '../components/modals/ConnectionModal';
import Connecting from '../components/ui/Connecting';
import Loading from '../components/ui/Loading';
import useBluetooth from '../hooks/useBluetooth';
import styles from '../util/styles';

const MainScreen = () => {
  const [showConnectionModal, setShowConnectionModal] =
    useState<boolean>(false);
  const [controlMode, setControlMode] = useState<'manual' | 'automatic'>(
    'manual',
  );

  const {
    requestPermissions,
    scanDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    allDevices,
    isScanning,
    isLoading,
    isBluetoothEnabled,
    isConnecting,
  } = useBluetooth();

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanDevices();
      }
    });
  };

  const openModal = async () => {
    scanForDevices();
    setShowConnectionModal(true);
  };

  const getStatusBarColor = useMemo(() => {
    if (connectedDevice) {
      return '#0097FF';
    }
    return '#f0f0f0';
  }, [connectedDevice]);

  const getStatusBarStyle = useMemo(() => {
    if (connectedDevice) {
      return 'light-content';
    }
    return 'dark-content';
  }, [connectedDevice]);

  const switchControlMode = () => {
    if (controlMode == 'manual') {
      setControlMode('automatic');
    } else {
      setControlMode('manual');
    }
    connectedDevice?.write('S');
  };

  return (
    <>
      <StatusBar
        barStyle={getStatusBarStyle}
        backgroundColor={getStatusBarColor}
      />
      <SafeAreaView style={styles.container}>
        {!isLoading && isBluetoothEnabled && connectedDevice && (
          <ConnectedHeader
            connectedDevice={connectedDevice}
            onDisconnect={disconnectFromDevice}
            controlMode={controlMode}
            onSwitchControlMode={switchControlMode}
          />
        )}
        <View style={styles.titleWrapper}>
          {isLoading && (
            <>
              <Text style={styles.titleText}>¡Hola!</Text>
              <Loading />
            </>
          )}
          {!isLoading && (
            <>
              {!isBluetoothEnabled && (
                <>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.image}></Image>
                  <BluetoothDisconnected />
                </>
              )}
              {isBluetoothEnabled && (
                <>
                  {!connectedDevice && (
                    <>
                      <Image
                        source={require('../assets/logo.png')}
                        style={styles.image}></Image>
                      {isConnecting && <Connecting />}
                      {!isConnecting && (
                        <NoDeviceConnected onPress={openModal} />
                      )}
                    </>
                  )}
                  {connectedDevice && (
                    <>
                      {controlMode == 'manual' && (
                        <ManualControl connectedDevice={connectedDevice} />
                      )}
                      {controlMode == 'automatic' && (
                        <AutomaticControl
                          activated={controlMode == 'automatic'}
                          connectedDevice={connectedDevice}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </View>
        <ConnectionModal
          onClose={() => setShowConnectionModal(false)}
          visible={showConnectionModal}
          onConnect={connectToDevice}
          devices={allDevices}
          isScanning={isScanning}
        />
      </SafeAreaView>
    </>
  );
};

export default MainScreen;

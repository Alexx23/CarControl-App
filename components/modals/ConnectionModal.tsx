import {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {IconButton, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../util/styles';
import Loading from '../ui/Loading';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConnect: (device: BluetoothDevice) => void;
  devices: BluetoothDevice[];
  isScanning: boolean;
}

export default function ConnectionModal({
  visible,
  onClose,
  onConnect,
  devices,
  isScanning,
}: Props) {
  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<BluetoothDevice>) => {
      return (
        <TouchableOpacity
          onPress={() => {
            onConnect(item.item);
            onClose();
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>{item.item.name}</Text>
        </TouchableOpacity>
      );
    },
    [onClose, onConnect],
  );

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}
      animationType="fade"
      presentationStyle="fullScreen">
      <SafeAreaView style={styles.modalTitle}>
        <IconButton
          icon={'close'}
          iconColor="black"
          size={30}
          onPress={onClose}></IconButton>
        {isScanning && (
          <>
            <Text style={styles.modalTitleText}>
              Cargando lista de dispositivos
            </Text>
            <Loading />
          </>
        )}
        {!isScanning && (
          <>
            {devices.length <= 0 && (
              <>
                <Text style={styles.modalTitleText}>
                  No se han encontrado dispositivos
                </Text>
              </>
            )}
            {devices.length >= 1 && (
              <>
                <Text style={styles.modalTitleText}>
                  Elige tu coche para conectar
                </Text>

                <FlatList
                  contentContainerStyle={styles.modalFlatlistContiner}
                  data={devices}
                  renderItem={renderDeviceModalListItem}
                />
              </>
            )}
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
}

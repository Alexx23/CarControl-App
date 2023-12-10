import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../../util/styles';
import Loading from './Loading';

export default function Connecting() {
  return (
    <View>
      <Text style={styles.modalTitleText}>Estableciendo conexión...</Text>
      <Loading />
    </View>
  );
}

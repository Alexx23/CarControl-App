import {ActivityIndicator} from 'react-native-paper';

export default function Loading() {
  return (
    <ActivityIndicator
      animating={true}
      color="#0097FF"
      size={50}
      style={{marginTop: 40}}
    />
  );
}

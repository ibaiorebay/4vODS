// /app/index.tsx

import { Text, View } from 'react-native';
import InitiativeListScreen from './Views/InitiativeListScreen';

export const options = {
  title: 'Home Screen',
};

export default function HomeScreen() {
  return (
    <View>
      <InitiativeListScreen />
    </View>
  );
}

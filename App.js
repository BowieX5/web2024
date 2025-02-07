import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files

//import NewFaceView from './components/NewFaceView';
import FaceView from './components/FaceView';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import * as Font from 'expo-font';


export default function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [fontsLoaded] = Font.useFonts({
    chakapetch: require('./assets/ChakraPetch-Regular.ttf'),
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Work 5: ตั้งชื่อ App</Text>
      <Card>
        <FaceView/>
      </Card>
      <Text style={styles.paragraph}>640000001-1 นายวชิราวุธ ธรรมวิเศษ</Text>
    </View>
  );
}

async function loadFonts(setState) {
  await Font.loadAsync({
    krarok: require('./assets/SOV_HangKrarok.ttf'),
    chakapetch: require('./assets/ChakraPetch-Regular.ttf'),
  });
  setState(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'chakapetch',
  },
});

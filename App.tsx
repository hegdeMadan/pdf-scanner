import React from 'react';
import { View, ToastAndroid, PermissionsAndroid } from 'react-native';
import { RootNavigator } from './src/navigator';
import { requestCameraPermission, requestStorageWritePermission } from './src/scripts/permissions';

class App extends React.Component {
  componentDidMount() {
    const isCameraAccessible = requestCameraPermission();
    const isStorageAccessible = requestStorageWritePermission();
  }

  render() {
    return <RootNavigator />;
  }
}

export default App;

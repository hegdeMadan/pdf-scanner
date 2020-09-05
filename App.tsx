import React from 'react';
import { Provider } from 'react-redux';
import {
  requestCameraPermission,
  requestStorageWritePermission,
} from './src/scripts/permissions';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { store, persistor } from './src/store/reducers';
import { ConnectedRootComponent } from './src/navigator';

type PropTypes = any;
type StateType = any;

class App extends React.Component<PropTypes, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      isPermissionAsked: false,
    };
  }

  componentDidMount() {
    if (!this.state.isPermissionAsked) {
      requestCameraPermission()
        .then(() => {
          requestStorageWritePermission();
        })
        .catch((err) => console.error('failed to get camera permission', err));
      this.setState({ isPermissionAsked: true });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <ConnectedRootComponent />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

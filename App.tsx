import React from 'react';
import { Provider, connect } from 'react-redux';
import {
  requestCameraPermission,
  requestStorageWritePermission,
} from './src/scripts/permissions';
import { PersistGate } from 'redux-persist/integration/react';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';
import { RootNavigator } from './src/navigator';
import { store, persistor } from './src/store/reducers';

type PropTypes = any;
type StateType = any;

class App extends React.Component<PropTypes, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      isPermissionAsked: false,
      initializingAuthState: true,
      userLoggedIn: false,
    };
  }

  onAuthStateChanged = (user: boolean) => {
    this.setState({
      initializingAuthState: false,
      userLoggedIn: user
    })
  }

  componentDidMount() {
    auth().onAuthStateChanged(this.onAuthStateChanged);
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
        {/* <PersistGate loading={<ActivityIndicator />} persistor={persistor}> */}
          <RootNavigator />
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('********88 state: ', state);
  return {
    state
  };
}

export default connect(mapStateToProps, null)(App);
// export default App;
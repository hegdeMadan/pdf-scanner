import React from 'react';
import { RootNavigator } from './src/navigator';
import { Provider } from 'react-redux';
import {
  requestCameraPermission,
  requestStorageWritePermission,
} from './src/scripts/permissions';
import { createStore } from 'redux';
import { rootReducer } from './src/store/reducers';

class App extends React.Component {
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
    const store = createStore(rootReducer);

    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

export default App;

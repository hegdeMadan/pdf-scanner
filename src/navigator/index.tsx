import * as React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { screens } from './constants';
import Scanner from '../dashboard/scanner';
import { Home } from '../dashboard/home';
import { colors } from '../theme';
import DrawerComponent from '../dashboard/DrawerComponent';
import { authAction } from '../store/constants';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <Drawer.Navigator
    edgeWidth={Dimensions.get('window').width}
    drawerContent={(props) => {
      return <DrawerComponent {...props} />;
    }}>
    <Drawer.Screen name={screens.home} component={Home} />
    <Drawer.Screen name={screens.scanner} component={Scanner} />

    <Drawer.Screen name={screens.exportToPdf} component={Scanner} />
  </Drawer.Navigator>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.avatar} barStyle="light-content" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={screens.dashboard} component={DrawerStack} />
        <Stack.Screen name={screens.scanner} component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const ConnectedRootComponent =  connect(
  state => ({ state }),
  dispatch => ({
    setSignedIn: (isSignedIn:  boolean) => dispatch({ type: authAction.USER_SIGNED_IN, isSignedIn }),
    setSignedOut: () => dispatch({ type: authAction.USER_SIGNED_OUT, isSignedOut: false })
  })
)((props) => {
  const [initializing, setInitializing] = React.useState(true);
  console.log('******, props', props)

  const onAuthStateChanged = (user: any)=> {
    if (!user) props.setSignedOut();
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return <RootNavigator />
});

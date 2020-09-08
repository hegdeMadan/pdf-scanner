import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { sizes, colors, spaces, borders } from '../theme'
import { moderateScale } from 'react-native-size-matters'
import { Label, Heading } from '../components'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { screens } from '../navigator/constants'

const Navigators = ({ currentRouteName, navigation }) => (
  <View style={styles.drawerNavigators}>
    <TouchableOpacity
      onPress={() => {
        currentRouteName !== screens.home ? navigation.navigate(screens.home) : navigation.closeDrawer()
      }}
      style={{
        ...styles.navigatorContainer,
        backgroundColor: currentRouteName === screens.home ? colors.hover.primary : ''
      }}
    >
      <CommunityIcon
        name='home'
        size={moderateScale(sizes.tabIcon)}
        color={colors.tabIcon}
      />
      <View style={styles.nameBreaker}>
        <Label
          text={screens.home}
        />
      </View>
    </TouchableOpacity>

    <View style={{
      ...styles.navigatorContainer,
    }}>
      <CommunityIcon
        name='file-pdf-box'
        size={moderateScale(sizes.tabIcon)}
        color={colors.tabIcon}
      />
      <TouchableOpacity style={styles.nameBreaker}>
        <Label
          text={screens.exportToPdf}
        />
      </TouchableOpacity>
    </View>

    <View style={{
      ...styles.navigatorContainer,
    }}>
      <CommunityIcon
        name='cloud-sync'
        size={moderateScale(sizes.tabIcon)}
        color={colors.tabIcon}
      />
      <View style={styles.nameBreaker}>
        <Label
          text='Sync from cloud'
        />
      </View>
    </View>
  </View>
);

const DrawerComponent = (props) => {
  console.log('$$$$$$$$$4 drawer props $$$$$$', props);
  const { state, navigation } = props;
  const currentRouteName = state.routeNames[state.index];
  return (
    <View style={styles.container}>
      <View style={styles.userNameWrapper}>
        <View
          style={styles.avatar}
        >
          <Heading text='M' weight='normal' style={{ color: colors.white, fontSize: 40 }} />
        </View>
        <View style={styles.userName}>
          <Heading text='Madan Hegde' variant='heading3'  weight='normal' style={{ color: 'white' }} />
        </View>
      </View>

      <View>
        <Navigators currentRouteName={currentRouteName} navigation={navigation} />
      </View>

      <View style={styles.bottomLabel}>
        <Label variant='small'>
          Made with {<CommunityIcon name='heart' color={colors.red} size={14} />} in India
        </Label>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    width: sizes.width.avatar,
    height: sizes.height.avatar,
    backgroundColor: colors.avatar,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:  'center'
  },
  userName: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: moderateScale(spaces.padding.label),
  },
  userNameWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: moderateScale(28),
    backgroundColor: colors.primry,
  },
  drawerNavigators: {
    paddingTop: moderateScale(12),
    borderTopWidth: borders.borderWidth.bottomBar,
    borderTopColor: colors.grey.medium,
    paddingHorizontal: moderateScale(12)
  },
  navigatorContainer: {
    flexDirection: 'row',
    paddingLeft: spaces.margin.label,
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    marginVertical: moderateScale(4),
  },
  nameBreaker: {
    paddingLeft: moderateScale(20),
  },
  bottomLabel: {
    position: 'absolute',
    bottom: moderateScale(10),
    marginLeft: spaces.margin.label,
  }
})

export default DrawerComponent;

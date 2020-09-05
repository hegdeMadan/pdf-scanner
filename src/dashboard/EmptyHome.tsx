import React from 'react';
import { View, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Label } from '../components';
import { noFile } from '../assets';

const EmptyHome = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Image
      source={noFile}
      style={{ width: 192, height: 192, alignSelf: 'center' }}
    />
    <View
      style={{
        maxWidth: moderateScale(256),
        alignSelf: 'center',
        paddingTop: moderateScale(5),
      }}>
      <Label
        text="Looks like you do not have any scans"
        style={{ textAlign: 'center' }}
        weight="bold"
      />
      <View height={moderateScale(4)} />
      <Label
        text="Scan a document from your camera or import one from gallery"
        style={{ textAlign: 'center' }}
        variant="medium"
      />
    </View>
  </View>
);

export default EmptyHome;

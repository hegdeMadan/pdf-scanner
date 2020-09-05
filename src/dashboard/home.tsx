import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob';
import { sizes, colors } from '../theme';
import { Header, Label } from '../components';
import { screens } from '../navigator/constants';
import { requestCameraPermission } from '../scripts/permissions';
import PdfListView from './PdfListView';
import EmptyHome from  './EmptyHome';

export const Home = ({ navigation }) => {
  const [pdfList,  setPdfList] =  useState([]);
  const applicationDirPath = `${RNFetchBlob.fs.dirs.SDCardDir}/Android/data/com.uscanner/files`;

  useEffect(() => {
    console.log('-------------- home')
    RNFetchBlob.fs.ls(applicationDirPath)
    .then(files => {
      setPdfList(files)
      console.log('pdf list #######################',  files);
    })
    .catch(err => console.log('error occured', err))
  }, [])

  const checkPermissionAndNavigate = () => {
    requestCameraPermission()
      .then(() => {
        navigation.navigate(screens.scanner);
      })
      .catch((err) => console.log('err', err));
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <Header
          leftIconName="menu"
          textAlign="flex-start"
          headerColor={colors.grey.superDark}
          iconColor={colors.white}
          iconSize={sizes.miscIcons}
          onClick={() => navigation.openDrawer()}
          styleProps={{
            backgroundColor: colors.primry,
          }}
        />
      </View>
      {pdfList
      ? <PdfListView pdfList={pdfList} sourcePath={applicationDirPath} />
      : <EmptyHome />  }
      <View style={styles.scanButton}>
        <TouchableOpacity onPress={() => checkPermissionAndNavigate()}>
          <View style={styles.scanIcon}>
            <AntIcons
              name="scan1"
              size={moderateScale(sizes.scanIcon)}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scanButton: {
    position: 'absolute',
    bottom: moderateScale(32),
    right: moderateScale(48),
    backgroundColor: colors.primry,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 50,
    justifyContent: 'center',
  },
  scanIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

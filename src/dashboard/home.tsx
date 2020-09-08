import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
    RNFetchBlob.fs.ls(applicationDirPath)
    .then(files => {
      setPdfList(files)
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
      {pdfList.length > 0
      ? (
        <View style={{ flex: 1 }}>
          <PdfListView pdfList={pdfList} sourcePath={applicationDirPath} />
        </View>
      )
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

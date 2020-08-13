import { PermissionsAndroid } from 'react-native';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: '',
        message: 'Access to camera is required to capture images',
        buttonPositive: 'OK',
        buttonNeutral: '',
        buttonNegative: '',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestStorageWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: '',
        message:
          'Access to filesystem is required to save document in the device',
        buttonPositive: 'OK',
        buttonNeutral: '',
        buttonNegative: '',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can write to filesystem');
      return true;
    } else {
      console.log('write to filesystem permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestStorageReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: '',
        message: 'need access to save document in the device',
        buttonNeutral: '',
        buttonNegative: '',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read the filesystem');
      return true;
    } else {
      console.log('read filesystem permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

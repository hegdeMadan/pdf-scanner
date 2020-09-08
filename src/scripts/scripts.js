import { colors } from '../theme';
import RNImageToPdf from 'react-native-image-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { requestStorageWritePermission } from './permissions';

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getDefinedRandomColor = () => {
  const colorPointer = Math.floor(Math.random() * 11);
  return colors.colorCodes[colorPointer];
};

export const getColor = (name) => {
  let colorPointer = name.length;
  if (name.length > colors.colorCodes.length - 1) {
    colorPointer = colors.colorCodes.length - 1;
  }
  return colors.colorCodes[colorPointer];
};

export const exportImageToPdf = async (
  filePathArr,
  successCallback,
  failureCallback,
) => {
  try {
    const pdfFileName = new Date().toLocaleDateString().split('/').join(' ');
    const options = {
      imagePaths: [...filePathArr],
      name: `${pdfFileName}.pdf`,
      quality: 1,
      // maxSize: {
      //   width: this.deviceWidth + 100,
      //   height: (this.deviceHeight * this.deviceWidth) * (this.deviceWidth + 100)
      // }
    };
    const pdf = await RNImageToPdf.createPDFbyImages(options);
    console.log('exported image', pdf.filePath);

    successCallback(pdf.filePath);
  } catch (e) {
    failureCallback();
    console.log(e);
  }
};

export const copyImage = (imageData, successCallback, failureCallback) => {
  const pathArr = imageData.path.split('/');
  const fileName = pathArr[pathArr.length - 1];
  const destinationPath = `${RNFetchBlob.fs.dirs.PictureDir}/${fileName}`;
  const isStorageAccessible = requestStorageWritePermission();
  if (isStorageAccessible) {
    RNFetchBlob.fs
      .cp(imageData.path, destinationPath)
      .then(() => {
        console.log('copy success');
        successCallback(destinationPath);
      })
      .catch((err) => {
        console.log('error copying', err);
      });
  } else {
    failureCallback();
    console.log('no accesss to  storage');
  }
};

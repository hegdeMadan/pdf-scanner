import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pdf from 'react-native-pdf';
import { colors } from '../theme';

const PdfListView = ({ 
  pdfList,
  sourcePath
}: {
  pdfList: Array<string>,
  sourcePath: string
}) => {
  const resources = {
    file: pdfList[0],
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
  };
  const resourceType = 'url';
  const filePath = `file:///${sourcePath}/${pdfList[0]}`;
  return (
    <View style={{ flex: 1 }}>
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      <View style={{
        // flex: 1,
        // flexDirection: 'row',
        marginTop: 20,
        height: 250
      }}>

        <Pdf
          source={{ uri: filePath }}
          onLoadComplete={(numberOfPages,filePath)=>{
              console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page,numberOfPages)=>{
              console.log(`current page: ${page}`);
          }}
          onError={(error)=>{
              console.log(error);
          }}
          onPressLink={(uri)=>{
              console.log(`Link presse: ${uri}`)
          }}
          style={{ maxWidth: 300, height: 250, backgroundColor: '#fff', }}
        />
        <View style={{ flex: 1 }}>
          <CommunityIcon name='share-variant' size={20} color={colors.tabIcon} />
        </View>
      </View>
    </View>
  )
}

export default PdfListView;

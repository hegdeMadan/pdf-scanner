import React, { useState } from 'react';
import { FlatList, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import { colors, sizes, spaces } from '../theme';
import { Paragraph, Heading, Label } from '../components';
import { color } from 'react-native-reanimated';

const PdfListView = ({ 
  pdfList,
  sourcePath
}: {
  pdfList: Array<string>,
  sourcePath: string
}) => {

  const renderItem = ({ item  }: { item: string }) => {
    console.log(' stringgggggggg item +++++++++++++++',  item)
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.iconNameAligner}>
          <View style={styles.docIcon}>
            <IonIcons name='document-text-outline' size={36} color={colors.primry} />
          </View>
          <Heading variant='heading3' weight='normal' text={item.split('.')[0]} />
        </View>
        <IonIcons name='ellipsis-vertical' size={20} color={colors.tabIcon} />
        {/* <View style={{ flex: 1 }}>
          <IonIcons name='share-variant' size={20} color={colors.tabIcon} />
        </View> */}
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.label}>
        <Label text='Device' color={colors.grey.dark} />
      </View>
      <FlatList
        data={pdfList}
        renderItem={renderItem}
        keyExtractor={item  => item}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: spaces.padding.label
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    paddingVertical: spaces.padding.label
  },
  iconNameAligner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docIcon:  {
    marginRight: spaces.margin.label,
  }
})

export default PdfListView;

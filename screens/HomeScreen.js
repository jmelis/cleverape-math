import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import mathLevels from '../lib/math-levels';

const ShowOps = ({ops}) => {
  return ops.map(op => {
    if (op === '+') {
      return <AntDesign key='+' name="plussquare" size={32} color="#e03528"/>;
    } else if (op === '-') {
      return <AntDesign key='-' name="minussquare" size={32} color="#05e38e"/>;
    }
  });
}

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={[styles.title]}>
      {item.title}&nbsp;
      <ShowOps ops={['+', '-']}/>
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('GameScreen', {level: item.id})}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mathLevels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',

    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'black',
  },
});

export default HomeScreen;
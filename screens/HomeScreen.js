import React, {useState, useEffect} from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';

import mathLevels from '../lib/math-levels';

const ShowOps = ({ ops }) => {
  return ops.map(op => {
    if (op === '+') {
      return <AntDesign key='+' name="plussquare" size={32} color="#18427c" />;
    } else if (op === '-') {
      return <AntDesign key='-' name="minussquare" size={32} color="#a5daff" />;
    }
  });
}

const Item = ({ item, onPress, style, maxScore }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={{ flex: 1, flexDirection: 'row' }}></View>
    <Text style={[styles.title]}>
      {item.title}&nbsp;
      <ShowOps ops={item.ops} />
      --
      <AntDesign name="star" size={32} color={maxScore === 0 ? "#a0a0a0" : "#f5e920"} />{maxScore}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [maxScores, setMaxScores] = useState({});

  useEffect(() => {
    const getScores = async () => {
      try {
        const maxScoresRaw = await AsyncStorage.getItem('@max_scores');
        const maxScores = maxScoresRaw != null ? JSON.parse(maxScoresRaw) : {};
        setMaxScores(maxScores);
      } catch (e) {
        console.log(e);
      }
    };

    navigation.addListener('focus', () => {
      getScores();
    });

    getScores();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        maxScore={maxScores[item.id] || 0}
        onPress={() => navigation.navigate('GameScreen', { level: item.id })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mathLevels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={maxScores}
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
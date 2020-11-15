import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

const NewRecord = () => (
  <Text style={styles.newrecord}>
    NEW RECORD!
    &nbsp;
    <FontAwesome5 name="trophy" style={styles.newrecordCup} />
  </Text>
);

function GameResults({ navigation, route }) {
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const level = route.params.level;
    const currentScore = route.params.score;

    const updateMaxScores = async () => {
      try {
        const maxScoresRaw = await AsyncStorage.getItem('@max_scores');
        const maxScores = maxScoresRaw != null ? JSON.parse(maxScoresRaw) : {};
        const storedMaxScore = maxScores[level];

        if (!storedMaxScore || storedMaxScore < currentScore) {
          maxScores[level] = currentScore;
          await AsyncStorage.setItem('@max_scores', JSON.stringify(maxScores));
        }

        setMaxScore(maxScores[level]);
      } catch(e) {
        console.log(e);
        return {};
      }
    }

    updateMaxScores();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontSize: 90 }}>{route.params.score}</Text>
        <Image style={{ width: 100, height: 100 }} source={require('../img/star.png')} />
      </View>
      {route.params.score != 0 && route.params.score === maxScore && <NewRecord/>}
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.push('GameScreen', { level: route.params.level })}>
        <Text style={styles.button}>Play again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.popToTop()} >
        <Text style={styles.button}>New level</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  newrecord: {
    flex: 1,
    textAlign: 'center',
    fontSize: 40
  },
  newrecordCup: {
    fontSize: 40,
    color: "#f5e920"
  },
  touchable: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
},
  button: {
    padding: 10,
    textAlign: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#18427c',
    color: "white",
    fontSize: 50,
  },
});

export default GameResults;
import React from 'react';
import { View, Text, Button } from 'react-native';

function GameResults({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DONE!</Text>
      <Text>Level: {route.params.level}</Text>
      <Text>Score: {route.params.score}</Text>
      <Button
        title="Play again!"
        onPress={() => navigation.push('GameScreen', { level: route.params.level })}
      />
      <Button
        title="Select new level"
        onPress={() => navigation.popToTop()}
      />

    </View>
  );
}

export default GameResults;
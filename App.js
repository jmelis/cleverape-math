import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Component } from 'react';
import * as Progress from 'react-native-progress';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(_array) {
  const array = _array.slice();
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Play!"
        onPress={() => navigation.push('GameScreen', { level: "mylevel" })}
      />
    </View>
  );
}

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      question: "",
      score: 0,
      button1: {status: true, isCorrect: false, val: 0},
      button2: {status: true, isCorrect: false, val: 0},
      button3: {status: true, isCorrect: false, val: 0},
      button4: {status: true, isCorrect: false, val: 0},
    }
    this.handleClickButton = this.handleClickButton.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
  }

  componentDidMount() {
    const startTime = new Date();
    const interval = setInterval(() => {
      const percent = 100 - 100 * (new Date() - startTime) / 5000;
      if (percent < 0) {
        clearInterval(interval);
        this.props.navigation.replace('GameResults', {score: this.state.score, level: "pepe"});
      } else {
        this.setState({ percent });
      }
    }, 1000);
    this.newQuestion();
  }

  componentWillUnmount() {
    console.log("UNMOUNT!");
  }

  handleClickButton(button) {
    if (button.isCorrect) {
      this.setState({score: this.state.score + 1});
      this.newQuestion();
    } else {
      button.status = false;
      this.setState({button, score: this.state.score - 1});
    }
  }

  newQuestion() {
    const a = getRandomInt(1, 10);
    const b = getRandomInt(1, 10);
    const result = a + b;

    const choices = [result, result - 1, result + 1, result + 2];
    const buttonsData = shuffleArray([
      {status: true, isCorrect: true, val: choices[0]},
      {status: true, isCorrect: false, val: choices[1]},
      {status: true, isCorrect: false, val: choices[2]},
      {status: true, isCorrect: false, val: choices[3]},
    ]);

    this.setState({
      question: `${a}+${b}`,
      button1: buttonsData[0],
      button2: buttonsData[1],
      button3: buttonsData[2],
      button4: buttonsData[3],
    });
  }

  render() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/* <Text>Level: {route.params.level}</Text> */}
    <Text>Score: {this.state.score}</Text>
    <Text>{this.state.question}</Text>
    <Progress.Bar progress={this.state.percent} width={200} />
    <Button disabled={!this.state.button1.status} onPress={() => this.handleClickButton(this.state.button1)} title={this.state.button1.val} />
    <Button disabled={!this.state.button2.status} onPress={() => this.handleClickButton(this.state.button2)} title={this.state.button2.val} />
    <Button disabled={!this.state.button3.status} onPress={() => this.handleClickButton(this.state.button3)} title={this.state.button3.val} />
    <Button disabled={!this.state.button4.status} onPress={() => this.handleClickButton(this.state.button4)} title={this.state.button4.val} />
  </View>
  }
}

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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="GameResults" component={GameResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
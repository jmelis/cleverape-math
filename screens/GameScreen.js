import React from 'react';
import { View, Text, Button } from 'react-native';
import { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar';

import mathQuestion from '../lib/math-question';

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

class GameScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      interval: 0,
      percent: 1,
      question: "",
      score: 0,
      button1: { status: true, isCorrect: false, val: 0 },
      button2: { status: true, isCorrect: false, val: 0 },
      button3: { status: true, isCorrect: false, val: 0 },
      button4: { status: true, isCorrect: false, val: 0 },
    }
    this.handleClickButton = this.handleClickButton.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
  }

  componentDidMount() {
    const startTime = new Date();
    const interval = setInterval(() => {
      const percent = 1 - (new Date() - startTime) / 5000;
      this.setState({ percent });

      if (percent < 0) {
        clearInterval(interval);
        this.props.navigation.replace('GameResults', { score: this.state.score, level: this.props.route.params.level });
      }
    }, 1000);
    this.setState({ interval });
    this.newQuestion();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleClickButton(button) {
    if (button.isCorrect) {
      this.setState({ score: this.state.score + 1 });
      this.newQuestion();
    } else {
      button.status = false;
      const newScore = this.state.score > 0 ? this.state.score - 1 : 0;
      this.setState({ button, score: newScore });
    }
  }

  newQuestion() {
    const mq = mathQuestion();
    const choices = [mq.result].concat(mq.otherChoices);

    const buttonsData = shuffleArray(choices.map(c => ({ status: true, isCorrect: mq.result === c, val: c })));
    this.setState({
      question: mq.question,
      button1: buttonsData[0],
      button2: buttonsData[1],
      button3: buttonsData[2],
      button4: buttonsData[3],
    });
  }

  render() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Level: {this.props.route.params.level}</Text>
      <Text>Score: {this.state.score}</Text>
      <Text>{this.state.question}</Text>
      <ProgressBar progress={this.state.percent} width={200} borderRadius={0} height={20} animationType={"timing"} />
      <Button disabled={!this.state.button1.status} onPress={() => this.handleClickButton(this.state.button1)} title={this.state.button1.val.toString()} />
      <Button disabled={!this.state.button2.status} onPress={() => this.handleClickButton(this.state.button2)} title={this.state.button2.val.toString()} />
      <Button disabled={!this.state.button3.status} onPress={() => this.handleClickButton(this.state.button3)} title={this.state.button3.val.toString()} />
      <Button disabled={!this.state.button4.status} onPress={() => this.handleClickButton(this.state.button4)} title={this.state.button4.val.toString()} />
    </View>;
  }
}

export default GameScreen;
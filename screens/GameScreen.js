import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar';

import { generateMathQuestion } from '../lib/levels';

const GAME_LENGTH = 120; // in seconds

function AnsButton({ title, disabled, handler}) {
  return <TouchableOpacity style={styles.touchable} disabled={disabled} onPress={() => handler()}>
    <Text style={disabled ? styles.buttondisabled : styles.button}>{title}</Text>
  </TouchableOpacity>
}

class GameScreen extends Component {
  constructor(props) {
    super(props);
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
      const percent = 1 - (new Date() - startTime) / (GAME_LENGTH * 1000);
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
    const level = this.props.route.params.level;
    const q = generateMathQuestion(level);

    const buttonsData = q.choices.map(c => ({ status: true, isCorrect: q.result === c, val: c }));
    this.setState({
      question: q.question,
      button1: buttonsData[0],
      button2: buttonsData[1],
      button3: buttonsData[2],
      button4: buttonsData[3],
    });
  }

  render() {
    return <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center', }}>
          <Text style={{ fontSize: 30 }}>&nbsp;{this.state.score}&nbsp;</Text>
          <Image style={{ width: 40, height: 40 }} source={require('../img/star.png')} />
        </View>
      </View>
      <Text style={styles.question}>{this.state.question}</Text>
      <ProgressBar style={styles.progressbar} width={null} progress={this.state.percent} borderRadius={0} height={30} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <AnsButton title={this.state.button1.val.toString()} disabled={!this.state.button1.status} handler={() => this.handleClickButton(this.state.button1)} />
        <AnsButton title={this.state.button2.val.toString()} disabled={!this.state.button2.status} handler={() => this.handleClickButton(this.state.button2)} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <AnsButton title={this.state.button3.val.toString()} disabled={!this.state.button3.status} handler={() => this.handleClickButton(this.state.button3)} />
        <AnsButton title={this.state.button4.val.toString()} disabled={!this.state.button4.status} handler={() => this.handleClickButton(this.state.button4)} />
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  question: {
    flex: 1,
    textAlign: 'center',
    fontSize: 120,
  },
  progressbar: {
    flex: 1,
    justifyContent: 'center',
    color: '#18427c',
    borderWidth: 0,
    padding: 10,
  },
  touchable: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eaeaea",
  },
  button: {
    backgroundColor: '#18427c',
    textAlign: "center",
    alignSelf: "stretch",
    padding: 30,
    color: "white",
    fontSize: 40,
  },
  buttondisabled: {
    backgroundColor: '#aaaaaa',
    textAlign: "center",
    alignSelf: "stretch",
    padding: 30,
    color: "white",
    fontSize: 40,
  },
});

export default GameScreen;
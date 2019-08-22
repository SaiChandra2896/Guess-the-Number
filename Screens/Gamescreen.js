import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRanddomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum == exclude) {
    return generateRanddomBetween(min, max, exclude);
  } else {
    return randNum;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRanddomBetween(1, 100, props.userChoice)
  );

  return (
    <View style={styles.screen}>
      <Text>Opponents Guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' />
        <Button title='GREATER' />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxHeight: '80%'
  }
});

export default GameScreen;

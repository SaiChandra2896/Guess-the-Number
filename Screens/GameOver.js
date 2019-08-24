import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>Game is Over!!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          //for web images we have to add width and height
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your Phone needed{' '}
          <Text style={styles.highLight}>{props.roundsNumber}</Text> rounds to
          guess the number
          <Text style={styles.highLight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 30
  },
  highLight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  }
});

export default GameOverScreen;

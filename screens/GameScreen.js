import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText> #{numRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = props => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} /> */}
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        {/* <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, 'greater')}
        /> */}
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignContent: 'center'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  },
  listContainer: {
    flex: 1, //to set scrollview to scroll not scrolling by default
    width: Dimensions.get('window').width < 350 ? '60%' : '80%'
  },
  list: {
    alignItems: 'center'
  }
});

//if we want to add list items from bottom we can add justify content : flex-end and flexgrow: 1

export default GameScreen;

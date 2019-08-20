import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (
    //to override or add our new styles from outside we use spread operator
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    //shadow properties only work on ios
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //elevation works only on android to create a card like container
    elevation: 6,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
});

export default Card;

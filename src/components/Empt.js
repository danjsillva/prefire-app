import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

export default class Empt extends Component {
  render() {
    return (
      <View style={styles.card}>
          <Text style={styles.title}>Não há nada pra mostrar aqui.</Text>
          {/* <Text style={styles.content}>Por enquanto.</Text> */}
          <Text style={styles.content}>Relaxa... as informações serão atualizadas em breve.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - 80,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    // shadowColor: '#aaa',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'center',
    color: '#333',
  },
});

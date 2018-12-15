import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.devText}>Developed with <Icon name="heart" /> by </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/danjsillva/')}>
          <Text style={{ color: '#182848' }}>Daniel Silva</Text>
          {/* <Text style={{ color: '#FF8008' }}>Daniel Silva</Text> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    margin: 20,
  },
  devText: {
    color: '#555'
  },
});

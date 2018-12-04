import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export default class Page2 extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About ;D</Text>
        <Button
          title="Ir para About"
          onPress={() => navigation.navigate('About')}
        />
      </View>
    )
  }
}

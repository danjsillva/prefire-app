import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export default class Page1 extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home ;D</Text>
        <Button
          title="Ir para About"
          onPress={() => navigation.navigate('About')}
        />
      </View>
    )
  }
}

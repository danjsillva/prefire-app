import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.bar}>
        <View style={styles.pre}>
          <TouchableOpacity onPress={this.props.onPressStar}>
            <Icon name="star" size={20} color={'#FF8008'} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Prēfire</Text>
        
        <View style={styles.pos}>
          <TouchableOpacity onPress={this.props.onPressRefresh}>
            <Icon name="repeat" size={20} color={'#000'}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

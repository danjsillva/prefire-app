import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment'

export default class Live extends Component {
  render() {
    if (this.props.data.team1 && this.props.data.team2 && this.props.data.event) {
      return (
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.date}>AO VIVO</Text>
          </View>

          <View style={styles.line}></View>

          <View style={styles.content}>
            <View style={styles.info}>
              <View style={styles.team}>
                {/* <Image
                  source={{ uri: 'https://static.hltv.org/images/team/logo/' + this.props.data.team1.id }}
                  style={styles.teamLogo}
                /> */}
                <Text style={styles.teamName}>{this.props.data.team1.name}</Text>
              </View>

              <Text style={styles.result}> x </Text>

              <View style={styles.team}>
                <Text style={styles.teamName}>{this.props.data.team2.name}</Text>
                {/* <Image
                  source={{ uri: 'https://static.hltv.org/images/team/logo/' + this.props.data.team2.id }}
                  style={styles.teamLogo}
                /> */}
              </View>
            </View>

            <Text numberOfLines={1} style={styles.event}>{this.props.data.format} | {this.props.data.maps.join(', ')}</Text>
            <Text numberOfLines={1} style={styles.event}>{this.props.data.event.name}</Text>
          </View>
        </View>
      );
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - 80,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    // shadowColor: '#aaa',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },
  content: {
    padding: 15,
  },
  date: {
    color: '#d00',
  },
  info: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 8,
  },
  team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  result: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamLogo: {
    width: 16,
    height: 16,
  },
  event: {
    fontSize: 12,
    color: '#aaa',
    flexWrap: 'wrap',
  },
  line: {
    borderColor: '#eee',
    borderWidth: 1,
  }
});

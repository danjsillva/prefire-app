import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br.js'

export default class Match extends React.Component {
  render() {
    if (this.props.data.team1 && this.props.data.team2 && this.props.data.event) {
      return (
        <View style={styles.card}>
          <View style={styles.line}></View>

          <View style={styles.info}>
            <Text style={styles.date}>{this.props.data.result ? moment(this.props.data.date).fromNow() : moment(this.props.data.date).format('HH:mm')}</Text>

            <View style={styles.content}>
              <View style={styles.team}>
                {/* <Image
                  source={{ uri: 'https://static.hltv.org/images/team/logo/' + this.props.data.team1.id }}
                  style={styles.teamLogo}
                /> */}
                <Text style={styles.teamName}>{this.props.data.team1.name}</Text>
              </View>

              {this.props.data.result ? 
              <Text style={styles.result}> {this.props.data.result} </Text> :
              <Text style={styles.result}> x </Text> }

              <View style={styles.team}>
                <Text style={styles.teamName}>{this.props.data.team2.name}</Text>
                {/* <Image
                  source={{ uri: 'https://static.hltv.org/images/team/logo/' + this.props.data.team2.id }}
                  style={styles.teamLogo}
                /> */}
              </View>
            </View>

            <Text numberOfLines={1} style={styles.event}>{this.props.data.format} | {this.props.data.event.name}</Text>
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
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  line: {
    width: 3,
    height: 70,
    borderRadius: 50,
    // backgroundColor: '#FF8008',
    backgroundColor: '#182848',
  },
  content: {
    flexDirection: 'row',
  },
  info: {
    paddingLeft: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 3,
    color: '#4b6cb7',
    // color: '#FFC837',
  },
  team: {
    flexDirection: 'row'
  },
  result: {
    fontSize: 16,
    color: '#182848',
    fontWeight: 'bold',
  },
  teamName: {
    fontSize: 16,
    // color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
  },
  teamLogo: {
    width: 16,
    height: 16,
  },
  event: {
    fontSize: 12,
    color: '#777',
    color: 'rgb(128, 128, 128)',
    flexWrap: 'wrap',
  }
});

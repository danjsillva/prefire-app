import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, SafeAreaView, RefreshControl, ScrollView, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br.js'

// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'react-native-admob'

import Footer from '../components/Footer'
import Empt from '../components/Empt'
import Featured from '../components/Featured'
import Live from '../components/Live'
import Match from '../components/Match'

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Prēfire',
    headerRight: (
      <Button title="Favoritos" onPress={() => { navigation.navigate('Favorite') }} />
    ),
  });

  state = {
    live: [],
    featured: [],
    today: [],
    tomorow: [],
    favorites: '',
    liveVisible: true,
    featuredVisible: true,
    todayVisible: true,
    tomorowVisible: true,
    refreshing: false,
    update: '',
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ update: 'Carregando...' })

    this.handleOpenModalLoading()
    await this.fetchFavorite()
    await this.fetchMatches()
    this.handleCloseModalLoading()

    let update = 'Atualizado em: ' + moment().format('HH:mm')

    this.setState({ update })
  }

  fetchFavorite = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem('@prefire:favorites'))

    this.setState({ favorites })
  }

  fetchMatches = async () => {
    try {
      // let response = await axios.get('http://localhost:3000/matches')
      let response = await axios.get('http://40.84.238.68:5555/matches')
      let { live, today, tomorow } = response.data

      this.setState({ live, today, tomorow })

      let featured = [
        ...today.filter(item => this.state.favorites.indexOf(item.team1.name) > -1 || this.state.favorites.indexOf(item.team2.name) > -1),
        ...tomorow.filter(item => this.state.favorites.indexOf(item.team1.name) > -1 || this.state.favorites.indexOf(item.team2.name) > -1)
      ]

      this.setState({ featured })
    } catch (error) {
      alert('Erro. Tente novamente!')
    }
  }

  handleOpenModalFavorite = async () => {
    this.setState({ modalFavoriteVisible: true })
  }

  handleCloseModalFavorite = async () => {
    this.fetchData()

    this.setState({ modalFavoriteVisible: false })
  }

  handleOpenModalLoading = async () => {
    this.setState({ refreshing: true })
  }

  handleCloseModalLoading = async () => {
    this.setState({ refreshing: false })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-8531805358090283~3139561288"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        /> */}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchData}
            />
          }>
          <LinearGradient colors={['#232526', '#414345']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
            <TouchableOpacity onPress={() => this.setState({ liveVisible: !this.state.liveVisible })} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', margin: 10 }}>
              <Text style={[styles.listTitle, { color: '#fff' }]}>Agora</Text>
              <Text style={[styles.listUpdate, { color: '#fff' }]}>{this.state.update}</Text>
              {/* {this.state.liveVisible ? <Icon name="angle-up" size={30} color={'#fff'} /> : <Icon name="angle-down" size={30} color={'#fff'} />} */}
            </TouchableOpacity>
            <ScrollView>
              {this.state.liveVisible ?
                this.state.live.length > 0 ?
                  <FlatList
                    horizontal
                    contentContainerStyle={styles.listLive}
                    data={this.state.live}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Live data={item} />}
                  /> :
                  <Empt /> :
                null
              }
            </ScrollView>
          </LinearGradient>

          <View>
            <TouchableOpacity onPress={() => this.setState({ featuredVisible: !this.state.featuredVisible })} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
              <Text style={[styles.listTitle]}>Destaques</Text>
              {/* {this.state.featuredVisible ? <Icon name="angle-up" size={30} color={'#000'} /> : <Icon name="angle-down" size={30} color={'#000'} />} */}
            </TouchableOpacity>
            <ScrollView>
              {this.state.featuredVisible ?
                this.state.featured.length > 0 ?
                  <FlatList
                    horizontal
                    contentContainerStyle={styles.listLive}
                    data={this.state.featured}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Featured data={item} />}
                  /> :
                  <Empt /> :
                null
              }
            </ScrollView>

            <View style={styles.line}></View>
          </View>

          <TouchableOpacity onPress={() => this.setState({ todayVisible: !this.state.todayVisible })} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <Text style={[styles.listTitle]}>Hoje</Text>
            {/* {this.state.todayVisible ? <Icon name="angle-up" size={30} color={'#000'} /> : <Icon name="angle-down" size={30} color={'#000'} />} */}
          </TouchableOpacity>
          {this.state.todayVisible ?
            this.state.today.length > 0 ?
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.today}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Match data={item} />}
              /> :
              <Empt /> :
            null
          }

          <TouchableOpacity onPress={() => this.setState({ tomorowVisible: !this.state.tomorowVisible })} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <Text style={[styles.listTitle]}>Amanhã</Text>
            {/* {this.state.tomorowVisible ? <Icon name="angle-up" size={30} color={'#000'} /> : <Icon name="angle-down" size={30} color={'#000'} />} */}
          </TouchableOpacity>
          {this.state.tomorowVisible ?
            this.state.tomorow.length > 0 ?
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.tomorow}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Match data={item} />}
              /> :
              <Empt /> :
            null
          }

          <Footer />

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrap: {
    paddingVertical: 10,
  },
  listTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  listUpdate: {
    color: '#000',
    fontSize: 12,
    marginTop: 8,
  },
  line: {
    borderColor: '#eee',
    borderWidth: 1,
  },
});

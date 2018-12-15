import React, { Component } from 'react';
import { Platform, Dimensions, AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Favorite extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Favoritos',
      headerLeft: (
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      ),
      headerRight: (
        <Button title="Salvar" onPress={navigation.getParam('handlePressSave')} />
      ),
    }
  };

  state = {
    team: '',
    favorites: [],
  }

  componentDidMount() {
    this.props.navigation.setParams({ handlePressSave: this.handlePressSave });
    this.fetchFavorites()
  }

  fetchFavorites = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem('@prefire:favorites')) || []

    this.setState({ favorites })
  }

  handlePressSave = async () => {
    await AsyncStorage.setItem('@prefire:favorites', JSON.stringify(this.state.favorites))

    this.handlePressClose()
  }

  handlePressAdd = async () => {
    this.setState({ favorites: [...this.state.favorites, this.state.team] })
  }

  handlePressDel = async (index) => {
    let favorites = this.state.favorites
    favorites.splice(index, 1)

    this.setState({ favorites })
  }

  handlePressClose = async () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.listTitle}>Equipes favoritas</Text>

          <View style={styles.fieldGroup}>
            <TextInput
              style={styles.field}
              onChangeText={(team) => this.setState({ team })}
              value={this.state.team}
            />

            <TouchableOpacity onPress={() => this.handlePressAdd()}>
              <LinearGradient colors={['#182848', '#4b6cb7']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.button}>
              <Text style={[styles.buttonText]}>ADICIONAR</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 12, color: '#555' }}>Se liga: digite o nome da equipe exatamente como aparece no site hltv.org observando maiúsculas, minúsculas e caracteres especiais. (Ex.: 'MIBR', 'Liquid', 'Astralis', 'FaZe')</Text>

          {this.state.favorites.length > 0 ?
            <FlatList
              contentContainerStyle={styles.listView}
              data={this.state.favorites}
              keyExtractor={item => item}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.listItem}>
                    <Text>{ item }</Text>

                    <TouchableOpacity onPress={() => this.handlePressDel(index)} style={styles.listButton}>
                      <Icon name="times" size={13} />
                      <Text style={[styles.listButtonText]}>REMOVER</Text>
                    </TouchableOpacity>
                  </View>
                )}
              }
            /> : null 
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  listTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  fieldGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    width: 96,
    height: 32,
    padding: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
  field: {
    flex: 1,
    height: 32,
    borderRadius: 5,
    backgroundColor: '#eee',
    paddingHorizontal: 8,
  },
  listView: {
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,   
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  listButton: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 15,
  },
  listButtonText: {
    marginLeft: 5,
    fontSize: 12,
  }
});

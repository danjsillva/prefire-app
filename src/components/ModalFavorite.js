import React, { Component } from 'react';
import { Platform, Dimensions, AsyncStorage, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ModalFavorite extends Component {
  state = { 
    favorite: '',
  }

  componentDidMount() {
    this.fetchFavorite()
  }

  fetchFavorite = async () => {
    let favorite = await AsyncStorage.getItem('@prefire:favorite') || 'MIBR'

    this.setState({ favorite })
  }

  handlePressSave = async (team) => {
    await AsyncStorage.setItem('@prefire:favorite', team)
    
    this.handlePressClose()
  }

  handlePressClose = async () => {
    this.props.onClose()
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={()=>{}} >
        <View style={styles.modal}>
          <View>
            {/* <View style={styles.bar}> */}
              {/* <TouchableOpacity onPress={this.handlePressClose} style={styles.close}>
                <Icon name="times" size={20} />
              </TouchableOpacity> */}
            {/* </View> */}
              <Text style={styles.listTitle}>Equipe favorita</Text>

            <TextInput
              style={styles.field}
              onChangeText={(favorite) => this.setState({ favorite })}
              value={this.state.favorite}
            />
            <Text style={{ fontSize: 12, color: '#555' }}>Se liga: digite o nome da equipe exatamente como aparece no site hltv.org observando maiúsculas, minúsculas e caracteres especiais. (Ex.: 'MIBR', 'Liquid', 'Astralis', 'FaZe')</Text>

            <TouchableOpacity onPress={() => this.handlePressSave(this.state.favorite)}>
              <LinearGradient colors={['#FF8008', '#FFC837']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.button}>
                <Text style={[styles.buttonText]}>SALVAR EQUIPE FAVORITA</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginTop: 20,
    padding: 10,
  },
  close: {
    alignSelf: 'flex-end'
  },
  listTitle: {
    color: '#000',
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    height: 40,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    // fontSize: 16,
    color: '#fff',
  },
  field: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});

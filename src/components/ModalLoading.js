import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ModalLoading extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={()=>{}} >
        <View style={styles.modal}>
          {/* <Text style={styles.listTitle}>Carregando as</Text>
          <Text style={styles.listTitle}>partidas...</Text> */}

          <Icon name="spinner" size={30} color={'#555'} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    // paddingTop: 90,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(255,255,255,0.75)'
  },
});

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,Text,View,TextInput, SafeAreaView,FlatList, Image,ActivityIndicator
} from 'react-native';
import { Contacts } from 'expo';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  loadContacts = async () => {
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });

    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  renderItem = ({ item }) => (
    <View style={{ minHeight: 50, padding: 5 }}>
      <Text style={{ color: '#A8E890', fontWeight: 'bold', fontSize: 20 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        {item.phoneNumbers[0].digits}
      </Text>
    </View>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#425F57' }} />
        <TextInput
          placeholder="CARI KONTAK"
          placeholderTextColor="#CFFF8D"
          style={{
            backgroundColor: '#425F57',
            alignItems: 'center',
            height: 50,
            fontSize: 18,
            padding: 11,
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: '#2f363c' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="CFFF8D" />
            </View>
          ) : null}

          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 300
                }}
              >
                <Text style={{ color: '#CFFF8D' }}>Kontak tidak ditemukan</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE4E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

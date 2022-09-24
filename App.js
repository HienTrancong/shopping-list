import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

export default class App extends React.Component {
  constructor() {
    super();
    //store shopping lists in app state
    this.state = {
      lists: [],
    };

    //Configs when register web app
    const firebaseConfig = {
      apiKey: "AIzaSyBvcr5osjVk8vWIL1lTLeNM9cpODJ5MxSc",
      authDomain: "test-f113a.firebaseapp.com",
      projectId: "test-f113a",
      storageBucket: "test-f113a.appspot.com",
      messagingSenderId: "13552469513",
      appId: "1:13552469513:web:d4df532927b836ff649ad8",
      measurementId: "G-X4RH1M6TJY"
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //reference to collection shoppinglists
    // this.referenceShoppingLists = firebase
    //   .firestore()
    //   .collection('shoppinglists');
  };

  //fetch snapshot of shopping list collection data
  componentDidMount() {
    //reference to shopping list
    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    //stop receiving update from collection
    this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const lists = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      lists.push({
        name: data.name,
        items: data.items.toString(),
      });
    });
    this.setState({
      lists,
    });
  };

  render() {
    return (
      <FlatList
        data={this.state.lists}
        renderItem={({ item }) =>
          <Text>{item.name}: {item.items}</Text>
        }
      />
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});

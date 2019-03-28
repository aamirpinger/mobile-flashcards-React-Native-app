import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native'

import { Entypo } from '@expo/vector-icons'
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

// **********************************************************
//Don't forget to run on commnad prompt and restart you app
//
//      $ npm install react-navigation --save
//
// **********************************************************


class Deck extends Component {

    render() {

        const navigation = this.props.navigation
        const deck = navigation.getParam('deck')
        const { handleDeckDelete } = this.props.screenProps
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 36, textDecorationLine: 'underline', borderBottomColor: 'orange', borderBottomWidth: 2, borderTopColor: 'orange', borderTopWidth: 2, fontWeight: 'bold', color: '#001057', textAlign: 'center' }}>
                    {deck.title}
                </Text>

                <Text style={{
                    fontSize: 25,
                    marginBottom: 50,
                }}>
                    {deck.questions.length} cards
                </Text>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigation.navigate('AddCard', { title: deck.title })}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Add Card
                    </Text>
                </TouchableHighlight>


                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigation.navigate('StartQuiz', { deck, })}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Start Quiz
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => handleDeckDelete(deck.title)}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Delete
                    </Text>
                </TouchableHighlight>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        margin: 20,
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: '#001057',
        borderBottomColor: 'orange',
        borderBottomWidth: 2,
        justifyContent: 'center',
    }
})
export default Deck

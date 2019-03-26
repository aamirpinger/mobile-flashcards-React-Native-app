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
        //console.log(deck, "fffffffffffffffffffffffffffffffffff")
        console.log(deck.questions)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'olive',
                    fontSize: 35,
                }}>
                    {deck.title}
                </Text>
                <Text style={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'olive',
                    fontSize: 35,
                }}>
                    {deck.questions.length} cards
                </Text>

                <TouchableHighlight
                    style={[{ backgroundColor: 'maroon', }, styles.button]}
                    onPress={() => navigation.navigate('AddQuestion')}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Add Card
                    </Text>
                </TouchableHighlight>


                <TouchableHighlight
                    style={[{ backgroundColor: 'olive', }, styles.button]}
                    onPress={() => navigation.navigate('StartQuiz')}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Start Quiz
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[{ backgroundColor: 'red', }, styles.button]}
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
        width: 120,
        margin: 20,
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
    }
})
export default Deck
